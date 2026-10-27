/* Powertec Isolation Control — shared script.
   Every page loads this file. It draws the header, menu and footer,
   then builds the page named in <body data-page="...">.
   Preloaded records are unverified and must not be used as operational evidence. */

/* ---------- Initial records (unverified) ---------- */
const AP = {J:'J. Andersson (AP)', E:'E. Berg (SAP)', R:'R. Holm (AP)'};
const DATA = {
  keys: [],  /* built from LOCKS below: one key per dedicated lock on the drawings */
  info: [
    {id:'LB-05',boxLock:'LB-05',status:'In use',doc:'PTW-2026-0414',keys:['H-048','H-049','H-055'],aplock:'P-002 · E. Berg',plocks:['P-042'],issued:'2026-10-27 06:50',bay:'C3-05'},
    {id:'LB-06',boxLock:'LB-06',status:'In use',doc:'PTW-2026-0412',keys:['L-013','L-014','L-017'],aplock:'P-004 · J. Andersson',plocks:['P-031','P-037'],issued:'2026-10-27 07:10',bay:'C3-06'},
    {id:'LB-07',boxLock:'LB-07',status:'In use',doc:'PTW-2026-0415',keys:['L-019'],aplock:'P-009 · R. Holm',plocks:['P-018','P-026'],issued:'2026-10-27 07:45',bay:'C3-07'},
    {id:'LB-08',boxLock:'LB-08',status:'In use',doc:'SFT-2026-0088',keys:['L-041','L-053'],aplock:'P-004 · J. Andersson',plocks:['P-052'],issued:'2026-10-27 09:20',bay:'C3-08'},
    {id:'LB-03',boxLock:'LB-03',status:'In cabinet',doc:'',keys:[],aplock:'',plocks:[],issued:'',bay:'C3-03'},
    {id:'LB-09',boxLock:'LB-09',status:'In cabinet',doc:'',keys:[],aplock:'',plocks:[],issued:'',bay:'C3-09'},
    {id:'LB-10',boxLock:'LB-10',status:'Out of service',doc:'',keys:[],aplock:'',plocks:[],issued:'',bay:'C3-10'}
  ],
  ptw: [
    {id:'PTW-2026-0416',status:'Pending issue',sys:'HV',work:'Cable termination, TR-2 HV feeder',loc:'HV substation B',ap:AP.E,cp:'Not yet issued',keys:['H-010'],box:'',loa:'',issued:'',expiry:''},
    {id:'PTW-2026-0415',status:'Live',sys:'LV',work:'Busbar joint inspection and re-torque, RPP A2',loc:'Data hall 1',ap:AP.R,cp:'S. Nyberg · P-018',keys:['L-019'],box:'LB-07',loa:'',issued:'2026-10-27 07:45',expiry:'2026-10-27 18:00'},
    {id:'PTW-2026-0414',status:'Live',sys:'HV',work:'Transformer maintenance, T4 22/11 kV',loc:'HV substation B',ap:AP.E,cp:'J. Wikström · P-042',keys:['H-048','H-049','H-055'],box:'LB-05',loa:'',issued:'2026-10-27 06:50',expiry:'2026-10-28 18:00'},
    {id:'PTW-2026-0412',status:'Live',sys:'LV',work:'Replace protection relay, LV Main Distribution B incomers',loc:'LV switchroom B',ap:AP.J,cp:'K. Lindqvist · P-031',keys:['L-013','L-014','L-017'],box:'LB-06',loa:'LOA-2026-0045',issued:'2026-10-27 07:10',expiry:'2026-10-28 18:00'},
    {id:'PTW-2026-0409',status:'Cancelled',sys:'LV',work:'Install additional outgoing way, RPP B2',loc:'Data hall 2',ap:AP.J,cp:'K. Lindqvist · P-031',keys:['L-040'],box:'LB-03',loa:'',issued:'2026-10-24 07:30',expiry:'2026-10-24 17:00'}
  ],
  sft: [
    {id:'SFT-2026-0088',status:'Live',sys:'LV',work:'Insulation resistance test, cable RPP B2 to Row PDU B2',test:'Insulation resistance, 1000 V DC',loc:'Data hall 2',ap:AP.J,cp:'M. Ek · P-052',keys:['L-041','L-053'],box:'LB-08',issued:'2026-10-27 09:20',expiry:'2026-10-27 16:00'},
    {id:'SFT-2026-0086',status:'Cancelled',sys:'LV',work:'Primary injection test, ATS-A1',test:'Primary current injection',loc:'LV switchroom A',ap:AP.E,cp:'T. Sjöberg · P-044',keys:['L-001'],box:'LB-09',issued:'2026-10-21 08:00',expiry:'2026-10-21 15:00'}
  ],
  cp: [
    {id:'P-002',name:'Erik Berg',company:'Powertec Utilities Ltd',role:'SAP',scope:'LV and HV to 22 kV, site lead SAP',phone:'+46 70 000 10 02',email:'e.berg@example.com',id06:'ID06-0000-1002',trained:'2024-09-02',authBy:'Site Authorising Engineer',expiry:'2027-09-01',status:'Active',emergency:'Karin Berg · +46 70 000 20 02'},
    {id:'P-004',name:'Johan Andersson',company:'Powertec Utilities Ltd',role:'AP',scope:'LV and HV to 22 kV',phone:'+46 70 000 10 04',email:'j.andersson@example.com',id06:'ID06-0000-1004',trained:'2025-03-12',authBy:'E. Berg (SAP)',expiry:'2027-03-11',status:'Active',emergency:'Anna Andersson · +46 70 000 20 04'},
    {id:'P-009',name:'Rasmus Holm',company:'Kraftservice AB',role:'AP',scope:'LV',phone:'+46 70 000 10 09',email:'r.holm@example.com',id06:'ID06-0000-1009',trained:'2025-06-02',authBy:'E. Berg (SAP)',expiry:'2027-06-01',status:'Active',emergency:'Lena Holm · +46 70 000 20 09'},
    {id:'P-018',name:'Sara Nyberg',company:'Nordel Electrical AB',role:'CP',scope:'LV mechanical and electrical',phone:'+46 70 000 10 18',email:'s.nyberg@example.com',id06:'ID06-0000-1018',trained:'2026-01-20',authBy:'J. Andersson (AP)',expiry:'2027-01-19',status:'Active',emergency:'Per Nyberg · +46 70 000 20 18'},
    {id:'P-026',name:'Oskar Dahl',company:'Nordel Electrical AB',role:'CP',scope:'LV',phone:'+46 70 000 10 26',email:'o.dahl@example.com',id06:'ID06-0000-1026',trained:'2026-02-04',authBy:'J. Andersson (AP)',expiry:'2027-02-03',status:'Active',emergency:'Maja Dahl · +46 70 000 20 26'},
    {id:'P-031',name:'Karin Lindqvist',company:'Nordel Electrical AB',role:'CP',scope:'LV, UPS and critical distribution',phone:'+46 70 000 10 31',email:'k.lindqvist@example.com',id06:'ID06-0000-1031',trained:'2025-11-10',authBy:'J. Andersson (AP)',expiry:'2026-11-09',status:'Active',emergency:'Erik Lindqvist · +46 70 000 20 31'},
    {id:'P-037',name:'Liam Byrne',company:'Hall Mechanical Ltd',role:'CP',scope:'LV',phone:'+44 7700 900 037',email:'l.byrne@example.com',id06:'ID06-0000-1037',trained:'2026-04-15',authBy:'R. Holm (AP)',expiry:'2027-04-14',status:'Active',emergency:'Niamh Byrne · +44 7700 900 137'},
    {id:'P-042',name:'Jonas Wikström',company:'Nordel Electrical AB',role:'CP',scope:'HV to 22 kV and LV',phone:'+46 70 000 10 42',email:'j.wikstrom@example.com',id06:'ID06-0000-1042',trained:'2026-05-06',authBy:'J. Andersson (AP)',expiry:'2027-05-05',status:'Active',emergency:'Ida Wikström · +46 70 000 20 42'},
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
  'PTW-2026-0414':[['06:30','Switching programme for T4 checked against the hyperscale SLD by E. Berg'],['06:38','Keys H-048, H-049, H-055 drawn; tags hung on hooks C1-48, C1-49, C1-55'],['06:46','T4 isolated on 22 kV and 11 kV, proved dead, earthed, locks applied'],['06:50','Keys in LB-05, AP lock P-002 applied, PTW issued to J. Wikström'],['06:52','Personal lock P-042 applied to LB-05']],
  'PTW-2026-0412':[['07:02','Switching programme checked against the Tier IV SLD by J. Andersson'],['07:05','Keys L-013, L-014, L-017 drawn; tags hung on hooks C2-13, C2-14, C2-17'],['07:08','Locks applied; numbers checked against switch labels'],['07:10','Keys placed in LB-06, AP lock P-004 applied, PTW issued'],['07:14','Personal locks P-031, P-037 applied to LB-06']],
  'PTW-2026-0415':[['07:30','Key L-019 drawn by R. Holm'],['07:40','RPP A2 isolated, proved dead, lock applied'],['07:45','Key in LB-07, PTW issued to S. Nyberg'],['07:48','Personal locks P-018, P-026 applied to LB-07']],
  'PTW-2026-0416':[['10:30','Key H-010 drawn by E. Berg; status With AP'],['10:32','HV switching in progress']],
  'PTW-2026-0409':[['24 Oct 07:30','PTW issued, key L-040 in LB-03'],['24 Oct 16:40','All personal locks removed, PTW cancelled'],['24 Oct 16:52','L-040 returned to hook, LB-03 returned to bay']],
  'SFT-2026-0088':[['09:10','Keys L-041, L-053 drawn by J. Andersson'],['09:20','Keys in LB-08, SFT issued to M. Ek'],['09:22','Personal lock P-052 applied to LB-08']],
  'SFT-2026-0086':[['21 Oct 08:00','SFT issued to T. Sjöberg'],['21 Oct 14:20','Test complete, SFT cancelled, key L-001 returned']],
  'LOA-2026-0045':[['07:15','Barrier placed at bay 4; LOA issued to K. Lindqvist']],
  'LOA-2026-0046':[['10:00','LOA issued to A. Lund']]
};

/* Maintain a minimum stock of 30 individually numbered boxes and matching box locks.
   Existing allocations are preserved; missing numbers are registered as available. */
for (let i=1;i<=30;i++) {
  const id=`LB-${String(i).padStart(2,'0')}`;
  if (!DATA.info.some(b=>b.id===id)) DATA.info.push({id,boxLock:id,status:'In cabinet',doc:'',keys:[],aplock:'',plocks:[],issued:'',bay:`C3-${String(i).padStart(2,'0')}`});
}
DATA.info.sort((a,b)=>a.id.localeCompare(b.id,undefined,{numeric:true}));

/* ---------- Drawings and dedicated locks ----------
   Every lock sits at an x,y point on its drawing (pixels on the drawing image).
   Columns: lock id, number shown in the circle, drawing, system, item of plant, point of isolation, x, y */
const DRAWINGS = {
  tier4:{title:'Tier IV data centre',img:'sld-tier4.jpg',w:1825,h:1290,r:0.0105,view:1750},
  hyper:{title:'Hyperscale 2N architecture',img:'sld-hyperscale.jpg',w:1260,h:1920,r:0.0150,view:1250}
};
const LOCKS = [["H-001", 1, "tier4", "HV", "132 kV incomers", "Utility B line disconnector", 1102, 130], ["H-002", 2, "tier4", "HV", "132 kV incomers", "Utility A cable disconnector", 409, 193], ["H-003", 3, "tier4", "HV", "132 kV incomers", "Utility B cable disconnector", 1102, 201], ["H-004", 4, "tier4", "HV", "132 kV incomers", "Incomer A disconnector", 369, 282], ["H-005", 5, "tier4", "HV", "132 kV incomers", "Incomer B disconnector", 1143, 282], ["H-006", 6, "tier4", "HV", "132 kV incomers", "Incomer A circuit breaker", 369, 326], ["H-007", 7, "tier4", "HV", "132 kV incomers", "Incomer B circuit breaker", 1143, 326], ["H-008", 8, "tier4", "HV", "132 kV busbar and transformer feeders", "132 kV bus coupler", 752, 347], ["H-009", 9, "tier4", "HV", "132 kV busbar and transformer feeders", "TR-1 feeder disconnector", 449, 380], ["H-010", 10, "tier4", "HV", "132 kV busbar and transformer feeders", "TR-2 feeder disconnector", 597, 380], ["H-011", 11, "tier4", "HV", "132 kV busbar and transformer feeders", "TR-3 feeder disconnector", 893, 380], ["H-012", 12, "tier4", "HV", "132 kV busbar and transformer feeders", "TR-4 feeder disconnector", 1039, 380], ["H-013", 13, "tier4", "HV", "11 kV section tie", "Section tie isolator, A side", 668, 585], ["H-014", 14, "tier4", "HV", "11 kV section tie", "Section tie circuit breaker", 711, 588], ["H-015", 15, "tier4", "HV", "11 kV section tie", "Section tie isolator, B side", 759, 585], ["H-016", 16, "tier4", "HV", "11 kV Switchboard A", "Outgoing way 1 to ATS-A1", 350, 614], ["H-017", 17, "tier4", "HV", "11 kV Switchboard A", "Outgoing way 2 to ATS-A2", 412, 614], ["H-018", 18, "tier4", "HV", "11 kV Switchboard A", "Outgoing way 3 to ATS-A3", 476, 614], ["H-019", 19, "tier4", "HV", "11 kV Switchboard A", "Outgoing way 4 to ATS-A4", 540, 614], ["H-020", 20, "tier4", "HV", "11 kV Switchboard A", "Outgoing way 5 to ATS-A5", 602, 614], ["H-021", 21, "tier4", "HV", "11 kV Switchboard B", "Outgoing way 1 to ATS-B1", 820, 614], ["H-022", 22, "tier4", "HV", "11 kV Switchboard B", "Outgoing way 2 to ATS-B2", 883, 614], ["H-023", 23, "tier4", "HV", "11 kV Switchboard B", "Outgoing way 3 to ATS-B3", 947, 614], ["H-024", 24, "tier4", "HV", "11 kV Switchboard B", "Outgoing way 4 to ATS-B4", 1011, 614], ["H-025", 25, "tier4", "HV", "11 kV Switchboard B", "Outgoing way 5 to ATS-B5", 1069, 614], ["L-001", 1, "tier4", "LV", "ATS bank A", "ATS-A1", 364, 664], ["L-002", 2, "tier4", "LV", "ATS bank A", "ATS-A2", 426, 664], ["L-003", 3, "tier4", "LV", "ATS bank A", "ATS-A3", 490, 664], ["L-004", 4, "tier4", "LV", "ATS bank A", "ATS-A4", 554, 664], ["L-005", 5, "tier4", "LV", "ATS bank A", "ATS-A5", 616, 664], ["L-006", 6, "tier4", "LV", "ATS bank B", "ATS-B1", 834, 664], ["L-007", 7, "tier4", "LV", "ATS bank B", "ATS-B2", 897, 664], ["L-008", 8, "tier4", "LV", "ATS bank B", "ATS-B3", 961, 664], ["L-009", 9, "tier4", "LV", "ATS bank B", "ATS-B4", 1025, 664], ["L-010", 10, "tier4", "LV", "ATS bank B", "ATS-B5", 1083, 664], ["L-011", 11, "tier4", "LV", "LV Main Distribution A", "Incomer 1", 452, 738], ["L-012", 12, "tier4", "LV", "LV Main Distribution A", "Incomer 2", 506, 738], ["L-013", 13, "tier4", "LV", "LV Main Distribution B", "Incomer 1", 914, 738], ["L-014", 14, "tier4", "LV", "LV Main Distribution B", "Incomer 2", 967, 738], ["L-015", 15, "tier4", "LV", "LV tie breaker", "Tie isolator, A side", 663, 818], ["L-016", 16, "tier4", "LV", "LV tie breaker", "Tie breaker", 700, 822], ["L-017", 17, "tier4", "LV", "LV tie breaker", "Tie isolator, B side", 754, 818], ["L-018", 18, "tier4", "LV", "LV Main Distribution A", "Outgoing to RPP A1", 358, 844], ["L-019", 19, "tier4", "LV", "LV Main Distribution A", "Outgoing to RPP A2", 453, 844], ["L-020", 20, "tier4", "LV", "LV Main Distribution A", "Outgoing to RPP A3", 543, 844], ["L-021", 21, "tier4", "LV", "LV Main Distribution A", "Outgoing to RPP A4", 627, 844], ["L-022", 22, "tier4", "LV", "LV Main Distribution B", "Outgoing to RPP B1", 824, 844], ["L-023", 23, "tier4", "LV", "LV Main Distribution B", "Outgoing to RPP B2", 927, 844], ["L-024", 24, "tier4", "LV", "LV Main Distribution B", "Outgoing to RPP B3", 1002, 844], ["L-025", 25, "tier4", "LV", "LV Main Distribution B", "Outgoing to RPP B4", 1065, 844], ["L-026", 26, "tier4", "LV", "RPPs, A side", "RPP A1 way 1", 321, 928], ["L-027", 27, "tier4", "LV", "RPPs, A side", "RPP A1 way 2", 348, 928], ["L-028", 28, "tier4", "LV", "RPPs, A side", "RPP A1 way 3", 378, 928], ["L-029", 29, "tier4", "LV", "RPPs, A side", "RPP A2 way 1", 425, 928], ["L-030", 30, "tier4", "LV", "RPPs, A side", "RPP A2 way 2", 453, 928], ["L-031", 31, "tier4", "LV", "RPPs, A side", "RPP A2 way 3", 482, 928], ["L-032", 32, "tier4", "LV", "RPPs, A side", "RPP A3 way 1", 523, 928], ["L-033", 33, "tier4", "LV", "RPPs, A side", "RPP A3 way 2", 552, 928], ["L-034", 34, "tier4", "LV", "RPPs, A side", "RPP A4 way 1", 609, 928], ["L-035", 35, "tier4", "LV", "RPPs, A side", "RPP A4 way 2", 635, 928], ["L-036", 36, "tier4", "LV", "RPPs, A side", "RPP A4 way 3", 665, 928], ["L-037", 37, "tier4", "LV", "RPPs, B side", "RPP B1 way 1", 791, 928], ["L-038", 38, "tier4", "LV", "RPPs, B side", "RPP B1 way 2", 820, 928], ["L-039", 39, "tier4", "LV", "RPPs, B side", "RPP B1 way 3", 849, 928], ["L-040", 40, "tier4", "LV", "RPPs, B side", "RPP B2 way 1", 902, 928], ["L-041", 41, "tier4", "LV", "RPPs, B side", "RPP B2 way 2", 929, 928], ["L-042", 42, "tier4", "LV", "RPPs, B side", "RPP B2 way 3", 958, 928], ["L-043", 43, "tier4", "LV", "RPPs, B side", "RPP B3 way 1", 989, 928], ["L-044", 44, "tier4", "LV", "RPPs, B side", "RPP B3 way 2", 1015, 928], ["L-045", 45, "tier4", "LV", "RPPs, B side", "RPP B4 way 1", 1059, 928], ["L-046", 46, "tier4", "LV", "RPPs, B side", "RPP B4 way 2", 1088, 928], ["L-047", 47, "tier4", "LV", "RPPs, B side", "RPP B4 way 3", 1117, 928], ["L-048", 48, "tier4", "LV", "Row PDUs, A side", "Row PDU A1 feed to IT load", 342, 1011], ["L-049", 49, "tier4", "LV", "Row PDUs, A side", "Row PDU A2 feed to IT load", 436, 1011], ["L-050", 50, "tier4", "LV", "Row PDUs, A side", "Row PDU A3 feed to IT load", 524, 1011], ["L-051", 51, "tier4", "LV", "Row PDUs, A side", "Row PDU A4 feed to IT load", 635, 1011], ["L-052", 52, "tier4", "LV", "Row PDUs, B side", "Row PDU B1 feed to IT load", 818, 1011], ["L-053", 53, "tier4", "LV", "Row PDUs, B side", "Row PDU B2 feed to IT load", 902, 1011], ["L-054", 54, "tier4", "LV", "Row PDUs, B side", "Row PDU B3 feed to IT load", 975, 1011], ["L-055", 55, "tier4", "LV", "Row PDUs, B side", "Row PDU B4 feed to IT load", 1080, 1011], ["H-026", 26, "hyper", "HV", "400 kV GIS, source A", "Circuit breaker, T1 feeder", 227, 170], ["H-027", 27, "hyper", "HV", "400 kV GIS, source A", "Disconnector, T1 feeder", 227, 214], ["H-028", 28, "hyper", "HV", "400 kV GIS, source A", "Circuit breaker, coupler side", 351, 170], ["H-029", 29, "hyper", "HV", "400 kV GIS, source A", "Disconnector, coupler side", 351, 214], ["H-030", 30, "hyper", "HV", "400 kV GIS, source A", "Earth switch, coupler side", 351, 251], ["H-031", 31, "hyper", "HV", "400 kV bus coupler", "Coupler disconnector, A side", 431, 216], ["H-032", 32, "hyper", "HV", "400 kV bus coupler", "Bus coupler circuit breaker", 537, 251], ["H-033", 33, "hyper", "HV", "400 kV bus coupler", "Coupler disconnector, B side", 614, 216], ["H-034", 34, "hyper", "HV", "400 kV GIS, source B", "Earth switch, coupler side", 690, 251], ["H-035", 35, "hyper", "HV", "400 kV GIS, source B", "Disconnector, coupler side", 690, 214], ["H-036", 36, "hyper", "HV", "400 kV GIS, source B", "Circuit breaker, coupler side", 690, 170], ["H-037", 37, "hyper", "HV", "400 kV GIS, source B", "Disconnector, T2 feeder", 812, 214], ["H-038", 38, "hyper", "HV", "400 kV GIS, source B", "Circuit breaker, T2 feeder", 812, 170], ["H-039", 39, "hyper", "HV", "22 kV MV incomers", "MV incomer A circuit breaker", 244, 439], ["H-040", 40, "hyper", "HV", "22 kV MV incomers", "MV incomer B circuit breaker", 798, 439], ["H-041", 41, "hyper", "HV", "22 kV capacitor banks", "Capacitor bank A switch", 190, 492], ["H-042", 42, "hyper", "HV", "22 kV ring bus coupler", "Ring coupler disconnector, A side", 449, 446], ["H-043", 43, "hyper", "HV", "22 kV ring bus coupler", "Ring bus coupler circuit breaker", 492, 479], ["H-044", 44, "hyper", "HV", "22 kV ring bus coupler", "Ring coupler disconnector, B side", 599, 446], ["H-045", 45, "hyper", "HV", "22 kV capacitor banks", "Capacitor bank B switch", 850, 492], ["H-046", 46, "hyper", "HV", "22 kV transformer feeders, T3 to T6", "T3 feeder circuit breaker", 303, 485], ["H-047", 47, "hyper", "HV", "22 kV transformer feeders, T3 to T6", "T3 feeder disconnector", 303, 521], ["H-048", 48, "hyper", "HV", "22 kV transformer feeders, T3 to T6", "T4 feeder circuit breaker", 430, 485], ["H-049", 49, "hyper", "HV", "22 kV transformer feeders, T3 to T6", "T4 feeder disconnector", 430, 521], ["H-050", 50, "hyper", "HV", "22 kV transformer feeders, T3 to T6", "T5 feeder circuit breaker", 651, 485], ["H-051", 51, "hyper", "HV", "22 kV transformer feeders, T3 to T6", "T5 feeder disconnector", 651, 521], ["H-052", 52, "hyper", "HV", "22 kV transformer feeders, T3 to T6", "T6 feeder circuit breaker", 770, 485], ["H-053", 53, "hyper", "HV", "22 kV transformer feeders, T3 to T6", "T6 feeder disconnector", 770, 521], ["H-054", 54, "hyper", "HV", "11 kV genset incomers", "T3 genset incomer", 306, 736], ["H-055", 55, "hyper", "HV", "11 kV genset incomers", "T4 genset incomer", 433, 736], ["H-056", 56, "hyper", "HV", "11 kV genset incomers", "T5 genset incomer", 650, 736], ["H-057", 57, "hyper", "HV", "11 kV genset incomers", "T6 genset incomer", 770, 736], ["L-056", 56, "hyper", "LV", "400 V LV SWBD A", "Incomer 1", 287, 960], ["L-057", 57, "hyper", "LV", "400 V LV SWBD A", "Incomer 2", 345, 960], ["L-058", 58, "hyper", "LV", "400 V LV SWBD B", "Incomer 1", 652, 960], ["L-059", 59, "hyper", "LV", "400 V LV SWBD B", "Incomer 2", 710, 960], ["L-060", 60, "hyper", "LV", "400 V LV SWBD B", "Incomer 3", 917, 960], ["L-061", 61, "hyper", "LV", "400 V bus tie", "Bus tie isolator, A side", 419, 977], ["L-062", 62, "hyper", "LV", "400 V bus tie", "Bus tie circuit breaker", 541, 1019], ["L-063", 63, "hyper", "LV", "400 V bus tie", "Bus tie isolator, B side", 596, 977], ["L-064", 64, "hyper", "LV", "400 V LV SWBD A", "Outgoing CB 1, UPS A feed", 95, 1025], ["L-065", 65, "hyper", "LV", "400 V LV SWBD A", "Outgoing CB 2, UPS A feed", 147, 1025], ["L-066", 66, "hyper", "LV", "400 V LV SWBD A", "Outgoing CB 3, UPS A feed", 205, 1025], ["L-067", 67, "hyper", "LV", "400 V LV SWBD A", "Outgoing CB 4, UPS A feed", 262, 1025], ["L-068", 68, "hyper", "LV", "400 V LV SWBD A", "Outgoing CB 5, UPS A feed", 319, 1025], ["L-069", 69, "hyper", "LV", "400 V LV SWBD A", "Outgoing CB 6, UPS A feed", 378, 1025], ["L-070", 70, "hyper", "LV", "400 V LV SWBD B", "Outgoing CB 1, UPS B feed", 617, 1025], ["L-071", 71, "hyper", "LV", "400 V LV SWBD B", "Outgoing CB 2, UPS B feed", 681, 1025], ["L-072", 72, "hyper", "LV", "400 V LV SWBD B", "Outgoing CB 3, UPS B feed", 742, 1025], ["L-073", 73, "hyper", "LV", "400 V LV SWBD B", "Outgoing CB 4, UPS B feed", 802, 1025], ["L-074", 74, "hyper", "LV", "400 V LV SWBD B", "Outgoing CB 5, UPS B feed", 860, 1025], ["L-075", 75, "hyper", "LV", "400 V LV SWBD B", "Outgoing CB 6, UPS B feed", 919, 1025], ["L-076", 76, "hyper", "LV", "UPS maintenance bypass", "Maintenance bypass isolator, A side", 481, 1135], ["L-077", 77, "hyper", "LV", "UPS maintenance bypass", "Maintenance bypass isolator, B side", 558, 1135], ["L-078", 78, "hyper", "LV", "Static transfer switches", "STS A", 131, 1308], ["L-079", 79, "hyper", "LV", "Static transfer switches", "STS A to B automatic bypass, A side", 418, 1327], ["L-080", 80, "hyper", "LV", "Static transfer switches", "STS A to B automatic bypass, B side", 614, 1327], ["L-081", 81, "hyper", "LV", "Static transfer switches", "STS B", 850, 1308]];
const OUT_OF_SERVICE = {'L-047':'Hasp damaged, replacement ordered'};
DATA.keys = LOCKS.map(([id,n,dw,sys,plant,label,x,y]) => ({id,n,dw,sys,board:plant,point:label,x,y,hook:`${sys==='HV'?'C1':'C2'}-${String(n).padStart(2,'0')}`,status:OUT_OF_SERVICE[id]?'Out of service':'In cabinet',doc:'',box:'',sld:DRAWINGS[dw].title,fitted:'2026-09-15',cond:OUT_OF_SERVICE[id]||'Good'}));
const PLANTS = (() => { const m = new Map(); DATA.keys.forEach(k => { const key = `${k.dw}|${k.board}`; if(!m.has(key)) m.set(key,{key,dw:k.dw,sys:k.sys,name:k.board,ids:[]}); m.get(key).ids.push(k.id); }); return [...m.values()]; })();
/* Key status always follows the safety documents: Live → in lockout box, Pending issue → with AP */
function syncKeys(){
  DATA.keys.forEach(k => { if(k.status !== 'Out of service'){ k.status = 'In cabinet'; k.doc = ''; k.box = ''; } });
  [...DATA.ptw, ...DATA.sft].forEach(d => {
    if(d.status !== 'Live' && d.status !== 'Pending issue') return;
    (d.keys || []).forEach(id => { const k = DATA.keys.find(x => x.id === id); if(!k || k.status === 'Out of service') return; k.doc = d.id; k.box = d.box || ''; k.status = d.status === 'Live' ? 'In lockout box' : 'With AP'; });
  });
}
/* One drawing with a tappable circle on every lock.
   opts.picked: Set of lock ids chosen in the form · opts.focus: plant key to highlight · opts.sys: only this system tappable */
function drawingHTML(dw, opts = {}){
  const D = DRAWINGS[dw];
  const circles = DATA.keys.filter(k => k.dw === dw).map(k => {
    const inUse = k.doc && k.status !== 'In cabinet', oos = k.status === 'Out of service';
    const picked = opts.picked && opts.picked.has(k.id);
    const focus = opts.focus && `${k.dw}|${k.board}` === opts.focus;
    const off = opts.sys && !opts.sys.includes(k.sys);
    const cls = ['lk', k.sys === 'HV' ? 'hv' : 'lv', inUse ? 'used' : '', oos ? 'oos' : '', picked ? 'picked' : '', focus ? 'focus' : '', off ? 'off' : '', opts.highlight === k.id ? 'hl' : ''].join(' ');
    const title = `${k.id} · ${k.board} · ${k.point}${inUse ? ` · in use on ${k.doc}` : oos ? ' · out of service' : ''}`;
    return `<button type="button" class="${cls}" data-lock="${k.id}" style="left:${(k.x / D.w * 100).toFixed(3)}%;top:${(k.y / D.h * 100).toFixed(3)}%" title="${esc(title)}" aria-label="${esc(title)}">${k.n}</button>`;
  }).join('');
  return `<div class="dwgscroll"><div class="dwgbox" data-dw="${dw}" style="--dw:${D.view}px;--r:${D.r};aspect-ratio:${D.w}/${D.h}"><img src="${D.img}" alt="${esc(D.title)} single line diagram" draggable="false">${circles}</div></div>`;
}
function scrollToLocks(scroller, box, ids){
  const pts = DATA.keys.filter(k => ids.includes(k.id)); if(!pts.length) return;
  const D = DRAWINGS[pts[0].dw];
  const cx = pts.reduce((a,k) => a + k.x, 0) / pts.length / D.w * box.offsetWidth;
  const cy = pts.reduce((a,k) => a + k.y, 0) / pts.length / D.h * box.offsetHeight;
  scroller.scrollLeft = Math.max(0, cx - scroller.clientWidth / 2);
  const top = box.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
  scroller.scrollTop = Math.max(0, top + cy - scroller.clientHeight / 2);
}

/* ---------- Page definitions ---------- */
/* ROOT is set on each page's <body data-root="...">: '' at the top level, '../' inside a folder. */
const ROOT = document.body.dataset.root || '';
const LOGO = 'logo.png', MARK = 'mark.png';
const PAGES = {
  keys:{file:'keys.html',title:'Key tracker',code:'H · L',blurb:'Every dedicated HV and LV safety lock, its numbered hook, and where its key is right now.',
    cols:[['id','Lock no.'],['sys','System'],['board','Plant'],['point','Point of isolation'],['status','Status'],['where','Key location']]},
  info:{file:'info.html',title:'Information tracker',code:'LB',blurb:'Each lockout box, the safety document it serves, and the keys and personal locks on it.',
    cols:[['id','Box / matching lock'],['status','Status'],['doc','Safety document'],['keysN','Keys inside'],['plocksN','Personal locks'],['issued','Issued']]},
  ptw:{file:'ptw.html',title:'Permit to work tracker',code:'PTW',blurb:'Live, pending and cancelled permits, with their isolations and lockout boxes.',
    cols:[['id','Permit no.'],['status','Status'],['work','Work'],['loc','Location'],['cp','Competent person'],['box','Box']]},
  sft:{file:'sft.html',title:'Sanction for test tracker',code:'SFT',blurb:'Sanctions for test, the test being carried out, and the isolation that secures it.',
    cols:[['id','Sanction no.'],['status','Status'],['work','Work'],['test','Test'],['cp','Competent person'],['box','Box']]},
  loa:{file:'loa.html',title:'Limitation of access tracker',code:'LOA',blurb:'Areas with restricted access, who holds the limitation, and its boundaries.',
    cols:[['id','LOA no.'],['status','Status'],['area','Area'],['reason','Reason'],['holder','Holder'],['expiry','Expires']]},
  cp:{file:'cp.html',title:'CP register',code:'P',blurb:'Every competent person on site, their personal lock, company, contact details and authorisation.',
    cols:[['id','Lock no.'],['name','Name'],['company','Company'],['role','Role'],['phone','Phone'],['status','Status'],['expiry','Authorised until']]}
};
const NAV = [['references.html','System references','REF','references'],['index.html','Home','HOME','home'],['expired.html','Expired documents','ALERT','expired'],['keys.html','Key tracker','H · L','keys'],['info.html','Information tracker','LB','info'],['ptw.html','Permit to work tracker','PTW','ptw'],['sft.html','Sanction for test tracker','SFT','sft'],['loa.html','Limitation of access tracker','LOA','loa'],['cp.html','CP register','P','cp'],['new.html','New safety document','NEW','new'],['lv-schematic.html','Schematics','SLD','schematic'],['procedure.html','System procedure','STEPS','procedure']];
const U = path => ROOT + path;

/* Expiry is derived from the document's absolute local expiry timestamp, not its issue duration.
   Cancelled and pending documents never appear. The browser clock is authoritative only for
   this demonstration; a production deployment requires server time and shared notifications. */
function expiryMillis(value){
  const m = String(value || '').trim().match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/);
  if(!m) return NaN;
  const [,y,mo,d,h,mi,sec] = m;
  const dt = new Date(+y,+mo-1,+d,+h,+mi,+(sec||0));
  if(dt.getFullYear()!==+y || dt.getMonth()!==+mo-1 || dt.getDate()!==+d || dt.getHours()!==+h || dt.getMinutes()!==+mi) return NaN;
  return dt.getTime();
}
function expiredDocuments(now=Date.now()){
  return ['ptw','sft','loa'].flatMap(set => DATA[set].filter(d => (!DEMO_EXPIRED || d.demo === true) && d.status === 'Live' && Number.isFinite(expiryMillis(d.expiry)) && expiryMillis(d.expiry) <= now).map(d=>({set,doc:d})))
    .sort((a,b)=>expiryMillis(a.doc.expiry)-expiryMillis(b.doc.expiry));
}
function recipientRecord(doc){
  const source = doc.cp || doc.holder || '';
  const m = String(source).match(/P-\d{3}/i);
  return m ? DATA.cp.find(p=>p.id.toUpperCase()===m[0].toUpperCase()) : null;
}
function expiryAlertMarkup(){
  const count = expiredDocuments().length;
  return `<a class="expiry-alert${count ? ' has-expired' : ''}" href="${U('expired.html')}${DEMO_EXPIRED ? '?demo=expired' : '?mode=live'}" id="expiryAlert" aria-live="polite" aria-label="${count} expired live safety documents. Open expired document list.">
    <span class="expiry-alert-title">Expired documents</span>${DEMO_EXPIRED ? `<span class="demo-alert-label">INTERACTIVE PREVIEW · 3 FICTIONAL RECORDS</span>` : ``}<span class="expiry-alert-count" id="expiryAlertCount">${count}</span>
    <span class="expiry-alert-sub" id="expiryAlertSub">${count ? 'Action required — contact the document recipient' : 'No overdue live documents recorded'}</span><span class="expiry-alert-arrow">View register →</span>
  </a>`;
}
function refreshExpiryAlert(){
  const el=document.getElementById('expiryAlert'); if(!el) return;
  const count=expiredDocuments().length;
  el.classList.toggle('has-expired',count>0);
  document.getElementById('expiryAlertCount').textContent=String(count);
  document.getElementById('expiryAlertSub').textContent=count ? 'Action required — contact the document recipient' : 'No overdue live documents recorded';
  el.setAttribute('aria-label',`${count} expired live safety documents. Open expired document list.`);
}
function expiredPage(){
  const hero=pageHero(`<a href="${U('index.html')}">Home</a><span>/</span><span>Expired documents</span>`, 'Safety document monitoring', 'Expired documents', 'Live PTW, SFT and LOA records that have exceeded their recorded expiry date and time. Contact the recipient and follow the applicable site safety rules.');
  const main=`<section class="block"><div class="wrap">
    ${DEMO_EXPIRED ? `<div class="demo-notice">INTERACTIVE PREVIEW — Select any document number to open its detailed record. All three entries are fictional. <a href="${U('index.html')}?mode=live">Switch to recorded documents →</a></div>` : ``}
    <div class="expiry-notice"><strong>Overdue does not mean cancelled.</strong> A document remains live in the tracker until formally cancelled. Expiry does not release an isolation or authorise the removal of locks.</div>
    <div class="expiry-register-head"><h2>Overdue live documents <span id="expiryTableCount"></span></h2><span id="expiryLastChecked"></span></div>
    <div class="tablebox expiry-table-wrap"><table class="expiry-table"><thead><tr><th>Document number</th><th>Date issued</th><th>Date expired and time</th><th>Recipient name</th><th>Recipient contact no.</th></tr></thead><tbody id="expiredRows"></tbody></table></div>
    <p class="expiry-help">Select a document number to open its full document record. Select a telephone number to call the recipient on a supported device.</p>
  </div></section>`;
  shell('expired',hero,main); updateExpiredRows();
  window.setInterval(updateExpiredRows,15000);
}
function updateExpiredRows(){
  const tbody=document.getElementById('expiredRows'); if(!tbody) return;
  const rows=expiredDocuments();
  document.getElementById('expiryTableCount').textContent=`(${rows.length})`;
  document.getElementById('expiryLastChecked').textContent=`Checked ${new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'})}`;
  tbody.innerHTML=rows.length ? rows.map(({doc})=>{
    const person=recipientRecord(doc);
    const recipient=person?.name || String(doc.cp || doc.holder || 'Not recorded').replace(/\s*·\s*P-\d{3}.*/, '');
    const tel=person?.phone || doc.recipientPhone || '';
    const safeTel=String(tel).replace(/[^+\d]/g,'');
    return `<tr><td data-label="Document number"><a class="expiry-doc-link mono" href="${recUrl(doc.id)}${DEMO_EXPIRED ? `&demo=expired` : ``}">${esc(doc.id)} ↗</a></td>
      <td data-label="Date issued" class="mono">${esc(doc.issued || 'Not recorded')}</td>
      <td data-label="Date expired and time" class="mono expiry-date">${esc(doc.expiry)}</td>
      <td data-label="Recipient name">${esc(recipient)}</td>
      <td data-label="Recipient contact no.">${tel ? `<a href="tel:${safeTel}">${esc(tel)}</a>` : '<span class="missing-contact">Not recorded — check personnel register</span>'}</td></tr>`;
  }).join('') : `<tr><td colspan="5" class="expiry-empty">No expired live documents at this time.</td></tr>`;
}


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
const ICON_FOR = {keys:I.key, info:I.box, ptw:I.ptw, sft:I.sft, loa:I.loa, cp:I.people.replace('viewBox="0 0 56 56"','viewBox="0 0 56 56" width="64" height="64"')};

/* ---------- Helpers ---------- */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SETS = Object.keys(DATA);
function find(id){ id = String(id||'').toUpperCase(); for(const s of SETS){ const r = DATA[s].find(x => x.id.toUpperCase() === id); if(r) return {set:s, r}; } return null; }
const recUrl = id => U(`record.html?id=${encodeURIComponent(id)}`);
const link = id => !id ? '' : find(id) ? `<a href="${recUrl(id)}">${esc(id)}</a>` : `<span>${esc(id)}</span>`;
const person = s => { const m = String(s||'').match(/P-\d{3}/); return m && find(m[0]) ? esc(s).replace(m[0], `<a href="${recUrl(m[0])}" class="plink">${m[0]}</a>`) : esc(s); };
const linkList = ids => ids && ids.length ? `<div class="links">${ids.map(link).join('')}</div>` : '<p>None</p>';
function chipClass(s){
  if(s==='In cabinet' || s==='Active') return 's-good';
  if(s==='Expired') return 's-crit';
  if(s==='Suspended') return 's-warn';
  if(s==='Cancelled') return 's-idle';
  if(['Live','In use','In lockout box'].includes(s)) return 's-hot';
  if(['With AP','Pending issue'].includes(s)) return 's-warn';
  if(s==='Out of service') return 's-crit';
  return 's-idle';
}
const chip = s => `<span class="chip ${chipClass(s)}">${esc(s)}</span>`;
const sys = s => String(s || '').split(/\s*&\s*/).filter(Boolean).map(x => `<span class="sys ${x.toLowerCase()}">${x}</span>`).join(' ');

/* ---------- Header, menu, footer ---------- */
function shell(page, heroHtml, mainHtml){
  const nav = NAV.map(([href,label,code,key]) => `<a href="${U(href)}"${key===page?' aria-current="page"':''}>${label}<small>${code}</small></a>`).join('');
  document.body.innerHTML = `
  <header class="site-head"><div class="wrap">
    <a href="${U('index.html')}" aria-label="Powertec Isolation Control home"><span class="brand"><img class="brand-logo" src="logo-stack.png" alt="Powertec"><span class="brand-name">ISOLATION CONTROL</span></span></a>
    <button class="menu-btn" id="openMenu" aria-label="Open menu" aria-expanded="false" aria-controls="menu">${I.burger}</button>
  </div></header>
  <div class="menu" id="menu" hidden role="dialog" aria-label="Menu">
    <div class="top"><span class="brand"><img class="brand-logo" src="logo-stack.png" alt="Powertec"><span class="brand-name">ISOLATION CONTROL</span></span><button class="menu-btn" id="closeMenu" aria-label="Close menu">${I.close}</button></div>
    <nav>${nav}</nav>
    <p class="note">Powertec Isolation Control · AP office key, lock and safety document control</p>
  </div>
  ${heroHtml}
  <main><div class="wrap universal-back"><button type="button" class="back-nav" id="pageBack" aria-label="Go back to previous page">← Back</button></div>${mainHtml}</main>
  <footer class="site-foot"><div class="wrap">
    <a class="foot-brand" href="${U('index.html')}"><img src="${MARK}" alt=""><span><b>powertec</b><small>isolation control</small></span></a>
    <div class="foot-links">
      <div class="foot-col"><h3>Registers</h3><a href="${U('keys.html')}">Key control</a><a href="${U('info.html')}">Information tracker</a><a href="${U('cp.html')}">Personnel locks</a></div>
      <div class="foot-col"><h3>Safety documents</h3><a href="${U('ptw.html')}">Permit to Work</a><a href="${U('sft.html')}">Sanction for Test</a><a href="${U('loa.html')}">Limitation of Access</a></div>
      <div class="foot-col"><h3>Resources</h3><a href="${U('lv-schematic.html')}">Schematics</a><a href="${U('references.html')}">System references</a><a href="${U('procedure.html')}">Procedure</a></div>
    </div>
    <p class="foot-legal">© ${new Date().getFullYear()} Powertec Utilities Ltd. Registered in England &amp; Wales, company no. 08117942. Version 6 · Records require site verification before operational use.</p>
  </div></footer>`;
  const back = document.getElementById('pageBack');
  if(back) back.addEventListener('click', () => {
    let sameSite = false;
    try { sameSite = Boolean(document.referrer && new URL(document.referrer).origin === location.origin && new URL(document.referrer).pathname !== location.pathname); } catch(_){}
    if(sameSite && history.length > 1) history.back();
    else location.href = U((PAGES[page] && PAGES[page].file) || 'index.html');
  });
  const menu = document.getElementById('menu'), open = document.getElementById('openMenu');
  const close = () => { menu.hidden = true; open.setAttribute('aria-expanded','false'); document.body.style.overflow=''; open.focus(); };
  open.addEventListener('click', () => { menu.hidden = false; open.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; document.getElementById('closeMenu').focus(); });
  document.getElementById('closeMenu').addEventListener('click', close);
  document.addEventListener('keydown', e => { if(e.key==='Escape' && !menu.hidden) close(); });
}
const pageHero = (crumbs, eyebrow, title, lead, extra='') => `
  <section class="hero"><div class="wrap">
    <nav class="crumbs">${crumbs}</nav>
    <div class="kicker orange">${eyebrow}</div>
    <h1>${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${extra}
  </div></section>`;

/* ---------- Home ---------- */
function home(){
  const n = (set, st) => DATA[set].filter(r => r.status===st && !r.demo).length;
  const card = key => { const p = PAGES[key]; return `<a class="card" href="${U(p.file)}"><div class="ico">${ICON_FOR[key]}</div><div><h3>${p.title}</h3><p>${p.blurb}</p><div class="n">${DATA[key].length} records · ${p.code}</div><span class="more">Open tracker ${I.arrow}</span></div></a>`; };
  const hero = `
  <section class="hero home"><div class="wrap">
    <div class="kicker">AP OFFICE KEY &amp; SAFETY DOCUMENT CONTROL</div>
    <h1 class="mega">One lock on every switch. Every key accounted for.</h1>
    <p class="sub">A structured lock and key system for data centre AP offices: a dedicated numbered lock on every point of isolation, and a register that shows where every key is.</p>
    <p class="lead">When a key leaves its hook, a tag takes its place. Every permit, sanction and limitation of access shows exactly which locks, which lockout box and which competent person it relies on.</p>
    <div class="home-expiry-position">${expiryAlertMarkup()}</div>
    <div class="textlinks">
      <a href="${U('keys.html')}">Open key tracker <span>→</span></a>
      <a href="${U('new.html')}">New safety document <span>→</span></a>
    </div>
  </div></section>`;
  const main = `
  <section class="block dashboard-block"><div class="wrap">
    <div class="dashboard-heading"><div><div class="eyebrow">Operational overview</div><h2>Site dashboard</h2><p>Document status and key custody at a glance.</p></div><a class="btn primary small" href="${U('new.html')}">+ New document</a></div>
    ${DEMO_EXPIRED ? `<div class="demo-notice">INTERACTIVE PREVIEW — Three fictional overdue documents are displayed. Select the alert to inspect them; this preview is not site data. <a href="${U('index.html')}?mode=live">Switch to recorded documents →</a></div>` : ``}
    <div class="dashboard-metrics" aria-label="Site status">
      <a href="${U('ptw.html')}"><b>${n('ptw','Live')}</b><span>Live PTWs</span></a>
      <a href="${U('sft.html')}"><b>${n('sft','Live')}</b><span>Live SFTs</span></a>
      <a href="${U('loa.html')}"><b>${n('loa','Live')}</b><span>Live LOAs</span></a>
      <a href="${U('keys.html')}"><b>${n('keys','In lockout box')}</b><span>Keys in boxes</span></a>
      <a href="${U('keys.html')}"><b>${n('keys','With AP')}</b><span>Keys with AP</span></a>
      <a href="${U('keys.html')}"><b>${n('keys','Out of service')}</b><span>Out of service</span></a>
    </div>
    <div class="dashboard-heading dashboard-subheading"><div><div class="eyebrow">Registers</div><h2>Control centre</h2></div></div>
    <div class="dashboard-links">
      <a href="${U('keys.html')}"><strong>Key control</strong><span>Locks, keys and custody</span><i>→</i></a>
      <a href="${U('info.html')}"><strong>Lockout boxes</strong><span>Box status and assignments</span><i>→</i></a>
      <a href="${U('ptw.html')}"><strong>Permit to Work</strong><span>PTW register</span><i>→</i></a>
      <a href="${U('sft.html')}"><strong>Sanction for Test</strong><span>SFT register</span><i>→</i></a>
      <a href="${U('loa.html')}"><strong>Limitation of Access</strong><span>LOA register</span><i>→</i></a>
      <a href="${U('cp.html')}"><strong>Personnel</strong><span>AP, SAP and CP locks</span><i>→</i></a>
      <a href="${U('lv-schematic.html')}"><strong>Electrical drawings</strong><span>Lock reference diagrams</span><i>→</i></a>
      <a href="${U('procedure.html')}"><strong>Procedures</strong><span>Control and reconciliation</span><i>→</i></a>
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
  const hero = pageHero(`<a href="${U('index.html')}">Home</a><span>/</span><span>${p.title}</span>`, `Tracker · ${p.code}`, p.title, p.blurb, `${['ptw','sft','loa'].includes(key) ? `<div class="cta" style="margin-top:22px"><a class="btn primary" href="${U('new.html')}?type=${key.toUpperCase()}">+ New ${key.toUpperCase()}</a></div>` : ''}`);
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

/* One numbered personal lock cannot physically be on more than one box.
   Resolve conflicts visibly instead of representing a single lock as multiple physical locks. */
function personalLockLocations(lockId){
  return DATA.info.filter(b => b.status === 'In use' && (b.plocks || []).includes(lockId) || (b.status === 'In use' && String(b.aplock || '').includes(lockId)));
}
function lockPlacement(lockId){
  const locations = personalLockLocations(lockId);
  if(locations.length > 1) return {state:'conflict', boxes:locations};
  if(locations.length === 1) return {state:'placed', boxes:locations};
  return {state:'available', boxes:[]};
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
    shell('', pageHero(`<a href="${U('index.html')}">Home</a>`, 'Record', 'Record not found', `No record matches “${esc(id || '')}”. Open a tracker and select a line.`, `<div class="cta"><a class="btn primary" href="${U('keys.html')}">Open key tracker ${I.arrow}</a></div>`), '');
    return;
  }
  const {set, r} = hit, p = PAGES[set];
  let body = '', side = '';
  if(set==='keys'){
    body = fields([['Lock no.',mono(r.id)],['System',sys(r.sys)],['Board',esc(r.board)],['Cabinet hook',mono(r.hook)],['Point of isolation',esc(r.point),1],['Drawing',`<a class="plink" href="${U('lv-schematic.html')}?lock=${esc(r.id)}">${esc(r.sld)} · view on drawing →</a>`],['Lock fitted',mono(r.fitted)],['Condition',esc(r.cond),1]]);
    const tag = (r.status==='In lockout box' || r.status==='With AP') ? `<div class="hooktag"><b>KEY-OUT TAG · HOOK ${esc(r.hook)}</b><div><span>Lock / key</span><span class="mono">${esc(r.id)}</span></div><div><span>Status</span><span>${esc(r.status.toUpperCase())}</span></div><div><span>Lockout box</span><span class="mono">${esc(r.box || '—')}</span></div><div><span>Document</span><span class="mono">${esc(r.doc)}</span></div></div>`
      : r.status==='Out of service' ? '<p>Hook empty. Lock withdrawn from service; see condition.</p>' : `<p>Key is on hook <span class="mono">${esc(r.hook)}</span>.</p>`;
    side = `<div class="panel"><h3>Hook ${esc(r.hook)}</h3>${tag}</div><div class="panel"><h3>Linked records</h3>${linkList([r.doc, r.box].filter(Boolean))}</div>${r.doc ? logPanel(r.doc) : ''}`;
  }
  if(set==='info'){
    body = fields([['Box no.',mono(r.id)],['Dedicated box lock no.',mono(r.boxLock || r.id)],['Cabinet 3 bay',mono(r.bay)],['Safety document',link(r.doc)],['Issued',mono(r.issued)],['AP lock',person(r.aplock),1],['Isolation keys inside',r.keys.length?linkList(r.keys):'',1],['Personal locks applied',r.plocks.length?linkList(r.plocks):'',1]]);
    side = `<div class="panel"><h3>Box can be opened when</h3><p>${r.plocks.length ? `All ${r.plocks.length} personal locks have been removed by their holders, then the AP removes their own lock.` : 'Box is empty and not in use.'}</p></div>${r.doc ? logPanel(r.doc) : ''}`;
  }
  if(set==='ptw' || set==='sft'){
    body = fields([[set==='ptw'?'Permit no.':'Sanction no.',mono(r.id)],['System',sys(r.sys)],['Work',esc(r.work),1],...(set==='sft'?[['Test',esc(r.test),1]]:[]),['Location',esc(r.loc),1],['Issued by',esc(r.ap)],['Competent person',person(r.cp)],['Issued',mono(r.issued)],['Expires',mono(r.expiry)],...(r.cancelledBy?[['Cancelled by',esc(r.cancelledBy)],['Cancelled at',mono(r.cancelledAt)],['Reconciliation',esc(r.reconciliation)]]:[]),['Isolation locks',linkList(r.keys),1],['Lockout box',link(r.box)],['Limitation of access',link(r.loa)],...(r.notes?[['Notes',esc(r.notes),1]]:[])]);
    side = cpPanel(r.cp,'Competent person') + cancelPanel(r) + logPanel(r.id);
  }
  if(set==='loa'){
    body = fields([['LOA no.',mono(r.id)],['Linked permit',link(r.ptw)],['Area',esc(r.area),1],['Reason',esc(r.reason),1],['Boundaries',esc(r.bounds),1],['Issued by',esc(r.ap)],['Holder',person(r.holder)],['Issued',mono(r.issued)],['Expires',mono(r.expiry)],...(r.cancelledBy?[['Cancelled by',esc(r.cancelledBy)],['Cancelled at',mono(r.cancelledAt)]]:[]),...(r.notes?[['Notes',esc(r.notes),1]]:[])]);
    side = cpPanel(r.holder,'LOA holder') + cancelPanel(r) + logPanel(r.id);
  }
  if(set==='cp'){
    const docs = [...DATA.ptw.map(d=>[d,d.cp]), ...DATA.sft.map(d=>[d,d.cp]), ...DATA.loa.map(d=>[d,d.holder])].filter(([d,c]) => String(c).includes(r.id)).map(([d]) => d);
    const placement = lockPlacement(r.id), boxes = placement.boxes;
    const live = docs.filter(d => d.status==='Live');
    body = fields([['Personal lock no.',mono(r.id)],['Role',esc(r.role)],['Name',esc(r.name)],['Company',esc(r.company)],['Phone',`<span class="mono">${esc(r.phone)}</span>`],['Email',`<span class="mono">${esc(r.email)}</span>`],['ID06 card',mono(r.id06)],['Emergency contact',esc(r.emergency)],['Authorised for',esc(r.scope),1],['CP training completed',mono(r.trained)],['Authorised by',esc(r.authBy)],['Authorised until',mono(r.expiry)],['Status',chip(r.status)]]);
    side = `<div class="panel cppanel"><h3>Contact</h3>${cpCard(r, false)}</div><div class="panel"><h3>Lock on site now</h3>${placement.state === 'conflict' ? `<p class="placement-alert"><strong>RECORD CONFLICT — VERIFY PHYSICALLY.</strong> This single personal lock is recorded against ${boxes.map(b=>link(b.id)).join(', ')}. A single lock cannot be fitted to several boxes. No location is confirmed until reconciled.</p>` : boxes.length ? `<p>Personal lock is recorded on ${link(boxes[0].id)}.</p>` : '<p>Not recorded on any lockout box.</p>'}</div>
      <div class="panel"><h3>Live documents</h3>${live.length ? linkList(live.map(d=>d.id)) : '<p>None</p>'}</div>
      <div class="panel"><h3>Document history</h3>${docs.length ? linkList(docs.map(d=>d.id)) : '<p>None recorded</p>'}</div>
      ${r.status!=='Active' ? `<div class="panel" style="border-color:var(--crit)"><h3 style="color:var(--crit)">Not to receive documents</h3><p>Authorisation is ${r.status.toLowerCase()}. Do not issue a PTW, SFT or LOA to this person.</p></div>` : ''}`;
  }
  const titles = {cp:r.name, keys:r.point, info:r.doc ? `Serving ${r.doc}` : 'Lockout box', ptw:r.work, sft:r.work, loa:r.area};
  document.title = `${r.id} · Powertec Isolation Control`;
  const hero = `<section class="hero"><div class="wrap">
    <nav class="crumbs"><a href="${U('index.html')}">Home</a><span>/</span><a href="${U(p.file)}">${p.title}</a><span>/</span><span>${esc(r.id)}</span></nav>
    <div class="rec-head"><div><div class="rec-id">${esc(r.id)}</div><h1 style="font-size:clamp(28px,4.4vw,46px)">${esc(titles[set])}</h1></div>${chip(r.status)}</div>
    ${new URLSearchParams(location.search).get('created') ? `<p class="saved">${esc(r.id)} issued and saved on this device. The keys and lockout box are now shown against it in the trackers.</p>` : ''}
  </div></section>`;
  const main = `<section class="block"><div class="wrap">
    <div class="rec-grid"><div>${body}</div><aside class="side">${side}</aside></div>
    <a class="back" href="${U(p.file)}">← Back to ${p.title}</a>
  </div></section>`;
  shell(set, hero, main);
  wireRecord(r);
}

/* ---------- LV schematic ---------- */
function schematic(){
  const q = new URLSearchParams(location.search), hl = (q.get('lock') || '').toUpperCase();
  const hlKey = DATA.keys.find(k => k.id === hl);
  const used = DATA.keys.filter(k => k.doc).length;
  const hero = pageHero(`<a href="${U('index.html')}">Home</a><span>/</span><span>Schematics</span>`, 'Single line diagrams · Live lock status', 'Schematics', 'DEMONSTRATION ONLY: provisional HV and LV lock markers are shown on the two illustrative diagrams. They are not verified against site apparatus or an approved switching schedule. Tap a marker to view the corresponding provisional record.');
  const fig = dw => { const D = DRAWINGS[dw], ks = DATA.keys.filter(k => k.dw === dw); const h = ks.filter(k => k.sys === 'HV').length, l = ks.length - h, u = ks.filter(k => k.doc).length;
    return `<figure class="dwg"><figcaption><div><h3>${D.title}</h3><p>${h} HV and ${l} LV locks · ${u} in use</p></div><div class="dwg-count"><span class="pill hv">H-${String(ks.find(k=>k.sys==='HV').n).padStart(3,'0')} to H-${String([...ks].reverse().find(k=>k.sys==='HV').n).padStart(3,'0')}</span><span class="pill lv">L-${String(ks.find(k=>k.sys==='LV').n).padStart(3,'0')} to L-${String([...ks].reverse().find(k=>k.sys==='LV').n).padStart(3,'0')}</span></div></figcaption>${drawingHTML(dw, {highlight:hl})}<p class="dwg-hint">Drag or scroll the drawing to move around it.</p></figure>`; };
  const main = `<section class="block"><div class="wrap">
    <div class="plegend static"><span><i class="lk hv mini">1</i>HV lock, free</span><span><i class="lk lv mini">1</i>LV lock, free</span><span><i class="lk hv mini used">1</i>In use: tap to open the document</span><span><i class="lk lv mini oos">1</i>Out of service</span></div>
    <p class="hint" style="margin:10px 0 24px">${used} of ${DATA.keys.length} locks are in use right now.${hlKey ? ` Showing <b>${hlKey.id}</b>, ${esc(hlKey.board)} · ${esc(hlKey.point)}.` : ''}</p>
    <div class="dwgs">${fig('tier4')}${fig('hyper')}</div>
  </div></section>`;
  shell('schematic', hero, main);
  document.querySelectorAll('.dwgbox').forEach(box => box.addEventListener('click', e => {
    const b = e.target.closest('.lk'); if(!b) return;
    const k = DATA.keys.find(x => x.id === b.dataset.lock);
    location.href = recUrl(k.doc || k.id);
  }));
  if(hlKey) requestAnimationFrame(() => {
    const box = document.querySelector(`.dwgbox[data-dw="${hlKey.dw}"]`), sc = box.parentElement;
    box.closest('.dwg').scrollIntoView({block:'start'}); scrollToLocks(sc, box, [hlKey.id]);
  });
}

/* ---------- System procedure (step-by-step plan of the system) ---------- */
const STAGES = [
  {k:'plan',name:'Plan the isolation',who:'AP',icon:'ptw',
   steps:['Mark the points of isolation and earthing on a copy of the SLD. Read the circled lock number beside each switch.','Write the switching programme, listing every point with its lock number, such as LV-MSB-B ACB Q1 · L-121.','Open the Key tracker and check every listed lock shows IN CABINET.','Open the CP register and check the CP who will receive the document is Active and authorised for this system.'],
   site:'No change yet. The switching programme is ready.',
   stop:'Any lock not IN CABINET, or a CP not Active: stop and resolve before going on.'},
  {k:'draw',name:'Draw the keys and a lockout box',who:'AP',icon:'key',
   steps:['Take each key from its numbered hook in Cabinet 1 (HV) or Cabinet 2 (LV).','Hang a key-out tag on each empty hook: lock no., status WITH AP, document no., your name, time.','Take a free lockout box from Cabinet 3 and tag its empty bay the same way.'],
   site:'Key tracker: each key → With AP. Information tracker: box → In use, against the document number.',
   stop:'Every empty hook and bay carries a tag before you leave the AP office.'},
  {k:'isolate',name:'Isolate, lock and earth',who:'AP',icon:'lock',
   steps:['Carry out the switching programme in order.','At each point, fit its dedicated lock. Check the number on the lock matches the switch label and the SLD.','Prove dead and apply earths as the safety rules require. Lock earth switches with their own dedicated locks.','Post caution and danger notices.'],
   site:'No change. Keys stay in the AP\'s hand.',
   stop:'A lock number that does not match the label or SLD: stop. Do not fit a different lock.'},
  {k:'secure',name:'Secure the keys',who:'AP',icon:'box',
   steps:['Place every isolation key in the selected box and independently reconcile the count against the approved switching programme.','Verify that the lockout box LB-nn has its own dedicated lock permanently allocated with the identical number LB-nn; apply it only as required by the approved site procedure. Separate AP and CP personal locks P-nnn provide individual protection under the approved arrangement.','Update each hook tag from WITH AP to IN LOCKOUT BOX, LB-nn.'],
   site:'Key tracker: each key → In lockout box, LB-nn. Information tracker: AP lock recorded.',
   stop:'Key count must match the switching programme exactly.'},
  {k:'issue',name:'Issue the safety document',who:'AP and CP',icon:'ptw',
   steps:['Raise the PTW or SFT with + New safety document. Under Points of isolation choose HV, LV or both, pick the plant, then tap each lock number on the drawing.','At the point of work, show the CP the isolation, earths and notices, and brief the work.','Issue the document. The CP signs receipt.','The CP and every member of the working party fit their own personal lock to the lockout box. Record each P-number on the document.'],
   site:'PTW or SFT tracker: document → Live. Information tracker: personal locks recorded. CP register: document shown against the CP.',
   stop:'Nobody works without their own lock on the box.'},
  {k:'work',name:'During the work',who:'CP and working party',icon:'people',
   steps:['The CP keeps the working party within the limits of the document.','A person joining fits their own lock and is added to the document. A person leaving removes their own lock and is signed off.','Nobody removes another person\'s lock, for any reason.','Where live equipment is close by, the AP issues a Limitation of Access with clear boundaries.'],
   site:'Information tracker: personal locks added or removed. LOA tracker: LOA → Live if issued.',
   stop:'The box cannot be opened while any personal lock is on it.'},
  {k:'cancel',name:'Cancel and restore',who:'CP then AP',icon:'shield',
   steps:['The CP confirms the work is complete, the working party is withdrawn, and signs the document for cancellation.','Each person removes their own personal lock.','The AP removes the AP lock, opens the box and counts the keys against the document.','Remove earths and locks, and restore the system as per the switching programme.','Return each key to its own numbered hook and remove the key-out tag. Return the box to its bay.'],
   site:'Key tracker: each key → In cabinet. Information tracker: box → In cabinet. PTW/SFT/LOA tracker: → Cancelled.',
   stop:'Tag, hook and tracker must agree before the AP leaves the office.'}
];
const ROUTINES = [
  {name:'Shift handover',who:'Outgoing and incoming AP',steps:['Check together: empty hooks against tags, against the Key tracker, against live documents.','Resolve any difference before the outgoing AP leaves.','Both APs sign the handover entry.']},
  {name:'Daily check',who:'AP on duty · 5 minutes',steps:['Every empty hook has a tag.','Every tag matches the Key tracker and a live document.','Every lockout box out of Cabinet 3 is tied to a live document.']},
  {name:'Weekly walk-down',who:'AP',steps:['Pick 10% of fitted locks on site.','Check lock number against switch label against SLD.','Record the result; correct any error the same day.']},
  {name:'Monthly reconciliation',who:'Lead SAP',steps:['Reconcile every tracker and the CP register.','Check CP authorisations due to expire in the next 30 days.','Review incidents and near misses.']},
  {name:'Lost key or unknown lock',who:'AP and lead SAP',steps:['Stop. Treat the isolation as uncertain; do not issue or cancel against it.','Tell the lead SAP and record an incident.','Under SAP control re-prove the isolation, then remove the lock by an approved method.','Fit a new lock with a new number; update the label, the SLD and the Key tracker. Retire the old number.']},
  {name:'New CP joins site',who:'Lead SAP',steps:['Confirm CP training is complete and the authorisation is signed.','Issue the next free personal lock and engrave the P-number.','Add the person to the CP register with their contact details.']}
];
function procedure(){
  let n = 0;
  const hero = pageHero(`<a href="${U('index.html')}">Home</a><span>/</span><span>System procedure</span>`, 'System procedure · Step by step', 'How the system works', 'Every safety document follows the same seven stages, from planning the isolation to returning the last key to its hook. Each stage says who does it, what changes in the trackers, and when to stop.');
  const bar = `<div class="phasebar" style="grid-template-columns:repeat(${STAGES.length},minmax(118px,1fr))">${STAGES.map((s,i) => `<a href="#stage-${s.k}"><b>${i+1}</b><span>${s.name}</span><small>${s.who}</small></a>`).join('')}</div>`;
  const cards = STAGES.map((s,i) => `
    <article class="phase" id="stage-${s.k}">
      <div class="pnum">${i+1}</div>
      <div class="pbody">
        <div class="pmeta"><span>Stage ${i+1} of ${STAGES.length}</span><span>Done by: ${s.who}</span></div>
        <h3>${s.name}</h3>
        <div class="pcols">
          <div><h4>Steps</h4><ol class="steps-list">${s.steps.map(t => `<li><span class="sn">${++n}</span><span>${esc(t)}</span></li>`).join('')}</ol></div>
          <div><h4>On this site</h4><p class="site-note">${esc(s.site)}</p></div>
        </div>
        <p class="gate"><b>Stop check</b>${esc(s.stop)}</p>
      </div>
    </article>`).join('');
  const routines = ROUTINES.map(r => `<div class="panel"><h3>${r.name}</h3><div class="pmeta" style="margin-bottom:12px"><span>${r.who}</span></div><ol class="mini">${r.steps.map(t=>`<li>${esc(t)}</li>`).join('')}</ol></div>`).join('');
  const statuses = [['In cabinet','Key on its own hook. Free to use.'],['With AP','Drawn for a document, being taken out to the switch. Never left overnight.'],['In lockout box','Inside a box under a live document. Box locked by AP and working party.'],['Out of service','Lock damaged or under replacement. Hook carries a tag.']];
  const main = `
  <section class="block"><div class="wrap">
    <div class="block-head"><div class="eyebrow">Stages</div><h2>One document, seven stages.</h2><p class="lead">The same stages apply to a Permit to Work and a Sanction for Test. Tap a stage to jump to it.</p></div>
    <div class="barbox">${bar}</div>
    <div class="phases">${cards}</div>
  </div></section>
  <section class="block alt"><div class="wrap">
    <div class="block-head"><div class="eyebrow">Routines</div><h2>Keeping the system right.</h2></div>
    <div class="routines">${routines}</div>
  </div></section>
  <section class="block"><div class="wrap">
    <div class="block-head"><div class="eyebrow">Quick reference</div><h2>What each key status means.</h2></div>
    <div class="tablebox plain"><table><thead><tr><th scope="col">Status</th><th scope="col">Meaning</th></tr></thead><tbody>${statuses.map(([s,m]) => `<tr><td data-label="Status">${chip(s)}</td><td data-label="Meaning">${m}</td></tr>`).join('')}</tbody></table></div>
  </div></section>`;
  shell('procedure', hero, main);
}

/* ---------- New safety documents (saved on this device) ----------
   Every new PTW, SFT or LOA, and every cancellation, is stored as an event in this browser's
   storage and replayed over the initial records each time a page opens. */
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
    if(d.box){ const b = DATA.info.find(x => x.id === d.box); if(b){ b.boxLock = b.id; b.status = 'In use'; b.doc = d.id; b.keys = [...(d.keys || [])]; b.aplock = d.apLock || ''; b.plocks = [...(d.plocks || [])]; b.issued = d.issued; } }
    if(set === 'loa' && d.ptw){ const p = DATA.ptw.find(x => x.id === d.ptw); if(p) p.loa = d.id; }
    LOGS[d.id] = (LOGS[d.id] || []).concat(e.log || []);
  }
  if(e.op === 'cancel'){
    const hit = find(e.id); if(!hit || hit.r.status === 'Cancelled') return;
    const d = hit.r; d.status = 'Cancelled'; d.cancelledBy = e.by; d.cancelledAt = e.at; d.reconciliation = d.box ? 'Physical key/box return not verified' : 'Not applicable';
    // Do not mark physical keys returned merely because a document is cancelled.
    // Box custody also remains unchanged pending a separate physical reconciliation.
    LOGS[d.id] = (LOGS[d.id] || []).concat([[hhmm(e.at), `${d.id} cancelled by ${e.by}. ${d.keys && d.keys.length ? 'Physical key and box return NOT verified' : 'Boundaries require independent confirmation'}.`]]);
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
  duration:[['30 minutes',0.5],['1 hour',1],['1 hour 30 minutes',1.5],['2 hours',2],['3 hours',3],['4 hours',4],['6 hours',6],['8 hours',8],['10 hours',10],['12 hours',12],['16 hours',16],['End of shift (18:00)','eos'],['24 hours · 1 day',24],['36 hours',36],['48 hours · 2 days',48],['72 hours · 3 days',72],['96 hours · 4 days',96],['120 hours · 5 days',120],['144 hours · 6 days',144],['168 hours · 7 days',168]]
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
  else d.setTime(d.getTime() + Number(v) * 60 * 60 * 1000);
  return stamp(d);
}

function newDoc(){
  const qType = (new URLSearchParams(location.search).get('type') || '').toUpperCase();
  const people = DATA.cp;
  const aps = people.filter(c => ['AP','SAP'].includes(c.role) && c.status === 'Active');
  const cpOptions = people.filter(c => c.role === 'CP').map(c => {
    const placement = lockPlacement(c.id);
    const reason = c.status !== 'Active' ? c.status : placement.state === 'conflict' ? 'LOCK CONFLICT' : placement.state === 'placed' ? `Lock on ${placement.boxes[0].id}` : 'Available';
    return `<option value="${esc(c.id)}">${esc(cpLabel(c))} · ${esc(reason)}</option>`;
  }).join('');
  const hero = pageHero(`<a href="${U('index.html')}">Home</a><span>/</span><span>New safety document</span>`, 'Issue · PTW · SFT · LOA', 'New safety document', 'Choose each item from its list. Only locks on their hooks, free lockout boxes and active CPs can be chosen.');
  const main = `<section class="block"><div class="wrap">
    <form class="docform" id="docform" novalidate>
      <div class="fgroup"><h3>1 · Document</h3><div class="fgrid">
        <label class="f"><span>Document type *</span><select id="f-type" required>${opts([['Permit to Work (PTW)','PTW'],['Sanction for Test (SFT)','SFT'],['Limitation of Access (LOA)','LOA']],'Choose a document type')}</select></label>
        <label class="f" data-for="PTW"><span>Work *</span><select id="f-work-ptw">${opts(OPTIONS.ptwWork,'Choose the work')}</select></label>
        <label class="f" data-for="SFT"><span>Work *</span><select id="f-work-sft">${opts(OPTIONS.sftWork,'Choose the work')}</select></label>
        <label class="f" data-for="SFT"><span>Test *</span><select id="f-test">${opts(OPTIONS.sftTest,'Choose the test')}</select></label>
        <label class="f" data-for="PTW SFT"><span>Location *</span><select id="f-loc">${opts(OPTIONS.locations,'Choose the location')}</select></label>
        <label class="f" data-for="LOA"><span>Area *</span><select id="f-area">${opts(OPTIONS.locations,'Choose the area')}</select></label>
        <label class="f" data-for="LOA"><span>Reason *</span><select id="f-reason">${opts(OPTIONS.loaReason,'Choose the reason')}</select></label>
        <label class="f" data-for="LOA"><span>Boundaries *</span><select id="f-bounds">${opts(OPTIONS.loaBounds,'Choose the boundaries')}</select></label>
        <label class="f" data-for="LOA"><span>Linked permit</span><select id="f-ptw"></select></label>
      </div></div>
      <div class="fgroup" data-for="PTW SFT"><h3>2 · Points of isolation</h3><div class="fgrid">
        <label class="f wide"><span>System * <small>Choose HV, LV or both. Each opens its own list of plant.</small></span><select id="f-sys">${opts([['HV','HV'],['LV','LV'],['HV and LV','HV,LV']],'Choose HV, LV or both')}</select></label>
        <div class="f" id="wrap-hv" hidden><span><i class="dot hv"></i>HV plant * <small>Choose an item of plant to open its drawing.</small></span>
          <div class="addrow"><select id="f-plant-hv"></select><button type="button" class="btn ghost small" data-open="hv">Drawing</button></div></div>
        <div class="f" id="wrap-lv" hidden><span><i class="dot lv"></i>LV plant * <small>Choose an item of plant to open its drawing.</small></span>
          <div class="addrow"><select id="f-plant-lv"></select><button type="button" class="btn ghost small" data-open="lv">Drawing</button></div></div>
        <div class="f wide"><span>Lock numbers selected <small>Tap the lock numbers on the drawing. They are added here as the points of isolation.</small></span>
          <ul class="picked" id="pickedLocks"></ul><p class="none-yet" id="noLocks">No points of isolation selected yet.</p></div>
        <label class="f"><span>Lockout box *</span><select id="f-box"></select><small id="boxAvailability" class="select-help" aria-live="polite"></small></label>
      </div></div>
      <div class="fgroup"><h3><span data-num></span> · People</h3><div class="fgrid">
        <label class="f"><span>Issuing AP *</span><select id="f-ap">${opts(aps.map(a => [`${a.name} (${a.role}) · ${a.id}`, a.id]),'Choose the issuing AP')}</select></label>
        <label class="f"><span><b data-cp-label>Competent person *</b></span><select id="f-cp"><option value="">Choose the CP</option>${cpOptions}</select><small id="cpAvailability" class="select-help" aria-live="polite"></small></label>
        <div class="f wide" data-for="PTW SFT"><span>Working party <small>Each person's personal lock goes on the box.</small></span>
          <div class="addrow"><select id="f-wp"></select><button type="button" class="btn ghost small" id="addWp">Add person</button></div>
          <ul class="picked" id="pickedWp"></ul></div>
        <div class="cpcard wide" id="cpPreview" hidden></div>
      </div></div>
      <div class="fgroup"><h3><span data-num2></span> · Time</h3><div class="fgrid">
        <label class="f"><span>Valid for *</span><select id="f-dur">${opts(OPTIONS.duration,'Choose how long')}</select></label>
        <label class="f wide"><span>Notes <small>Optional</small></span><textarea id="f-notes" rows="3" maxlength="500"></textarea></label>
      </div></div>
      <div class="errors" id="errors" role="alert" hidden></div>
      <div class="formfoot">
        <button type="submit" class="btn primary">Issue document ${I.arrow}</button>
        <a class="btn ghost" href="${U('index.html')}">Cancel</a>
      </div>
      <p class="hint">Documents you issue here are saved on this phone or computer only. Other devices will not see them.</p>
    </form>
  </div></section>`;
  shell('new', hero, main);

  const $ = id => document.getElementById(id);
  const locks = [], wp = [];
  const picker = document.createElement('div');
  picker.className = 'picker'; picker.id = 'picker'; picker.hidden = true;
  picker.setAttribute('role','dialog'); picker.setAttribute('aria-modal','true'); picker.setAttribute('aria-label','Choose lock numbers on the drawing');
  document.body.appendChild(picker);
  const sysList = () => ($('f-sys').value || '').split(',').filter(Boolean);
  const type = () => $('f-type').value;
  function show(){
    const t = type();
    document.querySelectorAll('[data-for]').forEach(el => { el.hidden = !t || !el.dataset.for.split(' ').includes(t); });
    document.querySelector('[data-cp-label]').textContent = t === 'LOA' ? 'LOA holder (CP) *' : 'Competent person *';
    document.querySelector('[data-num]').textContent = t === 'LOA' ? '2' : '3';
    document.querySelector('[data-num2]').textContent = t === 'LOA' ? '3' : '4';
  }
  function plantOptions(sysName){
    const groups = Object.keys(DRAWINGS).map(dw => {
      const list = PLANTS.filter(p => p.dw === dw && p.sys === sysName);
      if(!list.length) return '';
      return `<optgroup label="${esc(DRAWINGS[dw].title)}">${list.map(p => { const free = p.ids.filter(id => DATA.keys.find(k => k.id === id).status === 'In cabinet').length; return `<option value="${esc(p.key)}">${esc(p.name)} · ${free} of ${p.ids.length} free</option>`; }).join('')}</optgroup>`;
    }).join('');
    return `<option value="">Choose ${sysName} plant</option>${groups}`;
  }
  function showSys(){
    const sl = sysList();
    $('wrap-hv').hidden = !sl.includes('HV'); $('wrap-lv').hidden = !sl.includes('LV');
    for(let i = locks.length - 1; i >= 0; i--){ const k = DATA.keys.find(x => x.id === locks[i]); if(!sl.includes(k.sys)) locks.splice(i,1); }
    fillLocks();
  }
  function fillLocks(){
    $('pickedLocks').innerHTML = locks.map(id => { const k = DATA.keys.find(x => x.id === id); return `<li><i class="dot ${k.sys.toLowerCase()}"></i><span class="mono">${id}</span><span class="pl">${esc(k.board)} · ${esc(k.point)} <em>${esc(DRAWINGS[k.dw].title)}</em></span><button type="button" data-rm-lock="${id}" aria-label="Remove ${id}">×</button></li>`; }).join('');
    $('noLocks').hidden = locks.length > 0;
  }
  let toastTimer;
  function toast(html){ const t = picker.querySelector('.ptoast'); t.innerHTML = html; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 6000); }
  function openPicker(plantKey){
    const p = PLANTS.find(x => x.key === plantKey); if(!p) return;
    const D = DRAWINGS[p.dw];
    picker.innerHTML = `<div class="phead"><div class="ptitle"><span class="kicker orange">${esc(p.sys)} · ${esc(D.title)}</span><b>${esc(p.name)}</b><small>Tap a lock number to add it. Tap again to remove. Grey, struck-through numbers are already in use.</small></div><button type="button" class="btn primary small" id="pickDone">Done · <span id="pickCount"></span></button></div>
      <div class="pbody" id="pickBody">${drawingHTML(p.dw, {picked:new Set(locks), focus:p.key, sys:sysList()})}</div>
      <div class="plegend"><span><i class="lk hv mini">1</i>Free</span><span><i class="lk hv mini picked">1</i>Selected</span><span><i class="lk hv mini used">1</i>In use</span><span><i class="lk hv mini focus">1</i>${esc(p.name)}</span></div>
      <div class="ptoast" hidden></div>`;
    picker.hidden = false; document.body.style.overflow = 'hidden';
    const count = () => { picker.querySelector('#pickCount').textContent = `${locks.length} selected`; };
    count();
    const body = picker.querySelector('#pickBody');
    requestAnimationFrame(() => scrollToLocks(body, body.querySelector('.dwgbox'), p.ids));
    body.addEventListener('click', e => {
      const b = e.target.closest('.lk'); if(!b) return;
      const k = DATA.keys.find(x => x.id === b.dataset.lock);
      if(k.status === 'Out of service'){ toast(`<b>${k.id}</b> is out of service: ${esc(k.cond)}.`); return; }
      if(k.doc){ toast(`<b>${k.id}</b> is in use on <a href="${recUrl(k.doc)}">${esc(k.doc)}</a> (${esc(find(k.doc).r.status)}). Open the document to see who holds it.`); return; }
      if(!sysList().includes(k.sys)){ toast(`<b>${k.id}</b> is ${k.sys}. Change the system to ${k.sys === 'HV' ? 'HV' : 'LV'} or HV and LV to select it.`); return; }
      const i = locks.indexOf(k.id);
      if(i > -1){ locks.splice(i,1); b.classList.remove('picked'); } else { locks.push(k.id); b.classList.add('picked'); toast(`<b>${k.id}</b> added · ${esc(k.board)} · ${esc(k.point)}`); }
      count(); fillLocks();
    });
    picker.querySelector('#pickDone').addEventListener('click', closePicker);
    picker.querySelector('#pickDone').focus();
  }
  function closePicker(){ picker.hidden = true; document.body.style.overflow = ''; fillLocks(); document.getElementById('pickedLocks').scrollIntoView({block:'center'}); }
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && !picker.hidden) closePicker(); });
  function updateAvailability(){
    const free = DATA.info.filter(b => b.status === 'In cabinet').length;
    const box = document.getElementById('boxAvailability');
    if(box) box.textContent = `${free} of ${DATA.info.length} boxes available. Occupied and out-of-service boxes remain listed for visibility but cannot be selected for issue.`;
    const cp = document.getElementById('cpAvailability');
    if(cp){
      const freeCP = people.filter(c => c.role === 'CP' && c.status === 'Active' && lockPlacement(c.id).state === 'available').length;
      cp.textContent = `${freeCP} CP personal locks available. Unavailable people remain listed with their current status.`;
    }
  }
  function fillBoxes(){
    const prev = $('f-box').value;
    $('f-box').innerHTML = opts(DATA.info.map(b => [`${b.id} · ${b.status === 'In cabinet' ? 'AVAILABLE' : b.status.toUpperCase()} · ${b.bay}`, b.id]), 'Choose a lockout box');
    if(DATA.info.some(b => b.id === prev)) $('f-box').value = prev;
    updateAvailability();
  }
  function fillPtw(){ $('f-ptw').innerHTML = opts(DATA.ptw.filter(p => p.status === 'Live').map(p => [`${p.id} · ${p.work}`, p.id]), 'None'); }
  function fillWp(){
    const cp = $('f-cp').value;
    const candidates = people.filter(c => c.role === 'CP' && c.id !== cp && !wp.includes(c.id));
    $('f-wp').innerHTML = opts(candidates.map(c => {
      const placement = lockPlacement(c.id);
      const reason = c.status !== 'Active' ? c.status : placement.state === 'conflict' ? 'LOCK CONFLICT' : placement.state === 'placed' ? `Lock on ${placement.boxes[0].id}` : 'Available';
      return [`${cpLabel(c)} · ${reason}`, c.id];
    }), 'Choose a person');
    $('pickedWp').innerHTML = wp.map(id => { const c = find(id).r; return `<li><span class="mono">${id}</span> ${esc(c.name)} · ${esc(c.company)}<button type="button" data-rm-wp="${id}" aria-label="Remove ${id}">×</button></li>`; }).join('');
  }
  function cpPreview(){
    const id = $('f-cp').value, box = $('cpPreview');
    if(!id){ box.hidden = true; return; }
    box.innerHTML = cpCard(find(id).r, false); box.hidden = false;
  }
  $('f-type').addEventListener('change', show);
  $('f-plant-hv').innerHTML = plantOptions('HV'); $('f-plant-lv').innerHTML = plantOptions('LV');
  $('f-sys').addEventListener('change', showSys);
  ['hv','lv'].forEach(t => {
    $(`f-plant-${t}`).addEventListener('change', e => { if(e.target.value) openPicker(e.target.value); });
    document.querySelector(`[data-open="${t}"]`).addEventListener('click', () => { const v = $(`f-plant-${t}`).value; if(v) openPicker(v); else $(`f-plant-${t}`).focus(); });
  });
  $('pickedLocks').addEventListener('click', e => { const b = e.target.closest('[data-rm-lock]'); if(b){ locks.splice(locks.indexOf(b.dataset.rmLock),1); fillLocks(); } });
  $('f-box').addEventListener('change', updateAvailability);
  $('f-cp').addEventListener('change', () => { const i = wp.indexOf($('f-cp').value); if(i > -1) wp.splice(i,1); fillWp(); cpPreview(); });
  $('addWp').addEventListener('click', () => {
    const v = $('f-wp').value; if(!v) return;
    const c = people.find(x => x.id === v), placement = lockPlacement(v);
    if(!c || c.status !== 'Active' || placement.state !== 'available') { alert('This person cannot be added: their personal lock is unavailable or their authorisation is not active. Check their personnel record.'); return; }
    wp.push(v); fillWp();
  });
  $('pickedWp').addEventListener('click', e => { const b = e.target.closest('[data-rm-wp]'); if(b){ wp.splice(wp.indexOf(b.dataset.rmWp),1); fillWp(); } });
  if(['PTW','SFT','LOA'].includes(qType)) $('f-type').value = qType;
  show(); fillLocks(); fillBoxes(); fillPtw(); fillWp();

  $('docform').addEventListener('submit', e => {
    e.preventDefault();
    const t = type(), err = [];
    const need = (id, msg) => { if(!$(id).value) err.push(msg); };
    need('f-type','Choose a document type.');
    if(t === 'PTW' || t === 'SFT'){
      need('f-sys','Choose HV, LV or both for the points of isolation.');
      need(t === 'PTW' ? 'f-work-ptw' : 'f-work-sft','Choose the work.');
      if(t === 'SFT') need('f-test','Choose the test.');
      need('f-loc','Choose the location.');
      if(!locks.length) err.push('Select at least one lock number on the drawing as a point of isolation.');
      need('f-box','Choose a lockout box.');
      const selectedBox = DATA.info.find(b => b.id === $('f-box').value);
      if(selectedBox && selectedBox.status !== 'In cabinet') err.push(`${selectedBox.id} is ${selectedBox.status.toLowerCase()} and is not available for a new document.`);
    }
    if(t === 'LOA'){ need('f-area','Choose the area.'); need('f-reason','Choose the reason.'); need('f-bounds','Choose the boundaries.'); }
    need('f-ap','Choose the issuing AP.');
    need('f-cp', t === 'LOA' ? 'Choose the LOA holder.' : 'Choose the competent person.');
    const selectedCP = people.find(c => c.id === $('f-cp').value);
    if(selectedCP && selectedCP.status !== 'Active') err.push(`${selectedCP.name} is ${selectedCP.status.toLowerCase()} and cannot be selected.`);
    if(selectedCP && t !== 'LOA' && lockPlacement(selectedCP.id).state !== 'available') err.push(`${selectedCP.name}'s personal lock is already allocated or has a conflict.`);
    need('f-dur','Choose how long the document is valid for.');
    if(t === 'PTW' || t === 'SFT') {
      for(const id of [$('f-ap').value, $('f-cp').value, ...wp].filter(Boolean)) {
        const placement = lockPlacement(id);
        if(placement.state === 'conflict') err.push(`Personal lock ${id} has conflicting box assignments; reconcile before continuing.`);
        if(placement.state === 'placed') err.push(`Personal lock ${id} is already recorded on ${placement.boxes[0].id}; one lock cannot secure two boxes simultaneously.`);
      }
    }
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
      doc = {...base, sys:sysList().join(' & '), work:$(t === 'PTW' ? 'f-work-ptw' : 'f-work-sft').value, ...(t === 'SFT' ? {test:$('f-test').value} : {}), loc:$('f-loc').value, cp:`${cp.name} · ${cp.id}`, keys:[...locks], box:$('f-box').value, loa:'', apLock:`${ap.id} · ${ap.name}`, plocks};
      log = [[hhmm(now), `Keys ${locks.join(', ')} drawn by ${ap.name}; tags hung on hooks`],[hhmm(now), `Keys placed in ${doc.box}, AP lock ${ap.id} applied, ${t} issued to ${cp.name}`],[hhmm(now), `Personal locks ${plocks.join(', ')} applied to ${doc.box}`]];
    }
    if(!addEvent({op:'create', doc, log})){ box.innerHTML = '<b>Could not save.</b> This browser is blocking storage, such as in a private window. Open the site in a normal window and try again.'; box.hidden = false; return; }
    location.href = recUrl(id) + '&created=1';
  });
}

/* CP contact card, used on documents and in the form preview */
function cpCard(c, withButton = true){
  const tel = String(c.phone).replace(/[^+\d]/g,'');
  return `<div class="cpc-head"><div><div class="cpc-role">${esc(c.role)} · <span class="mono">${esc(c.id)}</span></div><b>${esc(c.name)}</b><span>${esc(c.company)}</span></div>${chip(c.status)}</div>
    <div class="cpc-lines"><a href="tel:${tel}"><span>Phone</span><b class="mono">${esc(c.phone)}</b></a><a href="mailto:${esc(c.email)}"><span>Email</span><b class="mono">${esc(c.email)}</b></a></div>
    ${withButton ? `<a class="btn primary small" href="${recUrl(c.id)}">Open CP details ${I.arrow}</a>` : ''}`;
}
function cpPanel(str, label){
  const m = String(str || '').match(/P-\d{3}/), hit = m && find(m[0]);
  if(!hit) return '';
  return `<div class="panel cppanel"><h3>${label}</h3>${cpCard(hit.r)}</div>`;
}
function cancelPanel(r){
  if(r.status !== 'Live') return '';
  const aps = DATA.cp.filter(c => (c.role === 'AP' || c.role === 'SAP') && c.status === 'Active');
  return `<div class="panel"><h3>Cancel this document</h3><p>Cancellation must be completed by an authorised AP/SAP after the physical requirements of the applicable safety rules are satisfied.</p>
    <button type="button" class="btn ghost small" id="cancelStart" style="margin-top:14px">Cancel document</button>
    <div id="cancelConfirm" hidden style="margin-top:14px">
      <label class="f"><span>AP / SAP cancelling the document *</span><select id="cancellingAp" required><option value="">Select your name</option>${aps.map(c => `<option value="${esc(c.id)}">${esc(c.name)} (${esc(c.role)}) · ${esc(c.id)}</option>`).join('')}</select></label>
      <p><b>Confirm:</b> document returned and cancellation conditions satisfied, including personal lock removal as applicable. This action records cancellation only; it does not verify that isolation keys have physically returned to cabinets.</p>
      <label class="confirm-check"><input type="checkbox" id="cancelCheck"> I confirm the applicable cancellation checks have been completed.</label>
      <p class="placement-alert" id="cancelError" hidden></p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px"><button type="button" class="btn primary small" id="cancelYes">Record cancellation</button><button type="button" class="btn ghost small" id="cancelNo">Go back</button></div>
    </div></div>`;
}
function wireRecord(r){
  const start = document.getElementById('cancelStart'); if(!start) return;
  const conf = document.getElementById('cancelConfirm');
  start.addEventListener('click', () => { conf.hidden = false; start.hidden = true; });
  document.getElementById('cancelNo').addEventListener('click', () => { conf.hidden = true; start.hidden = false; });
  document.getElementById('cancelYes').addEventListener('click', () => {
    const id = document.getElementById('cancellingAp').value;
    const ap = DATA.cp.find(c => c.id === id && ['AP','SAP'].includes(c.role) && c.status === 'Active');
    const checked = document.getElementById('cancelCheck').checked;
    const error = document.getElementById('cancelError');
    if(!ap || !checked){ error.textContent = 'Select the cancelling AP/SAP and confirm the cancellation checks.'; error.hidden = false; return; }
    if(addEvent({op:'cancel', id:r.id, at:stamp(), by:ap.name, byLock:ap.id})) location.reload();
    else {error.textContent='Unable to save cancellation on this device.'; error.hidden=false;}
  });
}

/* Uploaded architectural references: illustrative only; never use as a controlled site SLD. */
function references(){
 const refs = [
  ['reference-tier-iv-sld.jpg','Tier IV conceptual electrical single-line diagram','Illustrative dual-feed, MV/LV, UPS and distribution arrangement. This image is not an approved as-built drawing.'],
  ['reference-electrical-room.jpg','Electrical room equipment overview','Illustrates switchgear, ATS, UPS, battery banks, power distribution and mechanical interfaces.'],
  ['reference-dc-infrastructure.jpg','Data centre infrastructure overview','Shows utility, generation, UPS, data hall and cooling equipment in context.'],
  ['reference-power-paths.jpg','Redundant power-path overview','Illustrative alternative architecture and equipment identification.']
 ];
 const hero = pageHero(`<a href="${U('index.html')}">Home</a><span>/</span><span>System references</span>`, 'Engineering reference · Concept images', 'System references', 'Visual orientation for new personnel. These images are illustrative, not controlled operating drawings or evidence of installed equipment.');
 const cards = refs.map(([file,title,desc])=>`<figure class="reference-card"><a href="${U(file)}" target="_blank" rel="noopener"><img src="${U(file)}" alt="${esc(title)}" loading="lazy"></a><figcaption><h3>${esc(title)}</h3><p>${esc(desc)}</p><a class="plink" href="${U(file)}" target="_blank" rel="noopener">Open full image →</a></figcaption></figure>`).join('');
 const main = `<section class="block"><div class="wrap"><div class="reference-warning"><b>CONTROLLED-DRAWING RULE</b><p>The H- and L-number overlays on the prototype schematic are unverified demonstration mappings. Do not use them to select or apply isolation locks. Only an approved, equipment-verified lock schedule and current controlled SLD may be used for actual operations.</p><p><b>Box / box-lock rule:</b> each lockout box LB-nn is allocated one dedicated lock also marked LB-nn. That matching box lock is distinct from any AP or CP personal lock P-nnn.</p></div><div class="reference-grid">${cards}</div><div class="panel"><h3>Numbering conventions</h3><p><b>H-001…</b> proposed HV isolation lock identifier; <b>L-001…</b> proposed LV isolation lock identifier; <b>LB-01…</b> lockout box and its own matching dedicated box lock; <b>P-001…</b> individual personal lock. All require site allocation and verification before use.</p><a class="btn primary" href="${U('lv-schematic.html')}">View prototype lock overlays →</a></div></div></section>`;
 shell('references',hero,main);
}

/* Preview-only demonstration: three overdue documents, generated relative to the
   visitor's clock. These are never saved and cannot be used for operational control. */
/* The supplied visual example is the default homepage and expiry-register view.
   Preview records exist only in memory and are never written to localStorage.
   ?mode=live disables preview; record links carry ?demo=expired for navigation. */
const previewParams = new URLSearchParams(location.search);
const DEMO_EXPIRED = previewParams.get('mode') !== 'live' && (
  previewParams.get('demo') === 'expired' ||
  ['home','expired'].includes(document.body.dataset.page)
);
if (DEMO_EXPIRED) {
  const now=Date.now();
  const when=hours=>stamp(new Date(now+hours*3600000));
  DATA.ptw.push({id:'PTW-DEMO-001',status:'Live',sys:'LV',work:'Circuit breaker inspection — demonstration',loc:'LV switchroom A',ap:'E. Berg (SAP)',cp:'Sara Nyberg · P-018',keys:[],box:'',issued:when(-11),expiry:when(-2),demo:true});
  DATA.sft.push({id:'SFT-DEMO-002',status:'Live',sys:'HV',work:'Protection relay secondary injection — demonstration',test:'Secondary injection',loc:'HV substation B',ap:'J. Andersson (AP)',cp:'Mikael Ek · P-052',keys:[],box:'',issued:when(-8),expiry:when(-1.5),demo:true});
  DATA.loa.push({id:'LOA-DEMO-003',status:'Live',area:'Battery room B',reason:'Inspection — demonstration',ap:'R. Holm (AP)',holder:'Alva Lund · P-061',issued:when(-5),expiry:when(-0.5),demo:true});
}
/* ---------- Start ---------- */
loadEvents().forEach(applyEvent);
syncKeys();
const page = document.body.dataset.page;
if(page==='references') references();
if(page==='expired') expiredPage();
if(page==='home') home();
else if(PAGES[page]) tracker(page);
else if(page==='record') record();
else if(page==='schematic') schematic();
else if(page==='procedure') procedure();
else if(page==='new') newDoc();

/* Refresh the home alert while the tab remains open, including when a sleeping tab resumes. */
if(page==='home'){
  window.setInterval(refreshExpiryAlert,15000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden) refreshExpiryAlert();});
  window.addEventListener('focus',refreshExpiryAlert);
}
if(page==='expired'){
  document.addEventListener('visibilitychange',()=>{if(!document.hidden) updateExpiredRows();});
  window.addEventListener('focus',updateExpiredRows);
}
