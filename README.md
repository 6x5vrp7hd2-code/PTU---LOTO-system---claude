# Powertec Isolation Control

AP office key, lock and safety document control, in the Powertec Utilities style.
Every file is plain text, including the logo (stored inside `assets/logo.js`), so the whole
site can be created in GitHub without uploading a zip.

## Files and where they go

| Type this as the file name in GitHub | What it is |
| --- | --- |
| `index.html` | Front page |
| `assets/styles.css` | Colours, fonts, layout |
| `assets/app.js` | Menu, trackers, record pages, example data |
| `assets/logo.js` | Powertec logo and mark |
| `trackers/keys.html` | Key tracker |
| `trackers/info.html` | Information tracker (lockout boxes) |
| `trackers/ptw.html` | Permit to work tracker |
| `trackers/sft.html` | Sanction for test tracker |
| `trackers/loa.html` | Limitation of access tracker |
| `trackers/record.html` | Record page opened from any tracker line |
| `drawings/lv-schematic.html` | LV schematic |
| `guides/implementation.html` | Implementation plan, go-live checklist, measures and risks |
| `README.md` | This file |

## Adding the files (works on a phone)

1. Open the repository on github.com.
2. Tap **Add file → Create new file**.
3. In the name box, type the full path from the table, for example `trackers/keys.html`.
   Typing the `/` creates the folder for you.
4. Paste in the file's contents and tap **Commit changes**.
5. Repeat for each file.

On a computer you can instead drag the three folders and `index.html` straight onto
**Add file → Upload files**. Folders keep their structure when dragged in. Only a zip loses it.

## Turning the site on

**Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save.**
The site appears at `https://<your-username>.github.io/<repository-name>/` within a few minutes.

## Changing the records

All records live at the top of `assets/app.js` under `DATA`. They are example data.
Edit, add or remove rows there; every tracker, record page and the front page counts update automatically.
