# Waitlist sign-ups in Google Sheets

Sign-ups are written to a Google Sheet by a small Apps Script web app. The site posts
to it from the server, so the sheet and the script stay private to your Google account.

## 1. Create the sheet and script

1. Create a new Google Sheet (any name).
2. Open **Extensions → Apps Script** and replace the code with the script below.
3. In the script editor click the gear icon (**Project Settings**) in the left sidebar. Under
   **Script Properties** click **Add script property**, enter `TOKEN` as the property and a
   long random string as the value (for example the output of `openssl rand -hex 24`), then
   click **Save script properties**. Keep a copy of the value. If you cannot find that
   section, set it from code instead: add this function, type your value in, run it once from
   the editor, then delete the function so the value is not left in the script.

   ```js
   function setToken() {
     PropertiesService.getScriptProperties().setProperty("TOKEN", "paste-your-long-random-value")
   }
   ```
4. Click **Deploy → New deployment → Web app**. Set **Execute as: Me** and
   **Who has access: Anyone**, then deploy and authorise it when asked.
5. Copy the **Web app URL**.

## 2. Configure the site

Add these to `.env.local` (and to your host's environment variables for production):

```
SHEETS_WEBHOOK_URL=<the Web app URL>
SHEETS_WEBHOOK_TOKEN=<the same value as the TOKEN script property>
```

The token is what protects the sheet: the web app is public, but ignores any request
that does not carry it. If you redeploy the script as a new version, keep the same URL
by choosing **Manage deployments → Edit → New version**. Script code changes only go
live after a new version is deployed; script properties apply immediately.

## Troubleshooting

The server log shows the reason the script gave:

- `TOKEN script property is not set`: add the `TOKEN` property (Project Settings → Script
  Properties). The name must be exactly `TOKEN`.
- `token does not match SHEETS_WEBHOOK_TOKEN`: the property value and the environment
  variable differ. Copy one into the other, then restart `next dev` so it reloads
  `.env.local`.
- The old reply `unauthorized` means the deployed script is still the earlier version of
  the code. Redeploy it as a new version.

## What gets stored

One row per email, with these columns:

| Timestamp | Email | UTM source | UTM medium | UTM campaign | Step 2 done | Sells | Main app | WhatsApp |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Step 1 adds the row. Step 2 fills in the last four columns on the same row. Signing up
twice with the same email does not add a second row. Columns B to I are stored as plain
text, so values such as `=SUM(...)` or `+9477...` are never treated as formulas.

## Script

```js
const SHEET_NAME = "Waitlist"
const HEADERS = [
  "Timestamp", "Email", "UTM source", "UTM medium", "UTM campaign",
  "Step 2 done", "Sells", "Main app", "WhatsApp",
]

function doPost(e) {
  const lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    const body = JSON.parse(e.postData.contents)
    const token = PropertiesService.getScriptProperties().getProperty("TOKEN")
    if (!token) return reply({ ok: false, error: "TOKEN script property is not set" })
    if (String(body.token || "").trim() !== token.trim()) {
      return reply({ ok: false, error: "token does not match SHEETS_WEBHOOK_TOKEN" })
    }

    const email = String(body.email || "").trim().toLowerCase()
    if (!email) return reply({ ok: false, error: "missing email" })

    const sheet = getSheet()
    const row = findRow(sheet, email)

    if (body.type === "signup") {
      if (!row) {
        sheet.appendRow([
          new Date(), email,
          body.utm_source || "", body.utm_medium || "", body.utm_campaign || "",
          "no", "", "", "",
        ])
      }
      return reply({ ok: true })
    }

    if (body.type === "details") {
      if (!row) return reply({ ok: false, error: "unknown email" })
      sheet.getRange(row, 6, 1, 4).setValues([
        ["yes", body.sells || "", body.channel || "", body.whatsapp || ""],
      ])
      return reply({ ok: true })
    }

    return reply({ ok: false, error: "unknown type" })
  } catch (error) {
    return reply({ ok: false, error: String(error) })
  } finally {
    lock.releaseLock()
  }
}

function getSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = book.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME)
    sheet.getRange("B:I").setNumberFormat("@")
    sheet.appendRow(HEADERS)
    sheet.setFrozenRows(1)
  }
  return sheet
}

function findRow(sheet, email) {
  const last = sheet.getLastRow()
  if (last < 2) return 0
  const emails = sheet.getRange(2, 2, last - 1, 1).getValues()
  for (let i = 0; i < emails.length; i++) {
    if (String(emails[i][0]).toLowerCase() === email) return i + 2
  }
  return 0
}

function reply(object) {
  return ContentService.createTextOutput(JSON.stringify(object))
    .setMimeType(ContentService.MimeType.JSON)
}
```
