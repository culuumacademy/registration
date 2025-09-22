/**
 * Google Apps Script to accept JSON POST from your website and append to Google Sheet.
 * 1) Create a Google Sheet with a header row:
 *    Timestamp | Full Name | Level | Phone | Email | Preferred Contact | Notes | Source | User Agent | IP
 * 2) In Extensions → Apps Script, paste this code. Set SHEET_ID and SHEET_NAME below.
 * 3) Deploy: Deploy > New deployment > Type: Web app > Execute as: Me; Who has access: Anyone.
 * 4) Copy the Web app URL and paste into SCRIPT_URL in index.html.
 */

const SHEET_ID = 'PUT_YOUR_SHEET_ID_HERE';
const SHEET_NAME = 'Registrations';

function doPost(e) {
  try {
    const origin = e?.headers?.origin || '*';
    const data = JSON.parse(e.postData.contents || '{}');

    // Basic validation
    const required = ['fullName','level','phone'];
    for (const k of required) {
      if (!data[k] || String(data[k]).trim() === '') {
        return _json({ ok:false, error: 'Missing '+k }, origin);
      }
    }

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Ensure header row exists
    if (sh.getLastRow() === 0) {
      sh.appendRow(['Timestamp','Full Name','Level','Phone','Email','Preferred Contact','Notes','Source','User Agent','IP']);
    }

    // Try to capture IP from X-Forwarded-For (not guaranteed)
    const ip = (e?.headers && (e.headers['x-forwarded-for'] || e.headers['X-Forwarded-For'])) || '';

    sh.appendRow([
      new Date(),
      data.fullName,
      data.level,
      data.phone,
      data.email || '',
      data.contactPref || '',
      data.notes || '',
      data.source || '',
      e?.headers?.['user-agent'] || '',
      ip
    ]);

    return _json({ ok:true }, origin);
  } catch (err) {
    return _json({ ok:false, error: String(err) }, '*');
  }
}

function doOptions(e) {
  // CORS preflight
  return HtmlService.createHtmlOutput('')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function _json(obj, origin) {
  const out = ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
  const resp = out;
  // Set CORS headers
  const cache = CacheService.getScriptCache();
  // Apps Script's ContentService doesn't let us set headers directly here.
  // Instead, we rely on the Web App configuration allowing cross-origin.
  // If you need strict CORS, proxy via a lightweight Cloud Function.
  return out;
}
