const $ = s => document.querySelector(s);
const newTweet = () => ({ name: 'New reply', handle: 'handle', text: '', priv: false, time: '1h', replies: '0', reposts: '0', likes: '0', views: '0', av: '', img: '' });
const S = {
  p: 'twitter', ti: 0, theme: 'dim',
  name: 'WEIRD HALF-ALIEN THAT I LUV', status: 'online', showSt: true, istatus: 'iMessage', time: 'Today 1:11 AM', sms: false,
  av: '', photoUrls: '', wabg: 'doodle', wacolor: '#efeae2', waimg: '',
  chat: `> Don't grieve, Admiral. It is logical. The needs of the many outweigh... | 1:11 AM
...the needs of the few. | 1:12 AM
> Or the one. You are my superior officer. You are also my friend. I have been and always shall be yours | 1:13 AM`,
  nfolder: 'Notes', ndate: '', title: '21 September, 2256',
  note: `*Oh, how I miss her.*
**Ding-dong.**

I step up to the doorstep. "Hi." It is the only word I can manage- her long, silky black hair, whipped by the wind, seems to eat away at my throat and choke out the rest of my words.

"Hi, pretty. Want a ride?" She gestures to her bike and grins, a stupid, stupid grin that makes me want to touch her right away.`,
  tweets: [
    { name: 'KaworuSan!', handle: 'KaworuSan', text: 'I miss Shinji so much someone please bring him to me', priv: true, time: '2h', replies: '1', reposts: '3', likes: '87', views: '1.2K', av: '', img: '' },
    { name: 'Mari Loves Asuka!', handle: 'Marithebest!', text: 'simp. ugh.', priv: false, time: '1h', replies: '0', reposts: '0', likes: '12', views: '340', av: '', img: '' }
  ]
};
let BASE_CSS = '';
const T = () => S.tweets[S.ti];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])).replace(/\n/g, '<br>');
const attr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
// Escapes first, then turns **b**, *i* and <b>/<i>/<u> into plain tags AO3 accepts.
const fmt = s => esc(s)
  .replace(/&lt;(\/?)(b|i|u)&gt;/gi, (m, x, t) => `<${x}${t.toLowerCase()}>`)
  .replace(/\*\*([^*]+?)\*\*/g, '<b>$1</b>')
  .replace(/\*([^*]+?)\*/g, '<i>$1</i>');
// URLs are used as-is. Locally uploaded files (data: URIs) only preview and export as a placeholder.
const src = (d, e, tag) => e && /^data:/i.test(d) ? `https://YOUR-IMAGE-URL-${tag}` : d;
const avatar = (c, d, e, tag) => d ? `<img class="${c}" src="${attr(src(d, e, tag))}" alt="">` : `<span class="${c}"></span>`;
const photos = () => S.photoUrls.split('\n').map(s => s.trim()).filter(Boolean);
const photoSrc = a => /^https?:\/\//i.test(a) ? a : (photos()[(+a || 1) - 1] || '');
const pic = (c, a) => { const u = photoSrc(a); return u ? `<img class="${c}" src="${attr(u)}" alt="">` : `<span class="${c} ph"></span>`; };
const msgs = () => {
  const P = S.chat.split('\n').filter(l => l.trim()).map(l => {
    const out = l[0] === '>'; l = (out ? l.slice(1) : l).trim();
    const k = l.lastIndexOf(' | ');
    const t = k > 0 ? l.slice(0, k) : l, time = k > 0 ? l.slice(k + 3) : '';
    const m = t.match(/^\[photo(?:\s+(\d+|https?:\/\/[^\]\s]+))?\]\s*(.*)$/i);
    return { out, time, t: m ? m[2] : t, photo: m ? (m[1] || '1') : '' };
  });
  return P.map((m, i) => ({ ...m, first: !i || P[i - 1].out !== m.out }));
};
const lock = '<span class="twt-lock"><span class="twt-lock-sh"></span><span class="twt-lock-bd"></span></span>';
const post = (t, i, e) => {
  const next = i < S.tweets.length - 1;
  return `<div class="twt-post${i ? ' twt-cont' : ''}"><div class="twt-side">${avatar('twt-av', t.av, e, `tweet-${i + 1}-avatar`)}${next ? '<span class="twt-line"></span>' : ''}</div><div class="twt-main"><div class="twt-top"><span class="twt-name">${esc(t.name)}${t.priv ? lock : ''}</span><span class="twt-sub twt-handle">@${esc(t.handle)} · ${esc(t.time)}</span></div><div class="twt-text">${fmt(t.text)}</div>${t.img ? `<img class="twt-img" src="${attr(src(t.img, e, `tweet-${i + 1}-image`))}" alt="">` : ''}<div class="twt-act twt-sub"><span><b>${esc(t.replies)}</b> Replies</span><span><b>${esc(t.reposts)}</b> Reposts</span><span><b>${esc(t.likes)}</b> Likes</span><span><b>${esc(t.views)}</b> Views</span></div></div></div>`;
};
// Chat row with a tail (nub) on the sender's side; the matching bubble corner is squared off in CSS.
const row = (p, m, bub, x = '') => `<div class="${p}-row ${p}-${m.out ? 'out' : 'in'}${x}">${m.out ? bub + `<div class="${p}-nub"></div>` : `<div class="${p}-nub"></div>` + bub}</div>`;
const waClass = () => ({ dark: 'wa-dark', plain: 'wa-bg-plain', custom: 'wa-bg-custom' }[S.wabg] || 'wa-bg-doodle');
const R = {
  twitter: e => `<div class="au twt twt-${S.theme}">${S.tweets.map((t, i) => post(t, i, e)).join('')}</div>`,
  wa: e => `<div class="au wa ${waClass()}"><div class="wa-top">${avatar('wa-av', S.av, e, 'avatar')}<div class="wa-who"><span class="wa-title">${esc(S.name)}</span><span class="wa-status">${esc(S.status)}</span></div></div><div class="wa-body">${msgs().map(m => row('wa', m, `<div class="wa-bub${m.photo ? ' wa-pb' : ''}">${m.photo ? pic('wa-pic', m.photo) : ''}${fmt(m.t)}<span class="wa-time">${esc(m.time)}${m.out ? ' <span class="wa-tick">✓✓</span>' : ''}</span></div>`)).join('')}</div></div>`,
  im: e => `<div class="au im"><div class="im-top">${S.av ? avatar('im-av', S.av, e, 'avatar') : `<span class="im-av">${esc((S.name.trim()[0] || '?').toUpperCase())}</span>`}<div class="im-who"><span class="im-name">${esc(S.name)}<span class="im-chev"> ›</span></span>${S.showSt && S.istatus ? `<span class="im-status">${esc(S.istatus)}</span>` : ''}</div></div><div class="im-body"><div class="im-time">${esc(S.time)}</div>${msgs().map(m => {
    const dir = m.out ? 'out' : 'in';
    return (m.photo ? `<div class="im-row im-${dir}">${pic('im-pic', m.photo)}</div>` : '') + (m.t ? row('im', m, `<div class="im-bub">${fmt(m.t)}</div>`, m.out && S.sms ? ' im-sms' : '') : '');
  }).join('')}</div></div>`,
  ig: e => `<div class="au ig"><div class="ig-top">${avatar('ig-av', S.av, e, 'avatar')}<span class="ig-name">${esc(S.name)}</span></div>${msgs().map(m => row('ig', m, `<div class="ig-bub">${fmt(m.t)}</div>`)).join('')}</div>`,
  nt: e => `<div class="au nt"><div class="nt-bar"><span class="nt-back"><span class="nt-chev">‹</span> ${esc(S.nfolder)}</span><span class="nt-tools"><span class="nt-cap"><span class="nt-ci">↩</span><span class="nt-ci">⎋</span><span class="nt-ci nt-dots">•••</span></span><span class="nt-done">✓</span></span></div><div class="nt-page">${S.ndate ? `<div class="nt-date">${esc(S.ndate)}</div>` : ''}<div class="nt-title">${esc(S.title)}</div><div class="nt-body">${fmt(S.note)}</div></div></div>`
};
// Extra rule for a custom WhatsApp background (AO3 has no inline styles, so it goes in the Work Skin CSS).
const customCss = () => {
  if (S.p !== 'wa' || S.wabg !== 'custom') return '';
  const u = S.waimg.trim().replace(/[()'";\s]/g, '');
  const col = /^#[0-9a-f]{3,8}$/i.test(S.wacolor) ? S.wacolor : '#efeae2';
  return `#workskin .wa-bg-custom{background-color:${col}${/^https?:\/\//i.test(u) ? `;background-image:url(${u});background-size:cover` : ''}}`;
};
function chips() {
  const box = $('#ttabs'); box.innerHTML = '';
  const add = (label, fn, pressed, dis) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.disabled = !!dis; if (pressed !== undefined) b.setAttribute('aria-pressed', pressed); b.onclick = fn; box.appendChild(b); };
  S.tweets.forEach((_, i) => add(`Tweet ${i + 1}`, () => { S.ti = i; fill(); draw(); }, i === S.ti));
  add('Add reply', () => { S.tweets.push(newTweet()); S.ti = S.tweets.length - 1; fill(); draw(); });
  add('Remove this tweet', () => { S.tweets.splice(S.ti, 1); S.ti = Math.min(S.ti, S.tweets.length - 1); fill(); draw(); }, undefined, S.tweets.length < 2);
}
function draw() {
  const extra = customCss();
  $('#dyn').textContent = extra;
  $('#out').innerHTML = R[S.p](false);
  $('#html').value = R[S.p](true);
  $('#css').value = BASE_CSS + (extra ? `\n\n/* Custom WhatsApp background */\n${extra}\n` : '');
  $('#wacustom').hidden = S.wabg !== 'custom';
  document.querySelectorAll('[data-for]').forEach(g => g.hidden = !g.dataset.for.split(' ').includes(S.p));
  document.querySelectorAll('#tabs button').forEach(b => b.setAttribute('aria-selected', b.dataset.p === S.p));
  chips();
}
function fill() {
  document.querySelectorAll('[data-k],[data-t]').forEach(el => {
    const o = el.dataset.t ? T() : S, k = el.dataset.t || el.dataset.k;
    if (el.type === 'checkbox') el.checked = o[k];
    else el.value = /^data:/i.test(o[k]) ? '' : o[k];
  });
}
document.querySelectorAll('#tabs button').forEach(b => b.onclick = () => { S.p = b.dataset.p; draw(); });
document.querySelectorAll('[data-k],[data-t]').forEach(el => {
  el.oninput = () => {
    const o = el.dataset.t ? T() : S, k = el.dataset.t || el.dataset.k;
    o[k] = el.type === 'checkbox' ? el.checked : el.value; draw();
  };
});
const take = (i, f) => {
  if (!f || !f.type.startsWith('image/')) return;
  const r = new FileReader();
  r.onload = () => { (i.dataset.ft ? T() : S)[i.dataset.ft || i.dataset.f] = r.result; fill(); draw(); };
  r.readAsDataURL(f);
};
document.querySelectorAll('.drop input').forEach(i => {
  const z = i.closest('.drop');
  i.onchange = () => { take(i, i.files[0]); i.value = ''; };
  ['dragover', 'dragleave', 'drop'].forEach(ev => z.addEventListener(ev, e => {
    e.preventDefault(); z.classList.toggle('over', ev === 'dragover');
    if (ev === 'drop') take(i, e.dataTransfer.files[0]);
  }));
});
document.querySelectorAll('[data-copy]').forEach(b => b.onclick = async () => {
  const t = $('#' + b.dataset.copy); t.select();
  try { await navigator.clipboard.writeText(t.value); } catch { document.execCommand('copy'); }
  const o = b.textContent; b.textContent = 'Copied'; setTimeout(() => b.textContent = o, 1400);
});
fetch('ao3-workskin.css').then(r => r.text()).then(t => { BASE_CSS = t; draw(); })
  .catch(() => { BASE_CSS = '/* Open this page over http(s), such as GitHub Pages, to load the CSS here. You can also copy ao3-workskin.css directly. */'; draw(); });
fill(); draw();
