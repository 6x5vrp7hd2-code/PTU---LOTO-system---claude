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
  cp: [
    {id:'P-002',name:'Erik Berg',company:'Powertec Utilities Ltd',role:'SAP',scope:'LV and HV to 22 kV, site lead SAP',phone:'+46 70 000 10 02',email:'e.berg@example.com',id06:'ID06-0000-1002',trained:'2024-09-02',authBy:'Site Authorising Engineer',expiry:'2027-09-01',status:'Active',emergency:'Karin Berg · +46 70 000 20 02'},
    {id:'P-004',name:'Johan Andersson',company:'Powertec Utilities Ltd',role:'AP',scope:'LV and HV to 22 kV',phone:'+46 70 000 10 04',email:'j.andersson@example.com',id06:'ID06-0000-1004',trained:'2025-03-12',authBy:'E. Berg (SAP)',expiry:'2027-03-11',status:'Active',emergency:'Anna Andersson · +46 70 000 20 04'},
    {id:'P-009',name:'Rasmus Holm',company:'Kraftservice AB',role:'AP',scope:'LV',phone:'+46 70 000 10 09',email:'r.holm@example.com',id06:'ID06-0000-1009',trained:'2025-06-02',authBy:'E. Berg (SAP)',expiry:'2027-06-01',status:'Active',emergency:'Lena Holm · +46 70 000 20 09'},
    {id:'P-018',name:'Sara Nyberg',company:'Nordel Electrical AB',role:'CP',scope:'LV mechanical and electrical',phone:'+46 70 000 10 18',email:'s.nyberg@example.com',id06:'ID06-0000-1018',trained:'2026-01-20',authBy:'J. Andersson (AP)',expiry:'2027-01-19',status:'Active',emergency:'Per Nyberg · +46 70 000 20 18'},
    {id:'P-026',name:'Oskar Dahl',company:'Nordel Electrical AB',role:'CP',scope:'LV',phone:'+46 70 000 10 26',email:'o.dahl@example.com',id06:'ID06-0000-1026',trained:'2026-02-04',authBy:'J. Andersson (AP)',expiry:'2027-02-03',status:'Active',emergency:'Maja Dahl · +46 70 000 20 26'},
    {id:'P-031',name:'Karin Lindqvist',company:'Nordel Electrical AB',role:'CP',scope:'LV, UPS and critical distribution',phone:'+46 70 000 10 31',email:'k.lindqvist@example.com',id06:'ID06-0000-1031',trained:'2025-11-10',authBy:'J. Andersson (AP)',expiry:'2026-11-09',status:'Active',emergency:'Erik Lindqvist · +46 70 000 20 31'},
    {id:'P-037',name:'Liam Byrne',company:'Hall Mechanical Ltd',role:'CP',scope:'LV',phone:'+44 7700 900 037',email:'l.byrne@example.com',id06:'ID06-0000-1037',trained:'2026-04-15',authBy:'R. Holm (AP)',expiry:'2027-04-14',status:'Active',emergency:'Niamh Byrne · +44 7700 900 137'},
    {id:'P-042',name:'Jonas Wikström',company:'Nordel Electrical AB',role:'CP',scope:'LV',phone:'+46 70 000 10 42',email:'j.wikstrom@example.com',id06:'ID06-0000-1042',trained:'2026-05-06',authBy:'J. Andersson (AP)',expiry:'2027-05-05',status:'Active',emergency:'Ida Wikström · +46 70 000 20 42'},
    {id:'P-044',name:'Tove Sjöberg',company:'Voltwise Testing AB',role:'CP',scope:'LV testing and commissioning',phone:'+46 70 000 10 44',email:'t.sjoberg@example.com',id06:'ID06-0000-1044',trained:'2025-09-01',authBy:'E. Berg (SAP)',expiry:'2026-08-31',status:'Expired',emergency:'Mats Sjöberg · +46 70 000 20 44'},
    {id:'P-052',name:'Mikael Ek',company:'Voltwise Testing AB',role:'CP',scope:'LV testing and commissioning',phone:'+46 70 000 10 52',email:'m.ek@example.com',id06:'ID06-0000-1052',trained:'2026-03-18',authBy:'E. Berg (SAP)',expiry:'2027-03-17',status:'Active',emergency:'Sofia Ek · +46 70 000 20 52'},
    {id:'P-061',name:'Alva Lund',company:'Kraftservice AB',role:'CP',scope:'Battery and BESS rooms, inspection only',phone:'+46 70 000 10 61',email:'a.lund@example.com',id06:'ID06-0000-1061',trained:'2026-06-22',authBy:'R. Holm (AP)',expiry:'2027-06-21',status:'Active',emergency:'Hugo Lund · +46 70 000 20 61'},
    {id:'P-070',name:'Filip Strand',company:'Brandskydd Norr AB',role:'CP',scope:'Battery rooms, non-electrical work',phone:'+46 70 000 10 70',email:'f.strand@example.com',id06:'ID06-0000-1070',trained:'2026-07-01',authBy:'E. Berg (SAP)',expiry:'2027-06-30',status:'Suspended',emergency:'Elin Strand · +46 70 000 20 70'}
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


/* ---------- Pages ---------- */
const PAGES = {
  keys:{file:'keys.html',nav:'KEYS',title:'Key Tracker',code:'H · L',banner:'banner-keys.jpg',blurb:'Every dedicated HV and LV safety lock, its numbered hook, and where its key is right now.',
    cols:[['id','Lock no.'],['sys','System'],['board','Board'],['point','Point of isolation'],['status','Status'],['where','Key location']]},
  info:{file:'info.html',nav:'INFORMATION',title:'Information Tracker',code:'LB',banner:'banner-keys.jpg',blurb:'Each lockout box, the safety document it serves, and the keys and personal locks on it.',
    cols:[['id','Box no.'],['status','Status'],['doc','Safety document'],['keysN','Keys inside'],['plocksN','Personal locks'],['issued','Issued']]},
  ptw:{file:'ptw.html',nav:'PTW',title:'Permit to Work Tracker',code:'PTW',banner:'banner-permits.jpg',blurb:'Live, pending and cancelled permits, with their isolations and lockout boxes.',
    cols:[['id','Permit no.'],['status','Status'],['work','Work'],['loc','Location'],['cp','Competent person'],['box','Box']]},
  sft:{file:'sft.html',nav:'SFT',title:'Sanction for Test Tracker',code:'SFT',banner:'banner-permits.jpg',blurb:'Sanctions for test, the test being carried out, and the isolation that secures it.',
    cols:[['id','Sanction no.'],['status','Status'],['work','Work'],['test','Test'],['cp','Competent person'],['box','Box']]},
  loa:{file:'loa.html',nav:'LOA',title:'Limitation of Access Tracker',code:'LOA',banner:'banner-substation.jpg',blurb:'Areas with restricted access, who holds the limitation, and its boundaries.',
    cols:[['id','LOA no.'],['status','Status'],['area','Area'],['reason','Reason'],['holder','Holder'],['expiry','Expires']]},
  cp:{file:'cp.html',nav:'CP REGISTER',title:'CP Register',code:'P',banner:'banner-substation.jpg',blurb:'Every competent person on site, their personal lock, company, contact details and authorisation.',
    cols:[['id','Lock no.'],['name','Name'],['company','Company'],['role','Role'],['phone','Phone'],['status','Status'],['expiry','Authorised until']]}
};
const NAV = [['index.html','HOME','home'],['keys.html','KEYS','keys'],['info.html','INFORMATION','info'],['ptw.html','PTW','ptw'],['sft.html','SFT','sft'],['loa.html','LOA','loa'],['cp.html','CP REGISTER','cp'],['procedure.html','PROCEDURE','procedure'],['lv-schematic.html','SCHEMATICS','schematic']];

/* ---------- Icons (Powertec orange) ---------- */
const I = {
  arrow:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" style="vertical-align:-4px"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
  keys:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4"><circle cx="20" cy="24" r="10"/><circle cx="20" cy="24" r="3" fill="currentColor"/><path d="M28 30l22 22M42 44l5-5M47 49l5-5"/></svg>',
  info:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4"><rect x="10" y="26" width="44" height="28" fill="currentColor" fill-opacity=".15"/><path d="M20 26v-7a12 12 0 0124 0v7M32 36v8"/><circle cx="32" cy="36" r="3" fill="currentColor"/></svg>',
  ptw:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4"><path d="M16 8h24l10 10v38H16z"/><path d="M40 8v10h10M23 30h20M23 38h20M23 46h12"/></svg>',
  sft:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4"><path d="M36 6L18 36h14l-4 22 18-30H32z" fill="currentColor"/></svg>',
  loa:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4"><path d="M8 54h48M14 54V22M50 54V22M14 26h36v12H14z"/><path d="M22 26l-8 12M34 26l-8 12M46 26l-8 12"/></svg>',
  cp:'<svg viewBox="0 0 64 64" fill="currentColor"><path d="M18 28a14 14 0 0128 0v2H18z"/><rect x="14" y="30" width="36" height="4" rx="2"/><circle cx="32" cy="42" r="8"/><path d="M14 62c0-10 8-14 18-14s18 4 18 14z"/></svg>',
  procedure:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4"><rect x="12" y="10" width="40" height="48" rx="3"/><path d="M24 6h16v8H24z" fill="currentColor"/><path d="M20 30l4 4 8-8M36 32h10M20 46l4 4 8-8M36 48h10"/></svg>',
  schematic:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4"><path d="M32 4v10"/><circle cx="32" cy="20" r="6"/><circle cx="32" cy="29" r="6"/><path d="M32 35v9M10 44h44M16 44v12M32 44v12M48 44v12"/></svg>',
  shield:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4"><path d="M32 4l22 8v16c0 14-9 25-22 30C19 53 10 42 10 28V12z"/><path d="M32 4v54C45 53 54 42 54 28V12z" fill="currentColor"/></svg>',
  lock:'<svg viewBox="0 0 64 64" fill="currentColor"><path d="M20 28v-8a12 12 0 0124 0v8h-6v-8a6 6 0 00-12 0v8z"/><rect x="12" y="28" width="40" height="30" rx="3"/></svg>',
  tag:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4"><path d="M8 8h24l24 24-24 24L8 32z"/><circle cx="20" cy="20" r="4" fill="currentColor"/></svg>'
};

/* ---------- Helpers ---------- */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SETS = Object.keys(DATA);
function find(id){ id = String(id||'').toUpperCase(); for(const s of SETS){ const r = DATA[s].find(x => x.id.toUpperCase() === id); if(r) return {set:s, r}; } return null; }
const recUrl = id => `record.html?id=${encodeURIComponent(id)}`;
const link = id => !id ? '' : find(id) ? `<a href="${recUrl(id)}">${esc(id)}</a>` : `<span>${esc(id)}</span>`;
const person = s => { const m = String(s||'').match(/P-\d{3}/); return m && find(m[0]) ? esc(s).replace(m[0], `<a href="${recUrl(m[0])}" class="plink">${m[0]}</a>`) : esc(s); };
const linkList = ids => ids && ids.length ? `<div class="links">${ids.map(link).join('')}</div>` : '<p style="margin:0;color:#777">None</p>';
function chipClass(s){
  if(s==='In cabinet' || s==='Active') return 's-good';
  if(s==='Expired' || s==='Out of service') return 's-crit';
  if(s==='Suspended' || s==='With AP' || s==='Pending issue') return 's-warn';
  if(['Live','In use','In lockout box'].includes(s)) return 's-hot';
  return 's-idle';
}
const chip = s => `<span class="chip ${chipClass(s)}">${esc(s)}</span>`;
const sys = s => `<span class="sys ${s.toLowerCase()}">${s}</span>`;
const mono = v => v ? `<span class="mono">${esc(v)}</span>` : '';
const U = p => p;

/* ---------- Header and footer: same structure as the Powertec Utilities site ---------- */
const lockup = (dark=false) => `<span class="lockup${dark?' dark':''}"><img src="mark.png" alt=""><span><b>POWERTEC</b><i>UTILITIES</i></span></span>`;
function shell(page, top, body){
  document.body.innerHTML = `
  <header class="site-header"><div class="wrap nav">
    <a href="index.html" aria-label="Powertec Utilities, isolation control home">${lockup()}</a>
    <button class="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="navlinks">☰</button>
    <nav class="navlinks" id="navlinks" aria-label="Main menu">${NAV.map(([h,l,k]) => `<a href="${h}"${k===page?' class="active" aria-current="page"':''}>${l}</a>`).join('')}<a class="enquire${page==='new'?' active':''}" href="new.html">+ NEW DOCUMENT</a></nav>
  </div></header>
  ${top}
  <main>${body}</main>
  <footer><div class="wrap">
    <div class="footer-grid">
      <a href="index.html">${lockup(true)}</a>
      <div class="footer-tag">KEYS<i>|</i>LOCKS<i>|</i>PERMITS<i>|</i>SANCTIONS<i>|</i>ACCESS</div>
      <div class="footer-copy">© ${new Date().getFullYear()} Powertec Utilities Ltd</div>
    </div>
    <nav class="footer-nav" aria-label="Footer">${NAV.map(([h,l]) => `<a href="${h}">${l}</a>`).join('')}<a href="new.html">NEW DOCUMENT</a></nav>
  </div></footer>`;
  const button = document.querySelector('.menu-toggle'), nav = document.querySelector('.navlinks');
  button.addEventListener('click', () => { const open = nav.classList.toggle('open'); button.setAttribute('aria-expanded', open ? 'true' : 'false'); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); button.setAttribute('aria-expanded','false'); }));
}
const banner = (img, title, crumbs, tag=true) => `
  <section class="page-banner" style="background-image:url('${img}')"><div class="wrap">
    ${crumbs ? `<div class="crumbs">${crumbs}</div>` : ''}
    <h1>${title.toUpperCase()}</h1>
    ${tag ? '<span class="example-tag">EXAMPLE DATA</span>' : ''}
  </div></section>`;
const crumb = (...parts) => ['<a href="index.html">HOME</a>', ...parts].join('<span>/</span>');

/* ---------- Home ---------- */
function home(){
  const n = (set, st) => DATA[set].filter(r => r.status===st).length;
  const top = `
  <section class="home-hero"><div class="wrap hero-grid">
    <div class="hero-copy">
      <h1>ISOLATION &amp; SAFETY DOCUMENT CONTROL</h1>
      <div class="orange-line">Keys | Locks | Permits | Sanctions | Limitation of Access</div>
      <p>One dedicated, numbered lock on every switch, circuit breaker and isolator, shown beside it on the single line diagram.</p>
      <p>When a key leaves its hook, a tag takes its place and this register shows where it went, which safety document it serves and who is working under it.</p>
      <div class="btn-row"><a class="btn" href="new.html">+ NEW SAFETY DOCUMENT</a><a class="btn ghost" href="keys.html">OPEN KEY TRACKER</a></div>
    </div>
    <div class="hero-photo"><img src="hero.jpg" alt="HV substation at night"></div>
  </div></section>`;
  const svc = (icon, title, text) => `<div class="home-service"><div class="svc-icon">${icon}</div><h3>${title}</h3><p>${text}</p></div>`;
  const row = key => { const p = PAGES[key]; return `<div class="service-row"><div class="bigicon">${I[key]}</div><div><h3>${p.title.toUpperCase()}</h3><p class="count">${DATA[key].length} RECORDS · ${p.code}</p><p>${p.blurb}</p><a class="more" href="${p.file}">OPEN ${p.nav} →</a></div></div>`; };
  const body = `
  <section><div class="wrap home-services">
    ${svc(I.lock,'DEDICATED LOCKS','One numbered lock per switch, CB and isolator, shown in a circle on the single line diagram.')}
    ${svc(I.tag,'KEY-OUT TAGS','An empty hook always carries a tag naming the safety document, lockout box, AP and time.')}
    ${svc(I.cp,'PERSONAL LOCKS','Each competent person is issued their own numbered lock at CP training, for life on site.')}
    ${svc(I.procedure,'ONE REGISTER','Locks, lockout boxes, people and safety documents tied together in one record.')}
  </div></section>
  <section class="home-positioning"><div class="wrap position-grid">
    <h2>A structured key system for the AP office.</h2>
    <p>No more searching for keys. Each lock has a fixed home, every key movement is tagged and logged, and every safety document shows exactly which locks and lockout box secure it.</p>
  </div></section>
  <section class="page-body"><div class="wrap">
    <span class="eyebrow">SITE STATUS NOW</span>
    <div class="capability-grid status-grid">
      <div class="capability"><strong>${n('ptw','Live')}</strong><span>Live permits to work</span></div>
      <div class="capability"><strong>${n('keys','In lockout box')}</strong><span>Keys in lockout boxes</span></div>
      <div class="capability"><strong>${n('sft','Live')}</strong><span>Live sanctions for test</span></div>
      <div class="capability"><strong>${n('loa','Live')}</strong><span>Live limitations of access</span></div>
    </div>
    <span class="example-tag" style="margin-bottom:44px">EXAMPLE DATA</span>
    <span class="eyebrow">TRACKERS AND REGISTERS</span>
    <h2 class="section-title">Every key, permit and person in one place.</h2>
    <div class="service-stack">
      ${row('keys')}${row('info')}${row('ptw')}${row('sft')}${row('loa')}${row('cp')}
      <div class="service-row"><div class="bigicon">${I.procedure}</div><div><h3>SYSTEM PROCEDURE</h3><p class="count">7 STAGES · STEP BY STEP</p><p>Plan, draw keys, isolate, secure, issue, work, cancel. Plus handover, audits and lost keys.</p><a class="more" href="procedure.html">OPEN PROCEDURE →</a></div></div>
      <div class="service-row"><div class="bigicon">${I.schematic}</div><div><h3>SCHEMATICS</h3><p class="count">2 DRAWINGS · LOCK NUMBERS</p><p>Single line diagrams with a numbered lock circle beside every switch, CB and isolator: red for HV, blue for LV.</p><a class="more" href="lv-schematic.html">OPEN SCHEMATICS →</a></div></div>
    </div>
  </div></section>`;
  shell('home', top, body);
}

/* ---------- Tracker pages ---------- */
function cell(r, key){
  switch(key){
    case 'id': return `<a href="${recUrl(r.id)}" class="mono">${esc(r.id)}</a>`;
    case 'status': return chip(r.status);
    case 'sys': return sys(r.sys);
    case 'where': return r.status==='In cabinet' ? `Hook <span class="mono">${esc(r.hook)}</span>` : r.box ? `<span class="mono">${esc(r.box)} · ${esc(r.doc)}</span>` : r.status==='With AP' ? `With AP · <span class="mono">${esc(r.doc)}</span>` : 'Withdrawn';
    case 'keysN': return r.keys.length ? mono(r.keys.join(', ')) : '—';
    case 'plocksN': return r.plocks.length ? mono(r.plocks.join(', ')) : '—';
    case 'doc': case 'box': case 'issued': case 'expiry': case 'phone': return r[key] ? mono(r[key]) : '—';
    case 'name': return `<b style="color:#171717">${esc(r.name)}</b>`;
    default: return esc(r[key]) || '—';
  }
}
function tracker(key){
  const p = PAGES[key], rows = DATA[key];
  const statuses = ['All', ...new Set(rows.map(r => r.status))];
  const canNew = ['ptw','sft','loa'].includes(key);
  const body = `<section class="page-body"><div class="wrap">
    <div class="intro-row"><div class="service-intro"><span class="eyebrow">${p.code}</span><p style="margin:0;font-size:17px">${p.blurb} Select any line to open its full record.</p></div>${canNew ? `<a class="btn" style="margin:0" href="new.html?type=${key.toUpperCase()}">+ NEW ${key.toUpperCase()}</a>` : ''}</div>
    <div class="toolbar">
      <label class="search">${I.search}<input id="q" type="search" placeholder="Search number, board, name…" aria-label="Search ${p.title}"></label>
      <div class="filters" role="group" aria-label="Filter by status">${statuses.map((s,i) => `<button type="button" data-f="${esc(s)}" aria-pressed="${i===0}">${esc(s.toUpperCase())}</button>`).join('')}</div>
    </div>
    <div class="result-count" id="count"></div>
    <div class="tablebox"><table>
      <thead><tr>${p.cols.map(c => `<th scope="col">${c[1].toUpperCase()}</th>`).join('')}<th scope="col"><span style="position:absolute;left:-9999px">Open record</span></th></tr></thead>
      <tbody id="rows"></tbody>
    </table></div>
  </div></section>`;
  shell(key, banner(p.banner, p.title, crumb(p.nav)), body);
  let q = '', f = 'All';
  const tbody = document.getElementById('rows'), count = document.getElementById('count');
  function draw(){
    const ql = q.toLowerCase();
    const shown = rows.filter(r => (f==='All' || r.status===f) && (!ql || JSON.stringify(r).toLowerCase().includes(ql)));
    count.textContent = `${shown.length} OF ${rows.length} RECORDS`;
    tbody.innerHTML = shown.length ? shown.map(r => `<tr data-id="${esc(r.id)}" tabindex="0">${p.cols.map(c => `<td data-label="${c[1]}">${cell(r,c[0])}</td>`).join('')}<td class="go">OPEN →</td></tr>`).join('')
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

/* ---------- Record pages ---------- */
const fields = list => `<dl class="fields">${list.map(([k,v,w]) => `<div class="field${w?' wide':''}"><dt>${k.toUpperCase()}</dt><dd>${v || '—'}</dd></div>`).join('')}</dl>`;
const card = (title, html, cls='') => `<div class="value-card ${cls}"><h3>${title}</h3>${html}</div>`;
function logCard(id){
  const L = id && LOGS[id];
  return card('Activity log', L ? `<ol class="log">${L.map(([t,m]) => `<li><time>${esc(t)}</time><span>${esc(m)}</span></li>`).join('')}</ol>` : '<p>No movements recorded.</p>');
}
function record(){
  const qs = new URLSearchParams(location.search), id = qs.get('id');
  const hit = find(id);
  if(!hit){
    shell('', banner('banner-keys.jpg','Record not found', crumb('RECORD'), false), `<section class="page-body"><div class="wrap"><p>No record matches “${esc(id || '')}”. Open a tracker and select a line.</p><a class="btn" href="keys.html">OPEN KEY TRACKER</a></div></section>`);
    return;
  }
  const {set, r} = hit, p = PAGES[set];
  const notes = r.notes ? [['Notes',esc(r.notes),1]] : [];
  let body = '', side = '';
  if(set==='keys'){
    body = fields([['Lock no.',mono(r.id)],['System',sys(r.sys)],['Board',esc(r.board)],['Cabinet hook',mono(r.hook)],['Point of isolation',esc(r.point),1],['SLD drawing',mono(r.sld)],['Lock fitted',mono(r.fitted)],['Condition',esc(r.cond),1]]);
    const tag = (r.status==='In lockout box' || r.status==='With AP') ? `<div class="hooktag"><b>KEY-OUT TAG · HOOK ${esc(r.hook)}</b><div><span>Lock / key</span><span class="mono">${esc(r.id)}</span></div><div><span>Status</span><span>${esc(r.status.toUpperCase())}</span></div><div><span>Lockout box</span><span class="mono">${esc(r.box || '—')}</span></div><div><span>Document</span><span class="mono">${esc(r.doc)}</span></div></div>`
      : r.status==='Out of service' ? '<p>Hook empty. Lock withdrawn from service; see condition.</p>' : `<p>Key is on hook <span class="mono">${esc(r.hook)}</span>.</p>`;
    side = card(`Hook ${esc(r.hook)}`, tag) + card('Linked records', linkList([r.doc, r.box].filter(Boolean))) + (r.doc ? logCard(r.doc) : '');
  }
  if(set==='info'){
    body = fields([['Box no.',mono(r.id)],['Cabinet 3 bay',mono(r.bay)],['Safety document',link(r.doc)],['Issued',mono(r.issued)],['AP lock',person(r.aplock),1],['Isolation keys inside',r.keys.length?linkList(r.keys):'',1],['Personal locks applied',r.plocks.length?linkList(r.plocks):'',1]]);
    side = card('Box can be opened when', `<p>${r.plocks.length ? `All ${r.plocks.length} personal locks have been removed by their holders, then the AP removes their own lock.` : 'Box is empty and not in use.'}</p>`) + (r.doc ? logCard(r.doc) : '');
  }
  if(set==='ptw' || set==='sft'){
    body = fields([[set==='ptw'?'Permit no.':'Sanction no.',mono(r.id)],['System',sys(r.sys)],['Work',esc(r.work),1],...(set==='sft'?[['Test',esc(r.test),1]]:[]),['Location',esc(r.loc),1],['Issued by',esc(r.ap)],['Competent person',person(r.cp)],['Issued',mono(r.issued)],['Expires',mono(r.expiry)],['Isolation locks',linkList(r.keys),1],['Lockout box',link(r.box)],['Limitation of access',link(r.loa)],...notes]);
    side = cpPanel(r.cp,'Competent person') + cancelPanel(r) + logCard(r.id);
  }
  if(set==='loa'){
    body = fields([['LOA no.',mono(r.id)],['Linked permit',link(r.ptw)],['Area',esc(r.area),1],['Reason',esc(r.reason),1],['Boundaries',esc(r.bounds),1],['Issued by',esc(r.ap)],['Holder',person(r.holder)],['Issued',mono(r.issued)],['Expires',mono(r.expiry)],...notes]);
    side = cpPanel(r.holder,'LOA holder') + cancelPanel(r) + logCard(r.id);
  }
  if(set==='cp'){
    const docs = [...DATA.ptw.map(d=>[d,d.cp]), ...DATA.sft.map(d=>[d,d.cp]), ...DATA.loa.map(d=>[d,d.holder])].filter(([d,c]) => String(c).includes(r.id)).map(([d]) => d);
    const boxes = DATA.info.filter(b => b.plocks.includes(r.id) || String(b.aplock).includes(r.id));
    const live = docs.filter(d => d.status==='Live');
    body = fields([['Personal lock no.',mono(r.id)],['Role',esc(r.role)],['Name',esc(r.name)],['Company',esc(r.company)],['Phone',mono(r.phone)],['Email',mono(r.email)],['ID06 card',mono(r.id06)],['Emergency contact',esc(r.emergency)],['Authorised for',esc(r.scope),1],['CP training completed',mono(r.trained)],['Authorised by',esc(r.authBy)],['Authorised until',mono(r.expiry)],['Status',chip(r.status)]]);
    side = card('Contact', `<div class="cpcard">${cpCard(r,false)}</div>`, 'cpwrap')
      + (r.status!=='Active' ? card('Not to receive documents', `<p>Authorisation is ${r.status.toLowerCase()}. Do not issue a PTW, SFT or LOA to this person.</p>`, 'warn-card') : '')
      + card('Lock on site now', boxes.length ? `<p>Personal lock is on ${boxes.map(b => link(b.id)).join(', ')}.</p>` : '<p>Not on any lockout box.</p>')
      + card('Live documents', live.length ? linkList(live.map(d => d.id)) : '<p>None</p>')
      + card('Document history', docs.length ? linkList(docs.map(d => d.id)) : '<p>None recorded</p>');
  }
  const titles = {cp:r.name, keys:r.point, info:r.doc ? `Serving ${r.doc}` : 'Lockout box', ptw:r.work, sft:r.work, loa:r.area};
  document.title = `${r.id} · Powertec Isolation Control`;
  const main = `<section class="page-body"><div class="wrap">
    <div class="rec-head"><div><div class="rec-id">${esc(r.id)}${r.local ? ' · ISSUED ON THIS DEVICE' : ''}</div><h2>${esc(titles[set])}</h2></div>${chip(r.status)}</div>
    ${qs.get('created') ? `<p class="saved">${esc(r.id)} issued and saved on this device. Its keys and lockout box are now shown against it in the trackers.</p>` : ''}
    <div class="rec-grid"><div>${body}</div><aside class="side">${side}</aside></div>
    <a class="back" href="${p.file}">← BACK TO ${p.title.toUpperCase()}</a>
  </div></section>`;
  shell(set, banner(p.banner, p.title, crumb(`<a href="${p.file}">${p.nav}</a>`, esc(r.id)), !r.local), main);
  wireRecord(r);
}

/* ---------- System procedure ---------- */
const STAGES = [
  {k:'plan',name:'Plan the isolation',who:'AP',
   steps:['Mark the points of isolation and earthing on a copy of the SLD. Read the circled lock number beside each switch.','Write the switching programme, listing every point with its lock number, for example LV-MSB-B ACB Q1 · L-121.','Open the Key tracker and check every listed lock shows IN CABINET.','Open the CP register and check the CP who will receive the document is Active and authorised for this system.'],
   site:'No change yet. The switching programme is ready.',
   stop:'Any lock not IN CABINET, or a CP not Active: stop and resolve before going on.'},
  {k:'draw',name:'Draw the keys and a lockout box',who:'AP',
   steps:['Take each key from its numbered hook in Cabinet 1 (HV) or Cabinet 2 (LV).','Hang a key-out tag on each empty hook: lock no., status WITH AP, document no., your name, time.','Take a free lockout box from Cabinet 3 and tag its empty bay the same way.'],
   site:'Key tracker: each key → With AP. Information tracker: box → In use, against the document number.',
   stop:'Every empty hook and bay carries a tag before you leave the AP office.'},
  {k:'isolate',name:'Isolate, lock and earth',who:'AP',
   steps:['Carry out the switching programme in order.','At each point, fit its dedicated lock. Check the number on the lock matches the switch label and the SLD.','Prove dead and apply earths as the safety rules require. Lock earth switches with their own dedicated locks.','Post caution and danger notices.'],
   site:'No change. Keys stay in the AP\'s hand.',
   stop:'A lock number that does not match the label or SLD: stop. Do not fit a different lock.'},
  {k:'secure',name:'Secure the keys',who:'AP',
   steps:['Place every isolation key in the lockout box. Count them against the switching programme.','Close the box and fit your own personal lock (your P-number) as the AP lock.','Update each hook tag from WITH AP to IN LOCKOUT BOX, LB-nn.'],
   site:'Key tracker: each key → In lockout box, LB-nn. Information tracker: AP lock recorded.',
   stop:'Key count must match the switching programme exactly.'},
  {k:'issue',name:'Issue the safety document',who:'AP and CP',
   steps:['Use + New document to raise the PTW or SFT. Choose the locks, lockout box, CP and working party from the lists.','At the point of work, show the CP the isolation, earths and notices, and brief the work.','Issue the document. The CP signs receipt.','The CP and every member of the working party fit their own personal lock to the lockout box.'],
   site:'PTW or SFT tracker: document → Live. Information tracker: personal locks recorded. CP register: document shown against the CP.',
   stop:'Nobody works without their own lock on the box.'},
  {k:'work',name:'During the work',who:'CP and working party',
   steps:['The CP keeps the working party within the limits of the document.','A person joining fits their own lock and is added to the document. A person leaving removes their own lock and is signed off.','Nobody removes another person\'s lock, for any reason.','Where live equipment is close by, the AP issues a Limitation of Access with clear boundaries.'],
   site:'Information tracker: personal locks added or removed. LOA tracker: LOA → Live if issued.',
   stop:'The box cannot be opened while any personal lock is on it.'},
  {k:'cancel',name:'Cancel and restore',who:'CP then AP',
   steps:['The CP confirms the work is complete, the working party is withdrawn, and signs the document for cancellation.','Each person removes their own personal lock.','The AP removes the AP lock, opens the box and counts the keys against the document.','Remove earths and locks, and restore the system as per the switching programme.','Return each key to its own numbered hook, remove the key-out tag, return the box to its bay, then press Cancel document on the record.'],
   site:'Key tracker: each key → In cabinet. Information tracker: box → In cabinet. PTW / SFT / LOA tracker: → Cancelled.',
   stop:'Tag, hook and tracker must agree before the AP leaves the office.'}
];
const ROUTINES = [
  {name:'Shift handover',who:'OUTGOING AND INCOMING AP',steps:['Check together: empty hooks against tags, against the Key tracker, against live documents.','Resolve any difference before the outgoing AP leaves.','Both APs sign the handover entry.']},
  {name:'Daily check',who:'AP ON DUTY · 5 MINUTES',steps:['Every empty hook has a tag.','Every tag matches the Key tracker and a live document.','Every lockout box out of Cabinet 3 is tied to a live document.']},
  {name:'Weekly walk-down',who:'AP',steps:['Pick 10% of fitted locks on site.','Check lock number against switch label against SLD.','Record the result; correct any error the same day.']},
  {name:'Monthly reconciliation',who:'LEAD SAP',steps:['Reconcile every tracker and the CP register.','Check CP authorisations due to expire in the next 30 days.','Review incidents and near misses.']},
  {name:'Lost key or unknown lock',who:'AP AND LEAD SAP',steps:['Stop. Treat the isolation as uncertain; do not issue or cancel against it.','Tell the lead SAP and record an incident.','Under SAP control re-prove the isolation, then remove the lock by an approved method.','Fit a new lock with a new number; update the label, the SLD and the Key tracker. Retire the old number.']},
  {name:'New CP joins site',who:'LEAD SAP',steps:['Confirm CP training is complete and the authorisation is signed.','Issue the next free personal lock and engrave the P-number.','Add the person to the CP register with their contact details.']}
];
function procedure(){
  let n = 0;
  const bar = `<div class="work-flow stage-bar">${STAGES.map((s,i) => `<a class="work-step" href="#stage-${s.k}"><b>STAGE ${i+1}</b><h3>${s.name}</h3><p>${s.who}</p></a>`).join('')}</div>`;
  const stages = STAGES.map((s,i) => `
    <article class="stage" id="stage-${s.k}">
      <div class="stage-num">${i+1}</div>
      <div>
        <h3>${s.name.toUpperCase()}</h3>
        <div class="who">STAGE ${i+1} OF ${STAGES.length} · DONE BY: ${s.who.toUpperCase()}</div>
        <div class="stage-cols">
          <div><h4>STEPS</h4><ol class="steps-list">${s.steps.map(t => `<li><span class="sn">${++n}</span><span>${esc(t)}</span></li>`).join('')}</ol></div>
          <div><h4>ON THIS SITE</h4><p class="site-note">${esc(s.site)}</p></div>
        </div>
        <p class="stop"><b>STOP CHECK</b>${esc(s.stop)}</p>
      </div>
    </article>`).join('');
  const statuses = [['In cabinet','Key on its own hook. Free to use.'],['With AP','Drawn for a document and being taken to the switch. Never left overnight.'],['In lockout box','Inside a box under a live document. Box locked by the AP and working party.'],['Out of service','Lock damaged or under replacement. Hook carries a tag.']];
  const body = `
  <section class="page-body"><div class="wrap">
    <div class="service-intro"><span class="eyebrow">STEP BY STEP</span><h2 class="section-title">One document, seven stages.</h2><p>Every Permit to Work and Sanction for Test follows the same seven stages, from planning the isolation to returning the last key to its hook. Each stage says who does it, what changes in the trackers, and when to stop.</p></div>
    <div class="work-section" style="margin-top:0">${bar}</div>
    <div class="service-stack" style="margin-top:20px">${stages}</div>
  </div></section>
  <section class="values-section"><div class="wrap">
    <div class="section-heading"><span class="eyebrow">ROUTINES</span><h2 class="section-title">Keeping the system right.</h2></div>
    <div class="routines">${ROUTINES.map(r => `<div class="value-card"><strong>${r.who}</strong><h3>${r.name}</h3><ol>${r.steps.map(t => `<li>${esc(t)}</li>`).join('')}</ol></div>`).join('')}</div>
  </div></section>
  <section class="approach-section"><div class="wrap approach-grid">
    <div><span class="eyebrow">QUICK REFERENCE</span><h2 class="section-title">What each key status means.</h2></div>
    <div class="approach-points">${statuses.map(([s,m]) => `<div class="approach-point"><h3>${chip(s)}</h3><p>${m}</p></div>`).join('')}</div>
  </div></section>`;
  shell('procedure', banner('banner-network.jpg','System Procedure', crumb('PROCEDURE'), false), body);
}

/* ---------- Schematics ---------- */
function schematic(){
  const dwg = (file, title, sub, h, l) => `<figure class="dwg"><figcaption><div><h3>${title}</h3><p>${sub}</p></div><div class="dwg-count"><span class="pill hv">${h} HV</span><span class="pill lv">${l} LV</span></div></figcaption><a href="${file}" target="_blank" rel="noopener"><img src="${file}" alt="${title}, numbered" loading="lazy"></a><a class="btn" style="margin:0" href="${file}" target="_blank" rel="noopener">OPEN FULL SIZE</a></figure>`;
  const body = `<section class="page-body"><div class="wrap">
    <div class="service-intro"><span class="eyebrow">SINGLE LINE DIAGRAMS · LOCK NUMBERS</span><p style="margin:0;font-size:17px">Every switch, circuit breaker and isolator carries a numbered circle: red for HV, blue for LV. The number is the dedicated lock for that point, H-number for HV and L-number for LV. Tap a drawing to open it full size and zoom in.</p></div>
    <div class="legend" style="margin:0 0 24px"><span><svg width="22" height="22" aria-hidden="true"><circle cx="11" cy="11" r="9" fill="#fff" stroke="#C81E1E" stroke-width="2.5"/><text x="11" y="15" text-anchor="middle" font-size="11" font-weight="700" fill="#C81E1E">1</text></svg>HV switch, CB or isolator · lock H-001</span><span><svg width="22" height="22" aria-hidden="true"><circle cx="11" cy="11" r="9" fill="#fff" stroke="#145AC8" stroke-width="2.5"/><text x="11" y="15" text-anchor="middle" font-size="11" font-weight="700" fill="#145AC8">1</text></svg>LV switch, CB, ATS or STS · lock L-001</span></div>
    <div class="dwgs">
      ${dwg('sld-tier4.jpg','TIER IV DATA CENTRE','132 kV dual utility feed, 11 kV switchboards, 415 V distribution to row PDUs',25,55)}
      ${dwg('sld-hyperscale.jpg','HYPERSCALE 2N ARCHITECTURE','400 kV GIS, 22 kV ring main, 11 kV generators, 400 V switchboards to STS',32,26)}
    </div>
    <p style="margin-top:20px;color:#777;font-size:14px">Earth switches on the 400 kV drawing are numbered too, as they take a dedicated lock. Generators, transformers, CTs and PTs are not switching points and carry no number.</p>
  </div></section>`;
  shell('schematic', banner('banner-network.jpg','Schematics', crumb('SCHEMATICS'), false), body);
}
/* ---------- New safety documents (saved on this device) ----------
   Every new PTW, SFT or LOA, and every cancellation, is stored as an event in this browser's
   storage and replayed over the example data each time a page opens. */
const STORE = 'pt-events-v1';
function loadEvents(){ try { return JSON.parse(localStorage.getItem(STORE) || '[]'); } catch(_) { return []; } }
function saveEvents(ev){ try { localStorage.setItem(STORE, JSON.stringify(ev)); return true; } catch(_) { return false; } }
function addEvent(e){ const ev = loadEvents(); ev.push(e); return saveEvents(ev); }
function stamp(d = new Date()){ const p = n => String(n).padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; }
const hhmm = s => String(s).slice(11);
const docSet = id => id.startsWith('PTW') ? 'ptw' : id.startsWith('SFT') ? 'sft' : 'loa';
function applyEvent(e){
  if(e.op === 'create'){
    const d = e.doc, set = docSet(d.id);
    if(DATA[set].some(x => x.id === d.id)) return;
    d.local = true; DATA[set].unshift(d);
    (d.keys || []).forEach(k => { const r = DATA.keys.find(x => x.id === k); if(r){ r.status = 'In lockout box'; r.doc = d.id; r.box = d.box; } });
    if(d.box){ const b = DATA.info.find(x => x.id === d.box); if(b){ b.status = 'In use'; b.doc = d.id; b.keys = [...(d.keys || [])]; b.aplock = d.apLock || ''; b.plocks = [...(d.plocks || [])]; b.issued = d.issued; } }
    if(set === 'loa' && d.ptw){ const p = DATA.ptw.find(x => x.id === d.ptw); if(p) p.loa = d.id; }
    LOGS[d.id] = (LOGS[d.id] || []).concat(e.log || []);
  }
  if(e.op === 'cancel'){
    const hit = find(e.id); if(!hit || hit.r.status === 'Cancelled') return;
    const d = hit.r; d.status = 'Cancelled';
    (d.keys || []).forEach(k => { const r = DATA.keys.find(x => x.id === k); if(r && r.doc === d.id){ r.status = 'In cabinet'; r.doc = ''; r.box = ''; } });
    if(d.box){ const b = DATA.info.find(x => x.id === d.box); if(b && b.doc === d.id){ b.status = 'In cabinet'; b.doc = ''; b.keys = []; b.aplock = ''; b.plocks = []; b.issued = ''; } }
    LOGS[d.id] = (LOGS[d.id] || []).concat([[hhmm(e.at), `${d.id} cancelled by ${e.by}. ${d.keys && d.keys.length ? 'Keys returned to their hooks' : 'Boundaries removed'}${d.box ? `, ${d.box} returned to its bay` : ''}.`]]);
  }
}

/* Dropdown lists. Edit these to suit the site. */
const OPTIONS = {
  ptwWork:['Replace protection relay','Busbar joint inspection and re-torque','Thermographic remedial work','Circuit breaker maintenance','Cable termination','Install additional outgoing way','UPS module replacement','Battery string replacement','Transformer maintenance','Switchgear cleaning and inspection'],
  sftWork:['Insulation resistance test, cable','Primary injection test, ACB','Secondary injection test, protection relay','Continuity test, cable','Contact resistance test, circuit breaker','VLF withstand test, HV cable','Load bank test, UPS'],
  sftTest:['Insulation resistance, 500 V DC','Insulation resistance, 1000 V DC','Primary current injection','Secondary current injection','Continuity','Contact resistance (ductor)','VLF withstand','Load bank'],
  locations:['HV substation A','HV substation B','LV switchroom A','LV switchroom B','UPS room A','UPS room B','Battery room A','Battery room B','Mechanical plant room A','Mechanical plant room B','Data hall 1','Data hall 2'],
  loaReason:['Live equipment next to the work area','Visual inspection, no contact','Survey, non-electrical','Fire detection works','Cleaning, no contact','Escorted visit'],
  loaBounds:['Barrier and signage at the boundary; no entry beyond','Inspection walkway only; panel and rack doors stay shut','Ceiling void access from walkway only','Escorted access only, AP present'],
  duration:[['End of shift (18:00)','eos'],['4 hours',4],['8 hours',8],['12 hours',12],['24 hours',24],['48 hours',48]]
};
const opts = (list, ph) => `<option value="">${ph}</option>` + list.map(o => Array.isArray(o) ? `<option value="${esc(o[1])}">${esc(o[0])}</option>` : `<option value="${esc(o)}">${esc(o)}</option>`).join('');
const cpLabel = c => `${c.name} · ${c.company} · ${c.id}`;
function nextId(prefix){
  const yr = new Date().getFullYear(), set = DATA[docSet(prefix)];
  const max = set.map(d => +String(d.id).split('-')[2] || 0).reduce((a,b) => Math.max(a,b), 0);
  return `${prefix}-${yr}-${String(max + 1).padStart(4,'0')}`;
}
function expiryFrom(v){
  const d = new Date();
  if(v === 'eos'){ d.setHours(18,0,0,0); if(d < new Date()) d.setDate(d.getDate()+1); }
  else d.setHours(d.getHours() + Number(v));
  return stamp(d);
}

function newDoc(){
  const qType = (new URLSearchParams(location.search).get('type') || '').toUpperCase();
  const people = DATA.cp;
  const aps = people.filter(c => ['AP','SAP'].includes(c.role) && c.status === 'Active');
  const cpOptions = people.filter(c => c.role === 'CP').map(c => `<option value="${c.id}"${c.status !== 'Active' ? ' disabled' : ''}>${esc(cpLabel(c))}${c.status !== 'Active' ? ` (${c.status.toLowerCase()})` : ''}</option>`).join('');
  const hero = banner('banner-permits.jpg','New safety document', crumb('NEW DOCUMENT'), false);
  const main = `<section class="page-body"><div class="wrap">
    <div class="service-intro"><span class="eyebrow">ISSUE · PTW · SFT · LOA</span><p style="margin:0;font-size:17px">Choose each item from its list. Only locks on their hooks, free lockout boxes and active CPs can be chosen.</p></div>
    <form class="docform" id="docform" novalidate>
      <div class="fgroup"><h3>1 · Document</h3><div class="fgrid">
        <label class="f"><span>Document type *</span><select id="f-type" required>${opts([['Permit to Work (PTW)','PTW'],['Sanction for Test (SFT)','SFT'],['Limitation of Access (LOA)','LOA']],'Choose a document type')}</select></label>
        <label class="f" data-for="PTW SFT"><span>System *</span><select id="f-sys">${opts([['LV','LV'],['HV','HV']],'Choose HV or LV')}</select></label>
        <label class="f" data-for="PTW"><span>Work *</span><select id="f-work-ptw">${opts(OPTIONS.ptwWork,'Choose the work')}</select></label>
        <label class="f" data-for="SFT"><span>Work *</span><select id="f-work-sft">${opts(OPTIONS.sftWork,'Choose the work')}</select></label>
        <label class="f" data-for="SFT"><span>Test *</span><select id="f-test">${opts(OPTIONS.sftTest,'Choose the test')}</select></label>
        <label class="f" data-for="PTW SFT"><span>Location *</span><select id="f-loc">${opts(OPTIONS.locations,'Choose the location')}</select></label>
        <label class="f" data-for="LOA"><span>Area *</span><select id="f-area">${opts(OPTIONS.locations,'Choose the area')}</select></label>
        <label class="f" data-for="LOA"><span>Reason *</span><select id="f-reason">${opts(OPTIONS.loaReason,'Choose the reason')}</select></label>
        <label class="f" data-for="LOA"><span>Boundaries *</span><select id="f-bounds">${opts(OPTIONS.loaBounds,'Choose the boundaries')}</select></label>
        <label class="f" data-for="LOA"><span>Linked permit</span><select id="f-ptw"></select></label>
      </div></div>
      <div class="fgroup" data-for="PTW SFT"><h3>2 · Isolation</h3><div class="fgrid">
        <div class="f wide"><span>Isolation locks * <small>Choose the system first. Only locks IN CABINET are listed.</small></span>
          <div class="addrow"><select id="f-lock"></select><button type="button" class="btn ghost-dark small" id="addLock">ADD LOCK</button></div>
          <ul class="picked" id="pickedLocks"></ul></div>
        <label class="f"><span>Lockout box *</span><select id="f-box"></select></label>
      </div></div>
      <div class="fgroup"><h3><span data-num></span> · People</h3><div class="fgrid">
        <label class="f"><span>Issuing AP *</span><select id="f-ap">${opts(aps.map(a => [`${a.name} (${a.role}) · ${a.id}`, a.id]),'Choose the issuing AP')}</select></label>
        <label class="f"><span><b data-cp-label>Competent person *</b></span><select id="f-cp"><option value="">Choose the CP</option>${cpOptions}</select></label>
        <div class="f wide" data-for="PTW SFT"><span>Working party <small>Each person's personal lock goes on the box.</small></span>
          <div class="addrow"><select id="f-wp"></select><button type="button" class="btn ghost-dark small" id="addWp">ADD PERSON</button></div>
          <ul class="picked" id="pickedWp"></ul></div>
        <div class="cpcard wide" id="cpPreview" hidden></div>
      </div></div>
      <div class="fgroup"><h3><span data-num2></span> · Time</h3><div class="fgrid">
        <label class="f"><span>Valid for *</span><select id="f-dur">${opts(OPTIONS.duration,'Choose how long')}</select></label>
        <label class="f wide"><span>Notes <small>Optional</small></span><textarea id="f-notes" rows="3" maxlength="500"></textarea></label>
      </div></div>
      <div class="errors" id="errors" role="alert" hidden></div>
      <div class="formfoot">
        <button type="submit" class="btn">ISSUE DOCUMENT</button>
        <a class="btn ghost-dark" href="index.html">CANCEL</a>
      </div>
      <p class="hint">Documents you issue here are saved on this phone or computer only. Other devices will not see them.</p>
    </form>
  </div></section>`;
  shell('new', hero, main);

  const $ = id => document.getElementById(id);
  const locks = [], wp = [];
  const type = () => $('f-type').value;
  function show(){
    const t = type();
    document.querySelectorAll('[data-for]').forEach(el => { el.hidden = !t || !el.dataset.for.split(' ').includes(t); });
    document.querySelector('[data-cp-label]').textContent = t === 'LOA' ? 'LOA holder (CP) *' : 'Competent person *';
    document.querySelector('[data-num]').textContent = t === 'LOA' ? '2' : '3';
    document.querySelector('[data-num2]').textContent = t === 'LOA' ? '3' : '4';
  }
  function fillLocks(){
    const s = $('f-sys').value;
    const free = DATA.keys.filter(k => k.status === 'In cabinet' && (!s || k.sys === s) && !locks.includes(k.id));
    $('f-lock').innerHTML = s ? opts(free.map(k => [`${k.id} · ${k.board} · ${k.point}`, k.id]), free.length ? 'Choose a lock' : 'No free locks for this system') : '<option value="">Choose the system first</option>';
    $('pickedLocks').innerHTML = locks.map(id => { const k = DATA.keys.find(x => x.id === id); return `<li><span class="mono">${id}</span> ${esc(k.board)} · ${esc(k.point)}<button type="button" data-rm-lock="${id}" aria-label="Remove ${id}">×</button></li>`; }).join('');
  }
  function fillBoxes(){ $('f-box').innerHTML = opts(DATA.info.filter(b => b.status === 'In cabinet').map(b => [`${b.id} · Cabinet 3 bay ${b.bay}`, b.id]), 'Choose a free lockout box'); }
  function fillPtw(){ $('f-ptw').innerHTML = opts(DATA.ptw.filter(p => p.status === 'Live').map(p => [`${p.id} · ${p.work}`, p.id]), 'None'); }
  function fillWp(){
    const cp = $('f-cp').value;
    const avail = people.filter(c => c.status === 'Active' && c.role === 'CP' && c.id !== cp && !wp.includes(c.id));
    $('f-wp').innerHTML = opts(avail.map(c => [cpLabel(c), c.id]), 'Choose a person');
    $('pickedWp').innerHTML = wp.map(id => { const c = find(id).r; return `<li><span class="mono">${id}</span> ${esc(c.name)} · ${esc(c.company)}<button type="button" data-rm-wp="${id}" aria-label="Remove ${id}">×</button></li>`; }).join('');
  }
  function cpPreview(){
    const id = $('f-cp').value, box = $('cpPreview');
    if(!id){ box.hidden = true; return; }
    box.innerHTML = cpCard(find(id).r, false); box.hidden = false;
  }
  $('f-type').addEventListener('change', show);
  $('f-sys').addEventListener('change', () => { locks.length = 0; fillLocks(); });
  $('addLock').addEventListener('click', () => { const v = $('f-lock').value; if(v){ locks.push(v); fillLocks(); } });
  $('pickedLocks').addEventListener('click', e => { const b = e.target.closest('[data-rm-lock]'); if(b){ locks.splice(locks.indexOf(b.dataset.rmLock),1); fillLocks(); } });
  $('f-cp').addEventListener('change', () => { const i = wp.indexOf($('f-cp').value); if(i > -1) wp.splice(i,1); fillWp(); cpPreview(); });
  $('addWp').addEventListener('click', () => { const v = $('f-wp').value; if(v){ wp.push(v); fillWp(); } });
  $('pickedWp').addEventListener('click', e => { const b = e.target.closest('[data-rm-wp]'); if(b){ wp.splice(wp.indexOf(b.dataset.rmWp),1); fillWp(); } });
  if(['PTW','SFT','LOA'].includes(qType)) $('f-type').value = qType;
  show(); fillLocks(); fillBoxes(); fillPtw(); fillWp();

  $('docform').addEventListener('submit', e => {
    e.preventDefault();
    const t = type(), err = [];
    const need = (id, msg) => { if(!$(id).value) err.push(msg); };
    need('f-type','Choose a document type.');
    if(t === 'PTW' || t === 'SFT'){
      need('f-sys','Choose the system.');
      need(t === 'PTW' ? 'f-work-ptw' : 'f-work-sft','Choose the work.');
      if(t === 'SFT') need('f-test','Choose the test.');
      need('f-loc','Choose the location.');
      if(!locks.length) err.push('Add at least one isolation lock.');
      need('f-box','Choose a lockout box.');
    }
    if(t === 'LOA'){ need('f-area','Choose the area.'); need('f-reason','Choose the reason.'); need('f-bounds','Choose the boundaries.'); }
    need('f-ap','Choose the issuing AP.');
    need('f-cp', t === 'LOA' ? 'Choose the LOA holder.' : 'Choose the competent person.');
    need('f-dur','Choose how long the document is valid for.');
    const box = $('errors');
    if(err.length){ box.innerHTML = `<b>Before issuing:</b><ul>${err.map(x => `<li>${x}</li>`).join('')}</ul>`; box.hidden = false; box.scrollIntoView({behavior:'smooth', block:'center'}); return; }
    box.hidden = true;
    const ap = find($('f-ap').value).r, cp = find($('f-cp').value).r;
    const now = stamp(), id = nextId(t), notes = $('f-notes').value.trim();
    const base = {id, status:'Live', ap:`${ap.name.split(' ')[0][0]}. ${ap.name.split(' ').slice(1).join(' ')} (${ap.role})`, issued:now, expiry:expiryFrom($('f-dur').value), notes};
    let doc, log;
    if(t === 'LOA'){
      doc = {...base, area:$('f-area').value, reason:$('f-reason').value, bounds:$('f-bounds').value, holder:`${cp.name} · ${cp.id}`, ptw:$('f-ptw').value};
      log = [[hhmm(now), `LOA issued by ${ap.name} to ${cp.name} (${cp.id}). Boundaries set.`]];
    } else {
      const plocks = [cp.id, ...wp];
      doc = {...base, sys:$('f-sys').value, work:$(t === 'PTW' ? 'f-work-ptw' : 'f-work-sft').value, ...(t === 'SFT' ? {test:$('f-test').value} : {}), loc:$('f-loc').value, cp:`${cp.name} · ${cp.id}`, keys:[...locks], box:$('f-box').value, loa:'', apLock:`${ap.id} · ${ap.name}`, plocks};
      log = [[hhmm(now), `Keys ${locks.join(', ')} drawn by ${ap.name}; tags hung on hooks`],[hhmm(now), `Keys placed in ${doc.box}, AP lock ${ap.id} applied, ${t} issued to ${cp.name}`],[hhmm(now), `Personal locks ${plocks.join(', ')} applied to ${doc.box}`]];
    }
    if(!addEvent({op:'create', doc, log})){ box.innerHTML = '<b>Could not save.</b> This browser is blocking storage, for example in a private window. Open the site in a normal window and try again.'; box.hidden = false; return; }
    location.href = recUrl(id) + '&created=1';
  });
}

/* CP contact card, used on documents and in the form preview */
function cpCard(c, withButton = true){
  const tel = String(c.phone).replace(/[^+\d]/g,'');
  return `<div class="cpc-head"><div><div class="cpc-role">${esc(c.role)} · <span class="mono">${esc(c.id)}</span></div><b>${esc(c.name)}</b><span>${esc(c.company)}</span></div>${chip(c.status)}</div>
    <div class="cpc-lines"><a href="tel:${tel}"><span>Phone</span><b class="mono">${esc(c.phone)}</b></a><a href="mailto:${esc(c.email)}"><span>Email</span><b class="mono">${esc(c.email)}</b></a></div>
    ${withButton ? `<a class="btn small" href="${recUrl(c.id)}">OPEN CP DETAILS</a>` : ''}`;
}
function cpPanel(str, label){
  const m = String(str || '').match(/P-\d{3}/), hit = m && find(m[0]);
  if(!hit) return '';
  return `<div class="value-card cpwrap"><h3>${label}</h3><div class="cpcard">${cpCard(hit.r)}</div></div>`;
}
function cancelPanel(r){
  if(r.status !== 'Live') return '';
  return `<div class="value-card"><h3>Cancel this document</h3><p>Use when the CP has signed for cancellation and every personal lock is off the box.</p>
    <button type="button" class="btn ghost-dark small" id="cancelStart" style="margin-top:14px">CANCEL DOCUMENT</button>
    <div id="cancelConfirm" hidden style="margin-top:14px"><p><b>Confirm:</b> all personal locks removed and keys counted?</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px"><button type="button" class="btn small" id="cancelYes">YES, CANCEL ${esc(r.id)}</button><button type="button" class="btn ghost-dark small" id="cancelNo">GO BACK</button></div></div></div>`;
}
function wireRecord(r){
  const start = document.getElementById('cancelStart'); if(!start) return;
  const conf = document.getElementById('cancelConfirm');
  start.addEventListener('click', () => { conf.hidden = false; start.hidden = true; });
  document.getElementById('cancelNo').addEventListener('click', () => { conf.hidden = true; start.hidden = false; });
  document.getElementById('cancelYes').addEventListener('click', () => {
    const by = String(r.ap || 'AP');
    if(addEvent({op:'cancel', id:r.id, at:stamp(), by})) location.reload();
  });
}

/* ---------- Start ---------- */
loadEvents().forEach(applyEvent);
const page = document.body.dataset.page;
if(page==='home') home();
else if(PAGES[page]) tracker(page);
else if(page==='record') record();
else if(page==='procedure') procedure();
else if(page==='schematic') schematic();
else if(page==='new') newDoc();
