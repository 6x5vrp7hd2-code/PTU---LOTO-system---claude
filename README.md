# Powertec Isolation Control

AP office key, lock and safety document control, in the Powertec Utilities style.
All 13 files sit in one folder. There are no sub-folders.

## Upload to GitHub (works on a phone)

1. Unzip `powertec-isolation-control.zip` in the Files app.
2. In Safari, open your repository on github.com.
3. Tap **Add file → Upload files → choose your files**.
4. Open the unzipped folder, tap **Select**, select all 13 files, tap **Open**.
5. Tap **Commit changes**.
6. Go to **Settings → Pages → Deploy from a branch → main → / (root) → Save**.

The site appears at `https://<your-username>.github.io/<repository-name>/` within a few minutes.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Front page |
| `keys.html` | Key tracker |
| `info.html` | Information tracker (lockout boxes) |
| `ptw.html` | Permit to work tracker |
| `sft.html` | Sanction for test tracker |
| `loa.html` | Limitation of access tracker |
| `record.html` | Record page opened from any tracker line |
| `lv-schematic.html` | LV schematic |
| `implementation.html` | Implementation plan, go-live checklist, measures and risks |
| `styles.css` | Colours, fonts, layout |
| `app.js` | Menu, trackers, record pages, example data |
| `logo.js` | Powertec logo and mark |
| `README.md` | This file |

## Changing the records

All records live at the top of `app.js` under `DATA`. They are example data.
Edit, add or remove rows there; every tracker, record page and front page count updates automatically.
