# Powertec Isolation Control

AP office key, lock and safety document control, built on the Powertec Utilities website:
white header with the POWERTEC UTILITIES logo, black hero with the substation photo,
white sections, orange #ef6500, Montserrat type.
All 23 files sit in one folder. There are no sub-folders.

## Use its own repository

This site has its own `index.html`, `styles.css` and photos. Uploading it into the repository
of the main Powertec Utilities site would overwrite that site's files. Create a new repository
for it, for example `isolation-control`. If you already made one, delete all the old files first.

## Upload to GitHub (works on a phone)

1. Unzip `powertec-isolation-control.zip` in the Files app.
2. In Safari, open the repository on github.com.
3. Tap **Add file → Upload files → choose your files**.
4. Open the unzipped folder, tap **Select**, select all 23 files, tap **Open**.
5. Tap **Commit changes**.
6. Go to **Settings → Pages → Deploy from a branch → main → / (root) → Save**.

The site appears at `https://<your-username>.github.io/<repository-name>/` within a few minutes.
Keep every file name exactly as it is, lower case.

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
| `lv-schematic.html` | Schematics: both single line diagrams with numbered lock circles |

## Shared files

| File | What it is |
| --- | --- |
| `styles.css` | The Powertec Utilities site styles, with the tracker, form and drawing styles added at the end |
| `app.js` | Menu, trackers, record pages, new document form, procedure and example data |
| `mark.png` | Powertec swoosh; POWERTEC UTILITIES beside it is live text, so it stays sharp |
| `favicon.png` | Browser tab icon |
| `hero.jpg` | Front page photo, the same image as the main site |
| `banner-keys.jpg` | Banner photo: key and information trackers |
| `banner-permits.jpg` | Banner photo: PTW, SFT and new document |
| `banner-substation.jpg` | Banner photo: LOA tracker and CP register |
| `banner-network.jpg` | Banner photo: procedure and schematics |
| `sld-tier4.jpg` | Tier IV single line diagram, numbered: 25 HV red, 55 LV blue |
| `sld-hyperscale.jpg` | Hyperscale 2N single line diagram, numbered: 32 HV red, 26 LV blue |

## New safety documents

Tap **+ NEW DOCUMENT** in the header, or **+ NEW PTW / SFT / LOA** on those trackers.
Every field is a dropdown. Only locks on their hooks, free lockout boxes and active CPs can be chosen.
On a live document, the Competent person card shows the CP's phone and email; **OPEN CP DETAILS** goes to their page.

New documents and cancellations are saved in that phone's or computer's browser only.
Other devices do not see them. A shared register for the whole team needs a small online
database behind the site.

The dropdown lists (work types, tests, locations, reasons, boundaries, durations) are under
`OPTIONS` in `app.js`.

## Changing the records

All records live at the top of `app.js` under `DATA`. They are example data.
Edit, add or remove rows there; every tracker, record page and front page count updates automatically.
