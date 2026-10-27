/* Powertec Isolation Control — shared script.
   Every page loads this file. It draws the header, menu and footer,
   then builds the page named in <body data-page="...">.
   All records below are EXAMPLE DATA. Replace them with your own site records. */

/* ---------- Example data ---------- */
const AP = {J:'J. Andersson (AP)', E:'E. Berg (SAP)', R:'R. Holm (AP)'};
const DATA = {
  keys: [
    {id:'H-001',sys:'HV',board:'HV-RMU-A',point:'CB1 – Transformer T1 HV feeder',hook:'C1-01',status:'In cabinet',doc:'',box:'',sld:'PT-HV-SLD-001',fitted:'2026-09-14',cond:'Good'},
    {id:'H-002',sys:'HV',board:'HV-RMU-A',point:'Earth switch ES1 – T1 feeder',hook:'C1-02',status:'In cabinet',doc:'',box:'',sld:'PT-HV-SLD-001',fitted:'2026-09-14',cond:'Good'},
    {id:'H-011',sys:'HV',board:'HV-RMU-B',point:'CB1 – Transformer T2 HV feeder',hook:'C1-11',status:'With AP',doc:'PTW-2026-0416',box:'',sld:'PT-HV-SLD-001',fitted:'2026-09-14',cond:'Good'},
    {id:'H-012',sys:'HV',board:'HV-RMU-B',point:'Earth switch ES1 – T2 feeder',hook:'C1-12',status:'With AP',doc:'PTW-2026-0416',box:'',sld:'PT-HV-SLD-001',fitted:'2026-09-14',cond:'Good'},
    {id:'L-101',sys:'LV',board:'LV-MSB-A',point:'ACB I1 – Transformer T1 incomer',hook:'C2-01',status:'In cabinet',doc:'',box:'',sld:'PT-LV-SLD-001',fitted:'2026-09-15',cond:'Good'},
    {id:'L-102',sys:'LV',board:'LV-MSB-A',point:'ACB Q1 – UPS-A input',hook:'C2-02',status:'In cabinet',doc:'',box:'',sld:'PT-LV-SLD-001',fitted:'2026-09-15',cond:'Good'},
    {id:'L-104',sys:'LV',board:'LV-MSB-A',point:'ACB Q2 – Mechanical MCC-A feeder',hook:'C2-04',status:'In lockout box',doc:'PTW-2026-0415',box:'LB-07',sld:'PT-LV-SLD-001',fitted:'2026-09-15',cond:'Good'},
    {id:'L-105',sys:'LV',board:'MCC-A',point:'Incomer isolator – MCC-A',hook:'C2-05',status:'In lockout box',doc:'PTW-2026-0415',box:'LB-07',sld:'PT-LV-SLD-001',fitted:'2026-09-15',cond:'Good'},
    {id:'L-121',sys:'LV',board:'LV-MSB-B',point:'ACB Q1 – UPS-B input',hook:'C2-21',status:'In lockout box',doc:'PTW-2026-0412',box:'LB-06',sld:'PT-LV-SLD-001',fitted:'2026-09-16',cond:'Good'},
    {id:'L-122',sys:'LV',board:'UPS-B',point:'UPS-B input isolator',hook:'C2-22',status:'In lockout box',doc:'PTW-2026-0412',box:'LB-06',sld:'PT-LV-SLD-001',fitted:'2026-09-16',cond:'Good'},
    {id:'L-123',sys:'LV',board:'UPS-B',point:'UPS-B static bypass isolator',hook:'C2-23',status:'In lockout box',doc:'PTW-2026-0412',box:'LB-06',sld:'PT-LV-SLD-001',fitted:'2026-09-16',cond:'Good'},
    {id:'L-124',sys:'LV',board:'CDB-B1',point:'Incomer – critical board CDB-B1',hook:'C2-24',status:'In lockout box',doc:'SFT-2026-0088',box:'LB-08',sld:'PT-LV-SLD-001',fitted:'2026-09-16',cond:'Good'},
    {id:'L-130',sys:'LV',board:'LV-MSB-B',point:'ACB Q3 – House services B',hook:'C2-30',status:'Out of service',doc:'',box:'',sld:'PT-LV-SLD-001',fitted:'2026-09-16',cond:'Hasp damaged, replacement ordered'},
    {id:'L-140',sys:'LV',board:'CDB-A2',point:'Incomer – critical board CDB-A2',hook:'C2-40',status:'In cabinet',doc:'',box:'',sld:'PT-LV-SLD-001',fitted:'2026-09-17',cond:'Good'}
  ],
  info: [
    {id:'LB-06',status:'In use',doc:'PTW-2026-0412',keys:['L-121','L-122','L-123'],aplock:'P-004 · J. Andersson',plocks:['P-031','P-037','P-042'],issued:'2026-10-27 07:10',bay:'C3-06'},
    {id:'LB-07',status:'In use',doc:'PTW-2026-0415',keys:['L-104','L-105'],aplock:'P-009 · R. Holm',plocks:['P-018','P-026'],issued:'2026-10-27 07:45',bay:'C3-07'},
    {id:'LB-08',status:'In use',doc:'SFT-2026-0088',keys:['L-124'],aplock:'P-004 · J. Andersson',plocks:['P-052'],issued:'2026-10-27 09:20',bay:'C3-08'},
    {id:'LB-03',status:'In cabinet',doc:'',keys:[],aplock:'',plocks:[],issued:'',bay:'C3-03'},
    {id:'LB-09',status:'In cabinet',doc:'',keys:[],aplock:'',plocks:[],issued:'',bay:'C3-09'},
    {id:'LB-10',status:'Out of service',doc:'',keys:[],aplock:'',plocks:[],issued:'',bay:'C3-10'}
  ],
  ptw: [
    {id:'PTW-2026-0416',status:'Pending issue',sys:'HV',work:'Replace HV cable termination, T2 HV feeder',loc:'HV substation B',ap:AP.E,cp:'Not yet issued',keys:['H-011','H-012'],box:'',loa:'',issued:'',expiry:''},
    {id:'PTW-2026-0415',status:'Live',sys:'LV',work:'Re-torque busbar joints after thermography, MCC-A',loc:'Mechanical plant room A',ap:AP.R,cp:'S. Nyberg · P-018',keys:['L-104','L-105'],box:'LB-07',loa:'',issued:'2026-10-27 07:45',expiry:'2026-10-27 18:00'},
    {id:'PTW-2026-0412',status:'Live',sys:'LV',work:'Replace protection relay, UPS-B input ACB Q1',loc:'LV switchroom B',ap:AP.J,cp:'K. Lindqvist · P-031',keys:['L-121','L-122','L-123'],box:'LB-06',loa:'LOA-2026-0045',issued:'2026-10-27 07:10',expiry:'2026-10-28 18:00'},
    {id:'PTW-2026-0409',status:'Cancelled',sys:'LV',work:'Install additional outgoing way, CDB-A2',loc:'Data hall 1, A-side gallery',ap:AP.J,cp:'K. Lindqvist · P-031',keys:['L-140'],box:'LB-03',loa:'',issued:'2026-10-24 07:30',expiry:'2026-10-24 17:00'}
  ],
  sft: [
    {id:'SFT-2026-0088',status:'Live',sys:'LV',work:'Insulation resistance test, cable UPS-B to CDB-B1',test:'Insulation resistance, 1000 V DC',loc:'LV switchroom B to data hall 2',ap:AP.J,cp:'M. Ek · P-052',keys:['L-124'],box:'LB-08',issued:'2026-10-27 09:20',expiry:'2026-10-27 16:00'},
    {id:'SFT-2026-0086',status:'Cancelled',sys:'LV',work:'Primary injection test, ACB I1 LV-MSB-A',test:'Primary current injection',loc:'LV switchroom A',ap:AP.E,cp:'T. Sjöberg · P-044',keys:['L-101'],box:'LB-09',issued:'2026-10-21 08:00',expiry:'2026-10-21 15:00'}
  ],
  loa: [
    {id:'LOA-2026-0046',status:'Live',area:'Battery room B',reason:'Visual inspection of BESS-B racks, no contact',ap:AP.R,holder:'A. Lund · P-061',bounds:'Inspection walkway only; rack doors stay shut',issued:'2026-10-27 10:00',expiry:'2026-10-27 14:00',ptw:''},
    {id:'LOA-2026-0045',status:'Live',area:'LV switchroom B, bays 1 to 4',reason:'Live LV equipment next to the PTW-2026-0412 work area',ap:AP.J,holder:'K. Lindqvist · P-031',bounds:'Barrier and signage at bay 4; no entry beyond bay 4',issued:'2026-10-27 07:15',expiry:'2026-10-28 18:00',ptw:'PTW-2026-0412'},
    {id:'LOA-2026-0041',status:'Cancelled',area:'Battery room A',reason:'Fire detection survey',ap:AP.E,holder:'F. Strand · P-070',bounds:'Ceiling void access from walkway only',issued:'2026-10-20 09:00',expiry:'2026-10-20 13:00',ptw:''}
  ]
};
const LOGS = {
  'PTW-2026-0412':[['07:02','Switching programme checked against the SLD by J. Andersson'],['07:05','Keys L-121, L-122, L-123 drawn; tags hung on hooks C2-21 to C2-23'],['07:08','Locks applied; numbers checked against switch labels'],['07:10','Keys placed in LB-06, AP lock P-004 applied, PTW issued'],['07:14','Personal locks P-031, P-037, P-042 applied to LB-06']],
  'PTW-2026-0415':[['07:30','Keys L-104, L-105 drawn by R. Holm'],['07:40','MCC-A isolated, proved dead, locks applied'],['07:45','Keys in LB-07, PTW issued to S. Nyberg'],['07:48','Personal locks P-018, P-026 applied to LB-07']],
  'PTW-2026-0416':[['10:30','Keys H-011, H-012 drawn by E. Berg; status With AP'],['10:32','HV switching in progress']],
  'PTW-2026-0409':[['24 Oct 07:30','PTW issued, keys in LB-03'],['24 Oct 16:40','All personal locks removed, PTW cancelled'],['24 Oct 16:52','L-140 returned to hook, LB-03 returned to bay']],
  'SFT-2026-0088':[['09:10','Key L-124 drawn by J. Andersson'],['09:20','Key in LB-08, SFT issued to M. Ek'],['09:22','Personal lock P-052 applied to LB-08']],
  'SFT-2026-0086':[['21 Oct 08:00','SFT issued to T. Sjöberg'],['21 Oct 14:20','Test complete, SFT cancelled, key L-101 returned']],
  'LOA-2026-0045':[['07:15','Barrier placed at bay 4; LOA issued to K. Lindqvist']],
  'LOA-2026-0046':[['10:00','LOA issued to A. Lund']]
};

/* ---------- Page definitions ---------- */
/* ROOT is set on each page's <body data-root="...">: '' at the top level, '../' inside a folder. */
const ROOT = document.body.dataset.root || '';
const LOGO = window.PT_LOGO || '', MARK = window.PT_MARK || '';
const PAGES = {
  keys:{file:'trackers/keys.html',title:'Key tracker',code:'H · L',blurb:'Every dedicated HV and LV safety lock, its numbered hook, and where its key is right now.',
    cols:[['id','Lock no.'],['sys','System'],['board','Board'],['point','Point of isolation'],['status','Status'],['where','Key location']]},
  info:{file:'trackers/info.html',title:'Information tracker',code:'LB',blurb:'Each lockout box, the safety document it serves, and the keys and personal locks on it.',
    cols:[['id','Box no.'],['status','Status'],['doc','Safety document'],['keysN','Keys inside'],['plocksN','Personal locks'],['issued','Issued']]},
  ptw:{file:'trackers/ptw.html',title:'Permit to work tracker',code:'PTW',blurb:'Live, pending and cancelled permits, with their isolations and lockout boxes.',
    cols:[['id','Permit no.'],['status','Status'],['work','Work'],['loc','Location'],['cp','Competent person'],['box','Box']]},
  sft:{file:'trackers/sft.html',title:'Sanction for test tracker',code:'SFT',blurb:'Sanctions for test, the test being carried out, and the isolation that secures it.',
    cols:[['id','Sanction no.'],['status','Status'],['work','Work'],['test','Test'],['cp','Competent person'],['box','Box']]},
  loa:{file:'trackers/loa.html',title:'Limitation of access tracker',code:'LOA',blurb:'Areas with restricted access, who holds the limitation, and its boundaries.',
    cols:[['id','LOA no.'],['status','Status'],['area','Area'],['reason','Reason'],['holder','Holder'],['expiry','Expires']]}
};
const NAV = [['index.html','Home','HOME','home'],['trackers/keys.html','Key tracker','H · L','keys'],['trackers/info.html','Information tracker','LB','info'],['trackers/ptw.html','Permit to work tracker','PTW','ptw'],['trackers/sft.html','Sanction for test tracker','SFT','sft'],['trackers/loa.html','Limitation of access tracker','LOA','loa'],['drawings/lv-schematic.html','LV schematic','SLD','schematic'],['guides/implementation.html','Implementation plan','PLAN','plan']];
const U = path => ROOT + path;

/* ---------- Icons ---------- */
const I = {
  burger:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 5l14 14M19 5L5 19"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
  chev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 9l7 7 7-7"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
  plan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M12 4v16M4 12h8M16 8h0M16 16h0"/></svg>',
  key:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="20" cy="24" r="10"/><circle cx="20" cy="24" r="3"/><path d="M28 30l22 22M42 44l5-5M47 49l5-5"/></svg>',
  box:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="10" y="24" width="44" height="30"/><path d="M20 24v-6a12 12 0 0124 0v6"/><path d="M32 34v8"/><circle cx="32" cy="34" r="3"/></svg>',
  ptw:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M16 8h24l10 10v38H16z"/><path d="M40 8v10h10M23 30h20M23 38h20M23 46h12"/></svg>',
  sft:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="12" y="12" width="40" height="40" rx="4"/><path d="M20 40a14 14 0 0124 0"/><path d="M32 40l7-9"/><circle cx="32" cy="40" r="2"/></svg>',
  loa:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M8 52h48M14 52V22M50 52V22M14 26h36M14 36h36"/><path d="M20 26l6 10M30 26l6 10M40 26l6 10"/></svg>',
  sld:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M32 6v10"/><circle cx="32" cy="22" r="6"/><circle cx="32" cy="30" r="6"/><path d="M32 36v8M10 44h44M16 44v10M32 44v10M48 44v10"/></svg>',
  shield:'<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M28 6l18 6v14c0 12-8 20-18 24-10-4-18-12-18-24V12z"/><path d="M20 28l6 6 10-12"/></svg>',
  tag:'<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 8h20l20 20-20 20L8 28z"/><circle cx="18" cy="18" r="3"/></svg>',
  lock:'<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="12" y="24" width="32" height="24"/><path d="M18 24v-6a10 10 0 0120 0v6M28 32v8"/></svg>',
  people:'<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="20" cy="20" r="7"/><circle cx="38" cy="22" r="5"/><path d="M8 46c0-8 6-13 12-13s12 5 12 13M32 46c0-6 3-10 8-10s8 4 8 10"/></svg>'
};
const ICON_FOR = {keys:I.key, info:I.box, ptw:I.ptw, sft:I.sft, loa:I.loa};

/* ---------- Helpers ---------- */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SETS = Object.keys(DATA);
function find(id){ id = String(id||'').toUpperCase(); for(const s of SETS){ const r = DATA[s].find(x => x.id.toUpperCase() === id); if(r) return {set:s, r}; } return null; }
const recUrl = id => U(`trackers/record.html?id=${encodeURIComponent(id)}`);
const link = id => !id ? '' : find(id) ? `<a href="${recUrl(id)}">${esc(id)}</a>` : `<span>${esc(id)}</span>`;
const linkList = ids => ids && ids.length ? `<div class="links">${ids.map(link).join('')}</div>` : '<p>None</p>';
function chipClass(s){
  if(s==='In cabinet') return 's-good';
  if(s==='Cancelled') return 's-idle';
  if(['Live','In use','In lockout box'].includes(s)) return 's-hot';
  if(['With AP','Pending issue'].includes(s)) return 's-warn';
  if(s==='Out of service') return 's-crit';
  return 's-idle';
}
const chip = s => `<span class="chip ${chipClass(s)}">${esc(s)}</span>`;
const sys = s => `<span class="sys ${s.toLowerCase()}">${s}</span>`;

/* ---------- Header, menu, footer ---------- */
function shell(page, heroHtml, mainHtml){
  const nav = NAV.map(([href,label,code,key]) => `<a href="${U(href)}"${key===page?' aria-current="page"':''}>${label}<small>${code}</small></a>`).join('');
  document.body.innerHTML = `
  <header class="site-head"><div class="wrap">
    <a href="${U('index.html')}" aria-label="Powertec Isolation Control home">${page==='home'?'<span></span>':`<img class="mark" src="${MARK}" alt="Powertec">`}</a>
    <button class="menu-btn" id="openMenu" aria-label="Open menu" aria-expanded="false" aria-controls="menu">${I.burger}</button>
  </div></header>
  <div class="menu" id="menu" hidden role="dialog" aria-label="Menu">
    <div class="top"><img src="${MARK}" alt="Powertec"><button class="menu-btn" id="closeMenu" aria-label="Close menu">${I.close}</button></div>
    <nav>${nav}</nav>
    <p class="note">Powertec Isolation Control · AP office key, lock and safety document control</p>
  </div>
  ${heroHtml}
  <main>${mainHtml}</main>
  <footer class="site-foot"><div class="wrap">
    <a class="foot-brand" href="${U('index.html')}"><img src="${MARK}" alt=""><span><b>powertec</b><small>isolation control</small></span></a>
    <nav class="foot-nav">${NAV.map(([href,label,code]) => `<a href="${U(href)}">${code==='HOME'?'Home':code}</a>`).join('')}</nav>
    <p class="foot-legal">© ${new Date().getFullYear()} Powertec Utilities Ltd. Registered in England &amp; Wales, company no. 08117942. Records shown are example data.</p>
  </div></footer>`;
  const menu = document.getElementById('menu'), open = document.getElementById('openMenu');
  const close = () => { menu.hidden = true; open.setAttribute('aria-expanded','false'); document.body.style.overflow=''; open.focus(); };
  open.addEventListener('click', () => { menu.hidden = false; open.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; document.getElementById('closeMenu').focus(); });
  document.getElementById('closeMenu').addEventListener('click', close);
  document.addEventListener('keydown', e => { if(e.key==='Escape' && !menu.hidden) close(); });
}
const pageHero = (crumbs, eyebrow, title, lead, extra='') => `
  <section class="hero"><div class="wrap">
    <nav class="crumbs">${crumbs}</nav>
    <div class="eyebrow">${eyebrow}</div>
    <h1 style="margin-top:14px">${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${extra}
  </div></section>`;

/* ---------- Home ---------- */
function home(){
  const n = (set, st) => DATA[set].filter(r => r.status===st).length;
  const card = key => { const p = PAGES[key]; return `<a class="card" href="${U(p.file)}"><div class="ico">${ICON_FOR[key]}</div><div><h3>${p.title}</h3><p>${p.blurb}</p><div class="n">${DATA[key].length} records · ${p.code}</div><span class="more">Open tracker ${I.arrow}</span></div></a>`; };
  const hero = `
  <section class="hero home"><div class="wrap">
    <img class="biglogo" src="${LOGO}" alt="Powertec Utilities Ltd">
    <h1>One lock.<br>One key.<br>Full control.</h1>
    <p class="sub">Isolation and safety document control for critical infrastructure.</p>
    <p class="lead">Every point of isolation has its own numbered lock, shown on the single line diagram. When a key leaves its hook, a tag takes its place, and this register shows where it went, which permit it serves and who is working under it.</p>
    <div class="cta">
      <a class="btn primary" href="${U('trackers/keys.html')}">Open key tracker ${I.arrow}</a>
      <a class="btn ghost" href="${U('trackers/ptw.html')}">${I.ptw.replace('stroke-width="2.4"','stroke-width="3"')} Live permits</a>
    </div>
    <div class="stats" aria-label="Site status now">
      <div><b class="hot">${n('ptw','Live')}</b><span>Live permits</span></div>
      <div><b class="hot">${n('keys','In lockout box')}</b><span>Keys in lockout boxes</span></div>
      <div><b>${n('keys','With AP')}</b><span>Keys with an AP</span></div>
      <div><b>${n('sft','Live')}</b><span>Live sanctions for test</span></div>
      <div><b>${n('loa','Live')}</b><span>Live limitations of access</span></div>
      <div><b>${n('keys','Out of service')}</b><span>Locks out of service</span></div>
    </div>
    <span class="example">Showing example data</span>
    <span class="chev" aria-hidden="true">${I.chev}</span>
  </div></section>`;
  const main = `
  <section class="block"><div class="wrap">
    <div class="block-head"><div class="eyebrow">Trackers</div><h2>Every key, permit and sanction in one place.</h2><p class="lead">Select a tracker, then select any line to open its full record.</p></div>
    <div class="cards">
      ${card('keys')}${card('info')}${card('ptw')}${card('sft')}${card('loa')}
      <a class="card" href="${U('drawings/lv-schematic.html')}"><div class="ico">${I.sld}</div><div><h3>LV schematic</h3><p>Representative 2N LV single line: transformers, main switchboards, UPS and critical distribution.</p><div class="n">Reference drawing · SLD</div><span class="more">View schematic ${I.arrow}</span></div></a>
      <a class="card" href="${U('guides/implementation.html')}" style="grid-column:1/-1"><div class="ico">${I.plan.replace('viewBox="0 0 24 24"','viewBox="0 0 24 24" style="width:64px;height:64px"').replace('stroke-width="2"','stroke-width="1.2"')}</div><div><h3>Implementation plan</h3><p>How the system goes live on site: nine phases from approval and survey through installation, training and go-live to audit, with a gate at the end of each phase and a go-live readiness checklist.</p><div class="n">9 phases · indicative 20 weeks · PLAN</div><span class="more">View plan ${I.arrow}</span></div></a>
    </div>
  </div></section>
  <section class="block alt"><div class="wrap">
    <div class="block-head"><div class="eyebrow">How it works</div><h2>Our system is built on four fundamentals.</h2></div>
    <div class="trio">
      <div>${I.lock}<b>Dedicated locks</b><p>One numbered lock per switch, shown in a circle on the SLD.</p></div>
      <div>${I.tag}<b>Key-out tags</b><p>An empty hook always carries a tag: permit, box, AP and time.</p></div>
      <div>${I.people}<b>Personal locks</b><p>Each CP gets their own numbered lock at CP training.</p></div>
      <div>${I.shield}<b>One register</b><p>Locks, boxes, people and documents tied together in one record.</p></div>
    </div>
  </div></section>`;
  shell('home', hero, main);
}

/* ---------- Tracker pages ---------- */
function cell(r, key){
  switch(key){
    case 'id': return `<a href="${recUrl(r.id)}" class="mono">${esc(r.id)}</a>`;
    case 'status': return chip(r.status);
    case 'sys': return sys(r.sys);
    case 'where': return r.status==='In cabinet' ? `Hook <span class="mono">${esc(r.hook)}</span>` : r.box ? `<span class="mono">${esc(r.box)} · ${esc(r.doc)}</span>` : r.status==='With AP' ? `With AP · <span class="mono">${esc(r.doc)}</span>` : 'Withdrawn';
    case 'keysN': return r.keys.length ? `<span class="mono">${r.keys.join(', ')}</span>` : '—';
    case 'plocksN': return r.plocks.length ? `<span class="mono">${r.plocks.join(', ')}</span>` : '—';
    case 'doc': case 'box': case 'issued': case 'expiry': return r[key] ? `<span class="mono">${esc(r[key])}</span>` : '—';
    default: return esc(r[key]) || '—';
  }
}
function tracker(key){
  const p = PAGES[key], rows = DATA[key];
  const statuses = ['All', ...new Set(rows.map(r => r.status))];
  const hero = pageHero(`<a href="${U('index.html')}">Home</a><span>/</span><span>${p.title}</span>`, `Tracker · ${p.code}`, p.title, p.blurb, '<span class="example">Showing example data</span>');
  const main = `<section class="block"><div class="wrap">
    <div class="toolbar">
      <label class="search">${I.search}<input id="q" type="search" placeholder="Search number, board, name…" aria-label="Search ${p.title}"></label>
      <div class="filters" role="group" aria-label="Filter by status">${statuses.map((s,i)=>`<button type="button" data-f="${esc(s)}" aria-pressed="${i===0}">${esc(s)}</button>`).join('')}</div>
    </div>
    <div class="count" id="count"></div>
    <div class="tablebox"><table>
      <thead><tr>${p.cols.map(c=>`<th scope="col">${c[1]}</th>`).join('')}<th scope="col"><span style="position:absolute;left:-9999px">Open record</span></th></tr></thead>
      <tbody id="rows"></tbody>
    </table></div>
  </div></section>`;
  shell(key, hero, main);
  let q = '', f = 'All';
  const tbody = document.getElementById('rows'), count = document.getElementById('count');
  function draw(){
    const ql = q.toLowerCase();
    const shown = rows.filter(r => (f==='All' || r.status===f) && (!ql || JSON.stringify(r).toLowerCase().includes(ql)));
    count.textContent = `${shown.length} of ${rows.length} records`;
    tbody.innerHTML = shown.length ? shown.map(r => `<tr data-id="${esc(r.id)}" tabindex="0">${p.cols.map(c=>`<td data-label="${c[1]}">${cell(r,c[0])}</td>`).join('')}<td class="go"><span>Open →</span></td></tr>`).join('')
      : `<tr><td class="empty" colspan="${p.cols.length+1}">No records match. Clear the search or choose another status.</td></tr>`;
  }
  tbody.addEventListener('click', e => { const tr = e.target.closest('tr[data-id]'); if(tr && !e.target.closest('a')) location.href = recUrl(tr.dataset.id); });
  tbody.addEventListener('keydown', e => { const tr = e.target.closest('tr[data-id]'); if(tr && (e.key==='Enter' || e.key===' ')){ e.preventDefault(); location.href = recUrl(tr.dataset.id); } });
  document.getElementById('q').addEventListener('input', e => { q = e.target.value; draw(); });
  document.querySelectorAll('.filters button').forEach(b => b.addEventListener('click', () => {
    f = b.dataset.f; document.querySelectorAll('.filters button').forEach(x => x.setAttribute('aria-pressed', String(x===b))); draw();
  }));
  draw();
}

/* ---------- Record (detail) page ---------- */
const fields = list => `<dl class="fields">${list.map(([k,v,w]) => `<div class="field${w?' wide':''}"><dt>${k}</dt><dd>${v || '—'}</dd></div>`).join('')}</dl>`;
const mono = v => v ? `<span class="mono">${esc(v)}</span>` : '';
function logPanel(id){
  const L = id && LOGS[id];
  return `<div class="panel"><h3>Activity log</h3>${L ? `<ol class="log">${L.map(([t,m]) => `<li><time>${esc(t)}</time><span>${esc(m)}</span></li>`).join('')}</ol>` : '<p>No movements recorded.</p>'}</div>`;
}
function record(){
  const id = new URLSearchParams(location.search).get('id');
  const hit = find(id);
  if(!hit){
    shell('', pageHero(`<a href="${U('index.html')}">Home</a>`, 'Record', 'Record not found', `No record matches “${esc(id || '')}”. Open a tracker and select a line.`, `<div class="cta"><a class="btn primary" href="${U('trackers/keys.html')}">Open key tracker ${I.arrow}</a></div>`), '');
    return;
  }
  const {set, r} = hit, p = PAGES[set];
  let body = '', side = '';
  if(set==='keys'){
    body = fields([['Lock no.',mono(r.id)],['System',sys(r.sys)],['Board',esc(r.board)],['Cabinet hook',mono(r.hook)],['Point of isolation',esc(r.point),1],['SLD drawing',mono(r.sld)],['Lock fitted',mono(r.fitted)],['Condition',esc(r.cond),1]]);
    const tag = (r.status==='In lockout box' || r.status==='With AP') ? `<div class="hooktag"><b>KEY-OUT TAG · HOOK ${esc(r.hook)}</b><div><span>Lock / key</span><span class="mono">${esc(r.id)}</span></div><div><span>Status</span><span>${esc(r.status.toUpperCase())}</span></div><div><span>Lockout box</span><span class="mono">${esc(r.box || '—')}</span></div><div><span>Document</span><span class="mono">${esc(r.doc)}</span></div></div>`
      : r.status==='Out of service' ? '<p>Hook empty. Lock withdrawn from service; see condition.</p>' : `<p>Key is on hook <span class="mono">${esc(r.hook)}</span>.</p>`;
    side = `<div class="panel"><h3>Hook ${esc(r.hook)}</h3>${tag}</div><div class="panel"><h3>Linked records</h3>${linkList([r.doc, r.box].filter(Boolean))}</div>${r.doc ? logPanel(r.doc) : ''}`;
  }
  if(set==='info'){
    body = fields([['Box no.',mono(r.id)],['Cabinet 3 bay',mono(r.bay)],['Safety document',link(r.doc)],['Issued',mono(r.issued)],['AP lock',esc(r.aplock),1],['Isolation keys inside',r.keys.length?linkList(r.keys):'',1],['Personal locks applied',r.plocks.length?mono(r.plocks.join(', ')):'',1]]);
    side = `<div class="panel"><h3>Box can be opened when</h3><p>${r.plocks.length ? `All ${r.plocks.length} personal locks have been removed by their holders, then the AP removes their own lock.` : 'Box is empty and not in use.'}</p></div>${r.doc ? logPanel(r.doc) : ''}`;
  }
  if(set==='ptw' || set==='sft'){
    body = fields([[set==='ptw'?'Permit no.':'Sanction no.',mono(r.id)],['System',sys(r.sys)],['Work',esc(r.work),1],...(set==='sft'?[['Test',esc(r.test),1]]:[]),['Location',esc(r.loc),1],['Issued by',esc(r.ap)],['Competent person',esc(r.cp)],['Issued',mono(r.issued)],['Expires',mono(r.expiry)],['Isolation locks',linkList(r.keys),1],['Lockout box',link(r.box)],['Limitation of access',link(r.loa)]]);
    side = logPanel(r.id);
  }
  if(set==='loa'){
    body = fields([['LOA no.',mono(r.id)],['Linked permit',link(r.ptw)],['Area',esc(r.area),1],['Reason',esc(r.reason),1],['Boundaries',esc(r.bounds),1],['Issued by',esc(r.ap)],['Holder',esc(r.holder)],['Issued',mono(r.issued)],['Expires',mono(r.expiry)]]);
    side = logPanel(r.id);
  }
  const titles = {keys:r.point, info:r.doc ? `Serving ${r.doc}` : 'Lockout box', ptw:r.work, sft:r.work, loa:r.area};
  document.title = `${r.id} · Powertec Isolation Control`;
  const hero = `<section class="hero"><div class="wrap">
    <nav class="crumbs"><a href="${U('index.html')}">Home</a><span>/</span><a href="${U(p.file)}">${p.title}</a><span>/</span><span>${esc(r.id)}</span></nav>
    <div class="rec-head"><div><div class="rec-id">${esc(r.id)}</div><h1 style="font-size:clamp(28px,4.4vw,46px)">${esc(titles[set])}</h1><span class="example">Example record</span></div>${chip(r.status)}</div>
  </div></section>`;
  const main = `<section class="block"><div class="wrap">
    <div class="rec-grid"><div>${body}</div><aside class="side">${side}</aside></div>
    <a class="back" href="${U(p.file)}">← Back to ${p.title}</a>
  </div></section>`;
  shell(set, hero, main);
}

/* ---------- LV schematic ---------- */
function schematic(){
  const side = s => {
    const X = x => s==='A' ? x : 900 - x, n = s==='A' ? 1 : 2, anc = s==='A' ? 'start' : 'end', off = s==='A' ? 1 : -1;
    const outs = [[90,'Q1',`UPS-${s}`,0],[180,'Q2',`MCC-${s}`,0],[270,'Q3',`House ${s}`,0],[360,'Q4','Spare',1]];
    let g = `<text x="${X(225)}" y="24" text-anchor="middle" class="t-b">HV supply ${s}</text>
      <line class="w" x1="${X(225)}" y1="32" x2="${X(225)}" y2="66"/>
      <circle class="w" cx="${X(225)}" cy="82" r="16"/><circle class="w" cx="${X(225)}" cy="102" r="16"/>
      <text x="${X(225)+26*off}" y="96" text-anchor="${anc}">T${n} HV/LV transformer</text>
      <line class="w" x1="${X(225)}" y1="118" x2="${X(225)}" y2="148"/>
      <rect class="cb" x="${X(225)-8}" y="148" width="16" height="16"/>
      <text x="${X(225)+16*off}" y="161" text-anchor="${anc}" class="t-q">ACB I1</text>
      <line class="w" x1="${X(225)}" y1="164" x2="${X(225)}" y2="190"/>
      <line class="bus" x1="${X(50)}" y1="190" x2="${X(400)}" y2="190"/>
      <text x="${X(50)}" y="180" text-anchor="${anc}" class="t-b">LV-MSB-${s}</text>`;
    outs.forEach(([x,q,l,spare]) => {
      g += `<line class="w" x1="${X(x)}" y1="190" x2="${X(x)}" y2="214"/><rect class="cb" x="${X(x)-7}" y="214" width="14" height="14"/>
        <text x="${X(x)+10}" y="226" class="t-q">${q}</text>
        <line class="w" x1="${X(x)}" y1="228" x2="${X(x)}" y2="256"/>
        <rect class="${spare?'ld':'bx'}" x="${X(x)-38}" y="256" width="76" height="34" rx="4"/>
        <text x="${X(x)}" y="277" text-anchor="middle">${l}</text>`;
    });
    g += `<line class="w" x1="${X(90)}" y1="290" x2="${X(90)}" y2="340"/>
      <line class="bus" x1="${X(40)}" y1="340" x2="${X(200)}" y2="340"/>
      <text x="${X(212)}" y="345" text-anchor="${anc}" class="t-b">CDB-${s}1</text>
      <text x="${X(212)}" y="361" text-anchor="${anc}" class="t-q">Critical distribution</text>
      <line class="w" x1="${X(150)}" y1="340" x2="${X(150)}" y2="364"/><rect class="cb" x="${X(150)-7}" y="364" width="14" height="14"/>
      <path class="w" d="M${X(150)} 378 V455 H${X(300)}"/>`;
    return g;
  };
  const hero = pageHero(`<a href="${U('index.html')}">Home</a><span>/</span><span>LV schematic</span>`, 'Reference drawing · PT-LV-SLD-001', 'LV schematic', 'Representative 2N low voltage arrangement for a data hall. Two independent paths, A and B, each feed the dual-corded IT load. This is a reference layout, not a site drawing.');
  const main = `<section class="block"><div class="wrap">
    <div class="sld"><svg viewBox="0 0 900 520" role="img" aria-label="Representative 2N LV single line diagram: A and B paths feed dual corded IT load">
      ${side('A')}${side('B')}
      <rect class="bx" x="300" y="430" width="300" height="50" rx="4"/>
      <text x="450" y="452" text-anchor="middle" class="t-b">IT racks</text>
      <text x="450" y="469" text-anchor="middle" class="t-q">dual corded · A and B feeds</text>
      <text x="450" y="508" text-anchor="middle" class="t-q">No interconnection between A and B paths</text>
    </svg></div>
    <div class="legend">
      <span><svg width="28" height="8" aria-hidden="true"><line x1="2" y1="4" x2="26" y2="4" stroke="#F58220" stroke-width="5" stroke-linecap="round"/></svg>Busbar</span>
      <span><svg width="16" height="16" aria-hidden="true"><rect x="1" y="1" width="14" height="14" fill="none" stroke="#D6DCE2" stroke-width="1.6"/></svg>Circuit breaker (ACB / MCCB)</span>
      <span><svg width="26" height="16" aria-hidden="true"><rect x="1" y="1" width="24" height="14" fill="none" stroke="#D6DCE2" stroke-width="1.4"/></svg>Equipment / load</span>
    </div>
  </div></section>`;
  shell('schematic', hero, main);
}

/* ---------- Implementation plan ---------- */
const PHASES = [
  {n:'0',name:'Approve',weeks:'Week 1',owner:'Lead SAP',
   aim:'Agree the system with the client and make it part of the site safety rules.',
   tasks:['Present the system to the client, the principal contractor and the site Authorising Engineer','Write the procedure amendment to the site electrical safety rules and isolation procedure','Complete a risk assessment for the change, including the cut-over from the current method','Nominate the lead SAP as system owner and a document controller for the SLDs','Brief all current APs and SAPs and collect their comments'],
   outputs:['Signed approval to proceed','Draft procedure amendment','Change risk assessment'],
   gate:'Client and AE approval in writing. No work on site starts before this.'},
  {n:'1',name:'Survey',weeks:'Weeks 1–3',owner:'Lead SAP + APs',
   aim:'Find and list every point of isolation and earthing on site.',
   tasks:['Walk down every HV and LV switchboard against the current SLDs','List every circuit breaker, switch, disconnector, isolator and earth switch that can be locked','Record the locking method for each point (padlock hasp, Castell, shutter lock)','Note any point that cannot take a padlock and needs a hasp or adaptor','Mark drawing errors found during the walk-down for the document controller'],
   outputs:['Master point-of-isolation list','Drawing error list','Hasp and adaptor list'],
   gate:'Every switchboard walked and signed off by two people.'},
  {n:'2',name:'Number',weeks:'Weeks 2–3',owner:'Lead SAP',
   aim:'Give every point its own lock number, for life.',
   tasks:['Assign H-numbers to HV points and L-numbers to LV points, in SLD order','Assign hook numbers: Cabinet 1 (HV) C1-nn, Cabinet 2 (LV) C2-nn','Assign lockout box numbers LB-nn and Cabinet 3 bays C3-nn','Reserve a block of S-numbers for spares and replacements','Load the numbering into the Key tracker'],
   outputs:['Numbering schedule','Populated Key tracker'],
   gate:'Numbering schedule approved by the lead SAP. Numbers are then frozen.'},
  {n:'3',name:'Procure',weeks:'Weeks 2–5',owner:'Site manager',
   aim:'Buy everything needed to fit, store and track the locks.',
   tasks:['Safety padlocks, all keyed differently, no master key: one per point plus 10% spares','Colour-coded bodies or covers: red for HV, blue for LV','Three lockable key cabinets with numbered hooks and bays','Lockout boxes: enough for the peak number of live documents plus 25%','Personal CP locks (orange) for every current CP, plus spares for new starters','Engraved labels for every switch, reusable key-out tags, A1 SLD prints and frames'],
   outputs:['Purchase orders','Delivery schedule'],
   gate:'All materials on site and checked against the numbering schedule.'},
  {n:'4',name:'Drawings',weeks:'Weeks 4–6',owner:'Document controller',
   aim:'Show every lock number on the controlled SLDs.',
   tasks:['Add the lock number in a circle beside every switch symbol: red for H, blue for L','Correct the errors found in the survey','Issue the revised HV and LV SLDs under drawing control','Mount A1 prints in the AP office beside the matching cabinet','Withdraw superseded copies from site'],
   outputs:['Revised SLDs, controlled issue','Wall-mounted AP office copies'],
   gate:'Drawings checked against the survey list by an AP who did not draw them.'},
  {n:'5',name:'Install',weeks:'Weeks 5–7',owner:'APs',
   aim:'Fit the cabinets, labels and locks.',
   tasks:['Mount the three cabinets in the AP office and number every hook and bay','Fit an engraved label beside each locking point, matching the SLD','Hang each key on its numbered hook; tag and log each lock as it is allocated','Hold locks not yet in use in the cabinet; do not fit to live equipment outside a safety document','Record every lock, hook and box in the trackers'],
   outputs:['Cabinets installed','Every switch labelled','Trackers fully populated'],
   gate:'Full reconciliation: every number on the SLD has a label, a lock, a key and a hook.'},
  {n:'6',name:'Train',weeks:'Weeks 6–8',owner:'Lead SAP',
   aim:'Make sure everyone knows the new method before it goes live.',
   tasks:['AP and SAP briefing: issue, cancellation, handover, audits and lost keys','Practical run-through of a full permit issue and cancellation on the new system','Issue personal locks to all current CPs and record P-numbers','Add personal lock issue to the CP training course for new starters','Toolbox talk for working parties: own lock on, own lock off'],
   outputs:['Training record for every AP, SAP and CP','Personal lock register complete'],
   gate:'Every AP who will issue documents has been briefed and has done a practical run-through.'},
  {n:'7',name:'Go live',weeks:'Week 8',owner:'Lead SAP',
   aim:'Switch over on a set date without disturbing live work.',
   tasks:['Set a go-live date and publish it to all parties','From go-live, issue every new PTW, SFT and LOA under the new system','Let documents already live finish under the current method; do not transfer mid-document','Lead SAP in the AP office for the first week of issues','Daily debrief with APs for the first two weeks'],
   outputs:['Go-live notice','First documents issued on the new system'],
   gate:'Go-live readiness checklist complete (below).'},
  {n:'8',name:'Audit',weeks:'Weeks 9–20',owner:'Lead SAP',
   aim:'Prove the system works and keep it working.',
   tasks:['Daily: every empty hook has a tag that matches the tracker and a live document','Weekly: walk-down of 10% of fitted locks, number versus label versus SLD','Monthly: full reconciliation of all trackers','30-day and 90-day reviews with APs, CPs and the client','Update the procedure from lessons learned'],
   outputs:['Audit records','30-day and 90-day review reports'],
   gate:'90-day review signed off. The system becomes standard site practice.'}
];
const READY = [
  'Client and AE approval received in writing','Procedure amendment issued','Every point of isolation surveyed and numbered','Revised SLDs issued and mounted in the AP office','Every switch labelled with its lock number','Every key on its numbered hook','Lockout boxes numbered and in Cabinet 3','Key-out tags available at every cabinet','Trackers populated and checked','All APs and SAPs briefed with a practical run-through','Personal locks issued to all current CPs','Go-live date published to all parties'
];
const KPIS = [
  ['Time to locate keys for a new PTW','Under 5 minutes'],['Hooks without a tag or key at daily audit','Zero'],['Tracker mismatches at monthly reconciliation','Zero'],['Lost keys or unidentified locks','Zero; every one investigated'],['Documents issued with all lock numbers recorded','100%']
];
const RISKS = [
  ['Locks fitted before numbering is frozen','Numbers frozen at the end of phase 2; no fitting before phase 5'],
  ['Drawing and labels disagree','Independent check in phase 4; weekly walk-down in phase 8'],
  ['Two methods in use at once','Clear go-live date; no transfer of live documents mid-way'],
  ['Spare or duplicate keys bypass the system','Spares sealed in Cabinet 1; seal breaks logged by lead SAP'],
  ['Tracker not kept up to date','Daily audit and shift handover sign-off by both APs']
];
function plan(){
  const hero = pageHero(`<a href="${U('index.html')}">Home</a><span>/</span><span>Implementation plan</span>`, 'Implementation · PLAN', 'Implementation plan', 'Nine phases take the site from approval to a fully audited system in about 20 weeks. Each phase ends with a gate that must be passed before the next phase relies on it. Durations are indicative and set by the size of the site.');
  const bar = `<div class="phasebar">${PHASES.map(p => `<a href="#phase-${p.n}"><b>${p.n}</b><span>${p.name}</span><small>${p.weeks}</small></a>`).join('')}</div>`;
  const cards = PHASES.map(p => `
    <article class="phase" id="phase-${p.n}">
      <div class="pnum">${p.n}</div>
      <div class="pbody">
        <div class="pmeta"><span>${p.weeks}</span><span>Owner: ${p.owner}</span></div>
        <h3>${p.name}</h3>
        <p class="aim">${p.aim}</p>
        <div class="pcols">
          <div><h4>Tasks</h4><ul>${p.tasks.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>
          <div><h4>Outputs</h4><ul>${p.outputs.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>
        </div>
        <p class="gate"><b>Gate</b>${esc(p.gate)}</p>
      </div>
    </article>`).join('');
  const main = `
  <section class="block"><div class="wrap">
    <div class="block-head"><div class="eyebrow">Phases</div><h2>From approval to standard practice.</h2></div>
    <div class="barbox">${bar}</div>
    <div class="phases">${cards}</div>
  </div></section>
  <section class="block alt" id="ready"><div class="wrap">
    <div class="block-head"><div class="eyebrow">Gate for phase 7</div><h2>Go-live readiness checklist.</h2><p class="lead">Every item is ticked before the first document is issued on the new system. Ticks are saved on this device only.</p></div>
    <div class="ready-head"><span id="readyCount"></span><button type="button" class="btn ghost" id="readyReset" style="padding:10px 16px">Clear ticks</button></div>
    <ul class="checks">${READY.map((t,i)=>`<li><label><input type="checkbox" id="ready-${i}"><span>${esc(t)}</span></label></li>`).join('')}</ul>
  </div></section>
  <section class="block"><div class="wrap two">
    <div><div class="block-head"><div class="eyebrow">Measures</div><h2>How we know it works.</h2></div>
      <div class="tablebox plain"><table><thead><tr><th scope="col">Measure</th><th scope="col">Target</th></tr></thead><tbody>${KPIS.map(([a,b])=>`<tr><td data-label="Measure">${a}</td><td data-label="Target" style="color:var(--text);font-weight:700">${b}</td></tr>`).join('')}</tbody></table></div></div>
    <div><div class="block-head"><div class="eyebrow">Risks</div><h2>What could go wrong.</h2></div>
      <div class="tablebox plain"><table><thead><tr><th scope="col">Risk</th><th scope="col">Control</th></tr></thead><tbody>${RISKS.map(([a,b])=>`<tr><td data-label="Risk" style="color:var(--text)">${a}</td><td data-label="Control">${b}</td></tr>`).join('')}</tbody></table></div></div>
  </div></section>`;
  shell('plan', hero, main);
  const KEY = 'pt-ready';
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(_) {}
  const boxes = READY.map((_,i) => document.getElementById(`ready-${i}`));
  const count = document.getElementById('readyCount');
  const update = () => {
    const ticked = boxes.filter(b => b.checked).length;
    count.textContent = `${ticked} of ${READY.length} complete${ticked===READY.length ? ' · ready to go live' : ''}`;
    count.className = ticked===READY.length ? 'done' : '';
    try { localStorage.setItem(KEY, JSON.stringify(boxes.map(b => b.checked))); } catch(_) {}
  };
  boxes.forEach((b,i) => { b.checked = !!saved[i]; b.addEventListener('change', update); });
  document.getElementById('readyReset').addEventListener('click', () => { boxes.forEach(b => b.checked = false); update(); });
  update();
}

/* ---------- Start ---------- */
if(MARK){ const fav = document.createElement('link'); fav.rel = 'icon'; fav.href = MARK; document.head.appendChild(fav); }
const page = document.body.dataset.page;
if(page==='home') home();
else if(PAGES[page]) tracker(page);
else if(page==='record') record();
else if(page==='schematic') schematic();
else if(page==='plan') plan();
