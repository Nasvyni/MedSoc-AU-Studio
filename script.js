const $ = s => document.querySelector(s);
const S = {
  p: 'twitter', name: 'Mira Santoso', handle: 'mirasantoso', status: 'online', theme: 'dim',
  text: 'he left a seen on my story and I have not been normal since', time: '9:41 AM · Oct 25, 2026',
  replies: '128', reposts: '2.4K', likes: '18.9K', views: '412K',
  chat: '> are you awake?\nbarely. why? | 1:12 AM\n> look outside | 1:13 AM',
  sms: false, title: 'Things I will not say to him', note: '1. I saw the story\n2. I was not waiting\n3. Okay I was waiting', av: '', img: ''
};
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])).replace(/\n/g, '<br>');
const src = (d, e) => e ? 'https://YOUR-IMAGE-URL' : d;
const avatar = (c, e) => S.av ? `<img class="${c}" src="${src(S.av, e)}" alt="">` : `<span class="${c}"></span>`;
const msgs = () => {
  const P = S.chat.split('\n').filter(l => l.trim()).map(l => {
    const out = l[0] === '>'; l = (out ? l.slice(1) : l).trim();
    const k = l.lastIndexOf(' | ');
    return { out, t: k > 0 ? l.slice(0, k) : l, time: k > 0 ? l.slice(k + 3) : '' };
  });
  return P.map((m, i) => ({ ...m, first: !i || P[i - 1].out !== m.out }));
};
const R = {
  twitter: e => `<div class="au twt twt-${S.theme}"><div class="twt-head">${avatar('twt-av', e)}<div><span class="twt-name">${esc(S.name)}</span><span class="twt-sub">@${esc(S.handle)}</span></div></div><div class="twt-text">${esc(S.text)}</div>${S.img ? `<img class="twt-img" src="${src(S.img, e)}" alt="">` : ''}<div class="twt-meta twt-sub">${esc(S.time)}</div><div class="twt-stats twt-sub"><span><b>${esc(S.replies)}</b> Replies</span><span><b>${esc(S.reposts)}</b> Reposts</span><span><b>${esc(S.likes)}</b> Likes</span><span><b>${esc(S.views)}</b> Views</span></div></div>`,
  wa: e => `<div class="au wa"><div class="wa-top">${avatar('wa-av', e)}<div><span class="wa-title">${esc(S.name)}</span><span class="wa-status">${esc(S.status)}</span></div></div><div class="wa-body">${msgs().map(m => `<div class="wa-row wa-${m.out ? 'out' : 'in'}"><div class="wa-bub${m.first ? ' wa-tail' : ''}">${esc(m.t)}<span class="wa-time">${esc(m.time)}${m.out ? ' <span class="wa-tick">✓✓</span>' : ''}</span></div></div>`).join('')}</div></div>`,
  im: e => `<div class="au im"><div class="im-top">${esc(S.name)}</div><div class="im-time">${esc(S.time)}</div>${msgs().map(m => `<div class="im-row ${m.out ? 'im-out' : 'im-in'}${m.out && S.sms ? ' im-sms' : ''}"><div class="im-bub">${esc(m.t)}</div></div>`).join('')}</div>`,
  ig: e => `<div class="au ig"><div class="ig-top">${avatar('ig-av', e)}<span class="ig-name">${esc(S.name)}</span></div>${msgs().map(m => `<div class="ig-row ig-${m.out ? 'out' : 'in'}"><div class="ig-bub">${esc(m.t)}</div></div>`).join('')}</div>`,
  nt: e => `<div class="au nt"><div class="nt-date">${esc(S.time)}</div><div class="nt-title">${esc(S.title)}</div><div class="nt-body">${esc(S.note)}</div></div>`
};
function draw() {
  $('#out').innerHTML = R[S.p](false);
  $('#html').value = R[S.p](true);
  document.querySelectorAll('[data-for]').forEach(g => g.hidden = !g.dataset.for.split(' ').includes(S.p));
  document.querySelectorAll('#tabs button').forEach(b => b.setAttribute('aria-selected', b.dataset.p === S.p));
}
document.querySelectorAll('#tabs button').forEach(b => b.onclick = () => { S.p = b.dataset.p; draw(); });
document.querySelectorAll('[data-k]').forEach(el => {
  const chk = el.type === 'checkbox';
  chk ? el.checked = S[el.dataset.k] : el.value = S[el.dataset.k];
  el.oninput = () => { S[el.dataset.k] = chk ? el.checked : el.value; draw(); };
});
const load = (f, k) => {
  if (!f || !f.type.startsWith('image/')) return;
  const r = new FileReader();
  r.onload = () => { S[k] = r.result; draw(); };
  r.readAsDataURL(f);
};
document.querySelectorAll('[data-f]').forEach(i => {
  const z = i.closest('.drop');
  i.onchange = () => load(i.files[0], i.dataset.f);
  ['dragover', 'dragleave', 'drop'].forEach(ev => z.addEventListener(ev, e => {
    e.preventDefault();
    z.classList.toggle('over', ev === 'dragover');
    if (ev === 'drop') load(e.dataTransfer.files[0], i.dataset.f);
  }));
});
document.querySelectorAll('[data-copy]').forEach(b => b.onclick = async () => {
  const t = $('#' + b.dataset.copy); t.select();
  try { await navigator.clipboard.writeText(t.value); } catch { document.execCommand('copy'); }
  const o = b.textContent; b.textContent = 'Copied'; setTimeout(() => b.textContent = o, 1400);
});
fetch('ao3-workskin.css').then(r => r.text()).then(t => $('#css').value = t)
  .catch(() => $('#css').value = 'Open this page over http(s), such as GitHub Pages, to load the CSS here. You can also copy ao3-workskin.css directly.');
draw();
