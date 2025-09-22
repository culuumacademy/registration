# Culuum Academy — Registration Site (Google Sheets Integrated)

A sleek, professional registration website for Culuum Academy. Students submit their info; entries go straight into a Google Sheet via Google Apps Script.

## What’s inside
- `index.html` — elegant, responsive form (English + Somali hints)
- `styles.css` — modern navy theme that matches Culuum branding
- `appsscript.gs` — Google Apps Script endpoint to write to your Sheet
- `script.js` — optional external JS (inline JS already included)

## Quick start (15 minutes)

### 1) Prepare your Google Sheet
1. Create a Google Sheet. Copy its ID from the URL (between `/d/` and `/edit`).
2. Rename the first sheet to **Registrations**.
3. Add this header row in A1:I1 exactly:
   ```
   Timestamp | Full Name | Level | Phone | Email | Preferred Contact | Notes | Source | User Agent | IP
   ```

### 2) Add the Apps Script
1. In the Sheet: **Extensions → Apps Script**.
2. Paste the contents of `appsscript.gs` and set:
   ```js
   const SHEET_ID = 'YOUR_SHEET_ID';
   const SHEET_NAME = 'Registrations';
   ```
3. Click **Deploy → New deployment → Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Click **Deploy** and copy the **Web app URL**.

> If you later update the script, use **Deploy → Manage deployments → Edit** to get the new URL/version.

### 3) Wire the website to the script
1. Open `index.html` and replace:
   ```js
   const SCRIPT_URL = "YOUR_APPS_SCRIPT_WEB_APP_URL";
   ```
   with your Web app URL.
2. (Optional) Move the inline JS into `script.js` and include it instead.

### 4) Host the website
- **Netlify:** Drag-and-drop this folder into Netlify; it auto-hosts.
- **GitHub Pages:** Push to a repo and enable Pages.
- **Vercel:** Import the repo; choose static hosting.

You’ll get a public URL like `https://yourdomain.netlify.app/` to share with students.

## Customization
- Replace the contact number/email in the header.
- Update the logo (swap 🦜 with your brand mark).
- Change the hero quote or add an Arabic/Somali line.
- Add fields (e.g., payment method, city) — just mirror new columns in the Sheet and in `appsscript.gs`.

## Data & Privacy
- The script stores: name, level, phone, email, contact preference, notes, user agent, and (if available) IP.
- Restrict Sheet access to admins. Share the Sheet **view-only** if you must share.
- Consider enabling two-step verification on your Google account.

## Troubleshooting
- **422 / invalid:** Make sure required fields are not empty.
- **CORS/network error:** Confirm you used the **Web app URL** (not Script URL) and set access to **Anyone**.
- **No rows added:** Confirm `SHEET_ID` matches your Sheet. Check **Executions** logs in Apps Script.

---

**Quote suggestions (use one in the hero):**
- “Learn today, lead tomorrow.”
- “Small steps, big progress.”
- “Your future speaks English — start now.”
- Somali: “Hadafkaaga maanta bilow; berrito guul.”
