const $ = s => document.querySelector(s);
const newTweet = () => ({ name: 'New reply', handle: 'handle', text: '', priv: false, time: '1h', replies: '0', reposts: '0', likes: '0', views: '0', av: '', img: '' });
const S = {
  p: 'twitter', ti: 0, theme: 'dim', name: 'WEIRD HALF-ALIEN THAT I LUV', status: 'online', time: 'Today 1:11 AM', sms: false, av: '', photos: [],
  chat: `> Don't grieve, Admiral. It is logical. The needs of the many outweigh... | 1:11 AM
...the needs of the few. | 1:12 AM
> Or the one. You are my superior officer. You are also my friend. I have been and always shall be yours | 1:13 AM`,
  ndate: '', title: '21 September, 2256',
  note: `*Oh, how I miss her.*
**Ding-dong.**

I step up to the doorstep. "Hi." It is the only word I can manage- her long, silky black hair, whipped by the wind, seems to eat away at my throat and choke out the rest of my words.

"Hi, pretty. Want a ride?" She gestures to her bike and grins, a stupid, stupid grin that makes me want to touch her right away.`,
  tweets: [
    { name: 'KaworuSan!', handle: 'KaworuSan', text: 'I miss Shinji so much someone please bring him to me', priv: true, time: '2h', replies: '1', reposts: '3', likes: '87', views: '1.2K', av: '', img: '' },
    { name: 'Mari Loves Asuka!', handle: 'Marithebest!', text: 'simp. ugh.', priv: false, time: '1h', replies: '0', reposts: '0', likes: '12', views: '340', av: '', img: '' }
  ]
};
const T = () => S.tweets[S.ti];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])).replace(/\n/g, '<br>');
// Escapes first, then turns **b**, *i* and <b>/<i>/<u> into plain tags AO3 accepts.
const fmt = s => esc(s)
  .replace(/&lt;(\/?)(b|i|u)&gt;/gi, (m, x, t) => `<${x}${t.toLowerCase()}>`)
  .replace(/\*\*([^*]+?)\*\*/g, '<b>$1</b>')
  .replace(/\*([^*]+?)\*/g, '<i>$1</i>');
const src = (d, e, tag) => e ? `https://YOUR-IMAGE-URL-${tag}` : d;
const avatar = (c, d, e, tag) => d ? `<img class="${c}" src="${src(d, e, tag)}" alt="">` : `<span class="${c}"></span>`;
const pic = (c, n, e) => S.photos[n - 1] ? `<img class="${c}" src="${src(S.photos[n - 1], e, 'photo-' + n)}" alt="">` : `<span class="${c} ph"></span>`;
const msgs = () => {
  const P = S.chat.split('\n').filter(l => l.trim()).map(l => {
    const out = l[0] === '>'; l = (out ? l.slice(1) : l).trim();
    const k = l.lastIndexOf(' | ');
    let t = k > 0 ? l.slice(0, k) : l; const time = k > 0 ? l.slice(k + 3) : '';
    const m = t.match(/^\[photo(?: (\d+))?\]\s*(.*)$/i);
    return { out, time, t: m ? m[2] : t, photo: m ? +(m[1] || 1) : 0 };
  });
  return P.map((m, i) => ({ ...m, first: !i || P[i - 1].out !== m.out }));
};
const lock = '<span class="twt-lock"><span class="twt-lock-sh"></span><span class="twt-lock-bd"></span></span>';
const post = (t, i, e) => {
  const next = i < S.tweets.length - 1;
  return `<div class="twt-post${i ? ' twt-cont' : ''}"><div class="twt-side">${avatar('twt-av', t.av, e, `tweet-${i + 1}-avatar`)}${next ? '<span class="twt-line"></span>' : ''}</div><div class="twt-main"><div class="twt-top"><span class="twt-name">${esc(t.name)}${t.priv ? lock : ''}</span><span class="twt-sub twt-handle">@${esc(t.handle)} · ${esc(t.time)}</span></div><div class="twt-text">${fmt(t.text)}</div>${t.img ? `<img class="twt-img" src="${src(t.img, e, `tweet-${i + 1}-image`)}" alt="">` : ''}<div class="twt-act twt-sub"><span><b>${esc(t.replies)}</b> Replies</span><span><b>${esc(t.reposts)}</b> Reposts</span><span><b>${esc(t.likes)}</b> Likes</span><span><b>${esc(t.views)}</b> Views</span></div></div></div>`;
};
const R = {
  twitter: e => `<div class="au twt twt-${S.theme}">${S.tweets.map((t, i) => post(t, i, e)).join('')}</div>`,
  wa: e => `<div class="au wa"><div class="wa-top">${avatar('wa-av', S.av, e, 'avatar')}<div><span class="wa-title">${esc(S.name)}</span><span class="wa-status">${esc(S.status)}</span></div></div><div class="wa-body">${msgs().map(m => `<div class="wa-row wa-${m.out ? 'out' : 'in'}"><div class="wa-bub${m.first ? ' wa-tail' : ''}${m.photo ? ' wa-pb' : ''}">${m.photo ? pic('wa-pic', m.photo, e) : ''}${fmt(m.t)}<span class="wa-time">${esc(m.time)}${m.out ? ' <span class="wa-tick">✓✓</span>' : ''}</span></div></div>`).join('')}</div></div>`,
  im: e => `<div class="au im"><div class="im-top">${esc(S.name)}</div><div class="im-time">${esc(S.time)}</div>${msgs().map(m => {
    const c = `im-row ${m.out ? 'im-out' : 'im-in'}${m.out && S.sms ? ' im-sms' : ''}`;
    return (m.photo ? `<div class="${c}">${pic('im-pic', m.photo, e)}</div>` : '') + (m.t ? `<div class="${c}"><div class="im-bub">${fmt(m.t)}</div></div>` : '');
  }).join('')}</div>`,
  ig: e => `<div class="au ig"><div class="ig-top">${avatar('ig-av', S.av, e, 'avatar')}<span class="ig-name">${esc(S.name)}</span></div>${msgs().map(m => `<div class="ig-row ig-${m.out ? 'out' : 'in'}"><div class="ig-bub">${fmt(m.t)}</div></div>`).join('')}</div>`,
  nt: e => `<div class="au nt">${S.ndate ? `<div class="nt-date">${esc(S.ndate)}</div>` : ''}<div class="nt-title">${esc(S.title)}</div><div class="nt-body">${fmt(S.note)}</div></div>`
};
function chips() {
  const box = $('#ttabs'); box.innerHTML = '';
  const add = (label, fn, pressed, dis) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.disabled = !!dis; if (pressed !== undefined) b.setAttribute('aria-pressed', pressed); b.onclick = fn; box.appendChild(b); };
  S.tweets.forEach((_, i) => add(`Tweet ${i + 1}`, () => { S.ti = i; fill(); draw(); }, i === S.ti));
  add('Add reply', () => { S.tweets.push(newTweet()); S.ti = S.tweets.length - 1; fill(); draw(); });
  add('Remove this tweet', () => { S.tweets.splice(S.ti, 1); S.ti = Math.min(S.ti, S.tweets.length - 1); fill(); draw(); }, undefined, S.tweets.length < 2);
}
function draw() {
  $('#out').innerHTML = R[S.p](false);
  $('#html').value = R[S.p](true);
  $('#pcount').textContent = S.photos.length ? `${S.photos.length} attached. Use [photo 1]${S.photos.length > 1 ? ` to [photo ${S.photos.length}]` : ''} in the messages.` : 'Drop images or click to choose';
  document.querySelectorAll('[data-for]').forEach(g => g.hidden = !g.dataset.for.split(' ').includes(S.p));
  document.querySelectorAll('#tabs button').forEach(b => b.setAttribute('aria-selected', b.dataset.p === S.p));
  chips();
}
function fill() {
  document.querySelectorAll('[data-k],[data-t]').forEach(el => {
    const o = el.dataset.t ? T() : S, k = el.dataset.t || el.dataset.k;
    el.type === 'checkbox' ? el.checked = o[k] : el.value = o[k];
  });
}
document.querySelectorAll('#tabs button').forEach(b => b.onclick = () => { S.p = b.dataset.p; draw(); });
document.querySelectorAll('[data-k],[data-t]').forEach(el => {
  el.oninput = () => {
    const o = el.dataset.t ? T() : S, k = el.dataset.t || el.dataset.k;
    o[k] = el.type === 'checkbox' ? el.checked : el.value; draw();
  };
});
const read = (f, cb) => {
  if (!f || !f.type.startsWith('image/')) return;
  const r = new FileReader(); r.onload = () => { cb(r.result); draw(); }; r.readAsDataURL(f);
};
const take = (i, files) => [...files].forEach(f => read(f, d => {
  if (i.hasAttribute('data-fp')) S.photos.push(d);
  else if (i.dataset.ft) T()[i.dataset.ft] = d;
  else S[i.dataset.f] = d;
}));
document.querySelectorAll('.drop input').forEach(i => {
  const z = i.closest('.drop');
  i.onchange = () => { take(i, i.files); i.value = ''; };
  ['dragover', 'dragleave', 'drop'].forEach(ev => z.addEventListener(ev, e => {
    e.preventDefault(); z.classList.toggle('over', ev === 'dragover');
    if (ev === 'drop') take(i, e.dataTransfer.files);
  }));
});
$('#pclear').onclick = () => { S.photos = []; draw(); };
document.querySelectorAll('[data-copy]').forEach(b => b.onclick = async () => {
  const t = $('#' + b.dataset.copy); t.select();
  try { await navigator.clipboard.writeText(t.value); } catch { document.execCommand('copy'); }
  const o = b.textContent; b.textContent = 'Copied'; setTimeout(() => b.textContent = o, 1400);
});
fetch('ao3-workskin.css').then(r => r.text()).then(t => $('#css').value = t)
  .catch(() => $('#css').value = 'Open this page over http(s), such as GitHub Pages, to load the CSS here. You can also copy ao3-workskin.css directly.');
fill(); draw();
