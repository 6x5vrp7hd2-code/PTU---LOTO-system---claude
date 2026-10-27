# Powertec Isolation Control

AP office key, lock and safety document control, in the Powertec Utilities dark style:
transparent PNG logo that phases in on the front page, page photos that fade in behind
a dark gradient, Montserrat type and Powertec orange #F58220.
All 21 files sit in one folder. There are no sub-folders.

## Important: use its own repository

This site has its own `index.html` and `styles.css`. Uploading it into the repository of
the main Powertec Utilities site would overwrite that site's files. Create a new repository
for it, for example `isolation-control`.

## Upload to GitHub (works on a phone)

1. Unzip `powertec-isolation-control.zip` in the Files app.
2. In Safari, open the new repository on github.com.
3. Tap **Add file → Upload files → choose your files**.
4. Open the unzipped folder, tap **Select**, select all 21 files, tap **Open**.
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
| `record.html` | Record page opened from any tracker line |
| `procedure.html` | System procedure: seven stages, step by step, plus routines |
| `lv-schematic.html` | LV schematic |

## Shared files

| File | What it is |
| --- | --- |
| `styles.css` | Colours, fonts, layout, photo and logo phase-in |
| `app.js` | Menu, trackers, record pages, procedure and example data |
| `logo.png` | Main logo, transparent background |
| `mark.png` | Swoosh mark for the header and footer |
| `favicon.png` | Browser tab icon |
| `hero.jpg` | Front page photo |
| `banner-keys.jpg` | Photo: key and information trackers |
| `banner-permits.jpg` | Photo: PTW, SFT and record pages |
| `banner-substation.jpg` | Photo: LOA tracker and CP register |
| `banner-network.jpg` | Photo: procedure and schematic |

## Sharper photos

The photos were made from small thumbnails. Upload your full-size originals with the
same file names and they replace these with no code changes.

## Changing the records

All records live at the top of `app.js` under `DATA`. They are example data.
Edit, add or remove rows there; every tracker, record page and front page count updates automatically.
