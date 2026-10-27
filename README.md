# Powertec Isolation Control

AP office key, lock and safety document control, in the Powertec Training style:
stacked powertec logo over a full-screen dark photo, rounded menu button, faint grid
background, orange letterspaced labels, Montserrat type and Powertec orange.
This is Version 5: the footer of every page ends "Version 5", so you can check the live site is up to date.
All 24 files sit in one folder. There are no sub-folders.

## Important: use its own repository

This site has its own `index.html` and `styles.css`. Uploading it into the repository of
the main Powertec Utilities site would overwrite that site's files. Create a new repository
for it, for example `isolation-control`.

## Upload to GitHub (works on a phone)

1. Unzip `powertec-isolation-control.zip` in the Files app.
2. In Safari, open the new repository on github.com.
3. Tap **Add file → Upload files → choose your files**.
4. Open the unzipped folder, tap **Select**, select all 24 files, tap **Open**.
5. Tap **Commit changes**.
6. Go to **Settings → Pages → Deploy from a branch → main → / (root) → Save**.

The site appears at `https://<your-username>.github.io/<repository-name>/` within a few minutes.
File names must stay exactly as they are, lower case. GitHub Pages treats `Logo.png` and `logo.png` as different files.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Front page |
| `keys.html` | Key tracker |
| `info.html` | Information tracker (lockout boxes) |
| `ptw.html` | Permit to work tracker |
| `sft.html` | Sanction for test tracker |
| `loa.html` | Limitation of access tracker |
| `cp.html` | CP register: name, company, contact details, authorisation |
| `new.html` | New safety document: PTW, SFT or LOA, every field a dropdown |
| `record.html` | Record page opened from any tracker line |
| `procedure.html` | System procedure: seven stages, step by step, plus routines |
| `lv-schematic.html` | Schematics: both drawings with live lock numbers; in-use numbers are struck through and open their document |

## Shared files

| File | What it is |
| --- | --- |
| `styles.css` | Colours, fonts, layout, photos and phase-in |
| `app.js` | Menu, trackers, record pages, procedure and initial unverified records |
| `logo-stack.png` | Stacked powertec logo, transparent background |
| `mark.png` | Swoosh mark, used for the browser tab icon |
| `favicon.png` | Browser tab icon |
| `hero.jpg` | Front page photo (your substation photo) |
| `banner-keys.jpg` | Photo: key and information trackers |
| `banner-permits.jpg` | Photo: PTW, SFT and record pages |
| `banner-substation.jpg` | Photo: LOA tracker and CP register |
| `banner-network.jpg` | Photo: procedure and schematic |
| `sld-tier4.jpg` | Tier IV single line diagram (clean; lock circles are drawn over it by the site) |
| `sld-hyperscale.jpg` | Hyperscale 2N single line diagram (clean; lock circles are drawn over it by the site) |

## New safety documents

Tap **+ New safety document** on the front page, in the menu, or on the PTW, SFT and LOA trackers.
Every field is a dropdown. Only locks on their hooks, free lockout boxes and active CPs can be chosen.
On a live document, the Competent person card shows the CP's phone and email; **Open CP details** goes to their page.

New documents and cancellations are saved in that phone's or computer's browser only.
Other devices do not see them. A shared register for the whole team needs a small online
database behind the site.

The dropdown lists (work types, tests, locations, reasons, boundaries, durations) are under
`OPTIONS` in `app.js`.

## Choosing points of isolation from the drawing

On a new PTW or SFT, section 2 is **Points of isolation**:

1. Choose **HV**, **LV** or **HV and LV**. Each one opens its own list of plant.
2. Choose an item of plant. The matching drawing opens full screen, centred on that plant, with its lock numbers pulsing orange.
3. Tap each lock number you need. It fills in and is added to the document. Tap again to remove it.
4. Tap **Done** to go back to the form. Open another plant to add more.

Numbers already on a live or pending document are grey and struck through, and cannot be chosen.
Tapping one shows which document holds it, with a link to it. On the Schematics page, tapping a
struck-through number opens that document; tapping a free number opens the lock's record.

Lock numbers run across both drawings: Tier IV is H-001 to H-025 and L-001 to L-055; the hyperscale
drawing is H-026 to H-057 and L-056 to L-081. The positions, plant names and descriptions are in
`LOCKS` in `app.js`.

## Changing the records

All records live at the top of `app.js` under `DATA`. They are initial unverified records.
Edit, add or remove rows there; every tracker, record page and front page count updates automatically.


## New visual references and lockout-box matching locks

- `references.html` shows the four supplied illustrative diagrams. They are **not controlled site drawings**.
- Existing clickable H-/L- overlays remain **unverified example mappings**, not approved lock assignments.
- Every lockout box `LB-xx` has one dedicated box lock bearing exactly the same identifier `LB-xx`; this is separate from AP/CP personal locks `P-xxx`.
- The electronic tracker is a prototype. It cannot authorise switching, key release or document cancellation.
- The original build contains unverified preloaded personnel, equipment and document records; do not treat them as live site information.


## October 2026 control corrections
- Personal lock assignment is checked across all *in-use* lockout boxes. Conflicting assignments are flagged; one physical personal lock cannot be used on multiple boxes.
- New PTW/SFT forms reject personal locks already assigned to another in-use box, including AP and working-party locks.
- Cancellation requires the cancelling AP/SAP to select their identity from the personnel register and confirm cancellation checks. Selection is a declaration, **not authenticated proof of identity**.
- Cancelling a document no longer automatically marks keys or boxes physically returned. A separate, approved custody reconciliation workflow is needed before operational use.
- Every rendered page includes a Back button, using same-site history or a homepage fallback.
- Existing preloaded records may conflict; they remain unverified. A single lock appearing on multiple boxes is flagged for reconciliation rather than silently represented as physically present in multiple places.
- Data is browser-local and cannot be treated as a secure, shared or tamper-evident safety record.


## Expired live document alert (v7)
The homepage displays an Expired Documents alert. Live PTW/SFT/LOA records with a valid recorded expiry timestamp at or before the device's current time appear in a dedicated `expired.html` register. The five columns are document number (click for full record), date issued, date/time expired, recipient name, and recipient telephone number (click to call). The user asked for four columns but supplied five distinct fields; all five are included.

The page and alert refresh every 15 seconds while open, and on tab focus/visibility. This is *browser-local monitoring*, NOT a real-time server push, background notification, SMS, email, or cross-device alert. It works only while the page is open and relies on the device clock. Production requires a shared database, server clock, authenticated accounts, a scheduled expiry checker and push/notification delivery. An expired document remains LIVE until formally cancelled under site safety rules.


## October 2026 dropdown and dashboard update
- New-document lockout box, CP and working-party selectors show all records, including unavailable ones, with explicit availability labels. Unavailable selections are rejected on submission or when adding a working-party member.
- Free/occupied inventory is based on the current browser's stored transactions; if none are available, do not issue a document until the physical inventory and record state are reconciled.
- Homepage replaced with compact metrics and direct register links; expired-document alert remains.
- Browser-local data is not shared between devices. Dropdown changes do not provide operational authorisation.

## Release: 30 lockout boxes, expanded duration choices, expiry alert preview
- The lockout box inventory is guaranteed to contain LB-01 through LB-30, each with a matching dedicated box lock identifier. Existing allocations are retained.
- Document validity choices now range from 30 minutes to 7 days, plus end of shift. Fractional hours are calculated in milliseconds.
- The expired-documents alert is centred on the dashboard and slowly pulses red when overdue live documents exist (3.6-second cycle). Reduced-motion settings disable the animation.
- For a **fictional visual preview only**, visit `index.html?demo=expired` and `expired.html?demo=expired`. Three fabricated expired records are created in memory; they are not stored. Exit preview by visiting the regular page URL.
- The prototype continues to use browser-local records and browser time; it is NOT a central, server-side real-time alert system.


## Interactive expired-document example (default view)
Opening `index.html` now displays the central red pulsing alert with three fictional overdue documents.
Select the alert to open `expired.html` and select any document number to open its detailed record.
The preview is generated in memory, not saved as actual site data. The preview banner clearly identifies it.
To inspect the register without preview records, use `index.html?mode=live` (the alert links to `expired.html?mode=live`).
This is a static browser demonstration; no shared real-time alerting is provided.
