# Powertec Isolation Control

AP office key, lock and safety document control, built on the Powertec Utilities website styles.
All 21 files sit in one folder. There are no sub-folders.

## Upload to GitHub (works on a phone)

1. Unzip `powertec-isolation-control.zip` in the Files app.
2. In Safari, open your repository on github.com.
3. If the repository holds files from an earlier version (for example `logo.js` or `implementation.html`), delete them first.
4. Tap **Add file → Upload files → choose your files**.
5. Open the unzipped folder, tap **Select**, select all 21 files, tap **Open**.
6. Tap **Commit changes**.
7. Go to **Settings → Pages → Deploy from a branch → main → / (root) → Save**.

The site appears at `https://<your-username>.github.io/<repository-name>/` within a few minutes.

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
| `styles.css` | The Powertec Utilities site styles, with the tracker styles added at the end |
| `app.js` | Menu, trackers, record pages, procedure and example data |
| `logo.png` | Header logo |
| `logo-footer.png` | Footer logo |
| `favicon.png` | Browser tab icon |
| `hero.jpg` | Front page photo |
| `banner-keys.jpg` | Banner: key and information trackers |
| `banner-permits.jpg` | Banner: PTW and SFT trackers |
| `banner-substation.jpg` | Banner: LOA tracker and CP register |
| `banner-network.jpg` | Banner: procedure and schematic |

## Sharper photos

The photos were made from small thumbnails. Upload your full-size originals with the
same file names (for example `hero.jpg`) and they replace these with no code changes.

## Changing the records

All records live at the top of `app.js` under `DATA`. They are example data.
Edit, add or remove rows there; every tracker, record page and front page count updates automatically.
