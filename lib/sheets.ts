import type { DetailsEntry, Source } from "@/lib/waitlist"

export type SheetResult = { ok: true } | { ok: false }

type Payload =
  | ({ type: "signup"; email: string } & Source)
  | ({ type: "details"; email: string } & DetailsEntry)

// Posts one event to the Google Apps Script web app that owns the sheet (see
// docs/google-sheets.md). Without settings, development logs the event so the form
// still works locally; production reports failure instead of losing a sign-up.
async function post(payload: Payload): Promise<SheetResult> {
  const url = process.env.SHEETS_WEBHOOK_URL
  const token = process.env.SHEETS_WEBHOOK_TOKEN
  if (!url || !token) {
    if (process.env.NODE_ENV === "production") {
      console.error("Sheets is not configured: set SHEETS_WEBHOOK_URL and SHEETS_WEBHOOK_TOKEN.")
      return { ok: false }
    }
    console.info("[sheets disabled]", JSON.stringify(payload))
    return { ok: true }
  }
  try {
    // Apps Script answers a POST with a redirect to the result, which fetch follows.
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...payload, token }),
      signal: AbortSignal.timeout(15_000),
    })
    const body = (await response.json()) as { ok?: boolean; error?: string }
    if (!response.ok || !body.ok) {
      console.error("Sheets rejected the request:", response.status, body.error)
      return { ok: false }
    }
    return { ok: true }
  } catch (error) {
    console.error("Saving to Sheets failed:", error)
    return { ok: false }
  }
}

export function saveSignup(email: string, source: Source): Promise<SheetResult> {
  return post({ type: "signup", email, ...source })
}

export function saveDetails(email: string, details: DetailsEntry): Promise<SheetResult> {
  return post({ type: "details", email, ...details })
}
