# Leave Ledger

A single-page PTO and paid-holiday tracker. Pure static files: no build step, no server, no account.

## What it does

- Works out your accrual tier from your employment start date (9 days in the first year, 11 at one year, then one more day a year up to 20 at ten years).
- Opens a fresh ledger every PTO year and keeps the old ones, so the balance resets on its own.
- One check box per PTO day in your allotment, with an optional date and note on each.
- The paid-holiday calendar for any year, with the policy's weekend rules applied and the observed date tagged where it moves.
- Worked a paid holiday instead of taking it? Press **Worked it** on that holiday and it banks as an extra day, added to the PTO year the holiday falls in and usable like any other day. Un-banking it also clears the day if you had already used it.
- First-year accrual: nothing until day 90, then one day a month up to nine.

## Where the data lives

In `localStorage`, in the browser you use it in. Nothing leaves the device and there is no sync between devices. Setup has a **Backup and restore** box: copy that text before you switch browsers, paste it back and press Restore.

## Run it

Open `index.html`, or serve the folder:

    python3 -m http.server 8000

## Deploy to GitHub Pages

1. Push these files to a repo.
2. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. Bump `VERSION` in `sw.js` on every deploy, or the service worker keeps serving the old page.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole app: markup, styles, logic |
| `manifest.json` | Install metadata (name, icons, colors) |
| `sw.js` | Offline cache; bump `VERSION` per deploy |
| `icon.svg`, `icon-*.png` | App icons |
