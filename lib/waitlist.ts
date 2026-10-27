export const SELLS = ["clothing", "beauty", "gifts", "food", "home goods", "other"] as const
export const CHANNELS = ["messenger", "instagram", "whatsapp", "equal"] as const

export type Sells = (typeof SELLS)[number]
export type Channel = (typeof CHANNELS)[number]

export type Source = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export type EmailResult = { ok: true; email: string } | { ok: false; error: string }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEmail(raw: string): EmailResult {
  const email = raw.trim().toLowerCase()
  if (!EMAIL.test(email)) return { ok: false, error: "Enter an email we can reach you on." }
  return { ok: true, email }
}

export type DetailsInput = { sells: string; channel: string; whatsapp: string }
export type DetailsErrors = Partial<Record<keyof DetailsInput, string>>
export type DetailsEntry = { sells?: Sells; channel?: Channel; whatsapp?: string }
export type DetailsResult =
  | { ok: true; data: DetailsEntry }
  | { ok: false; errors: DetailsErrors }

// Sri Lankan numbers: 0XXXXXXXXX or +94XXXXXXXXX (9 digits after the prefix).
function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/[\s\-()]/g, "")
  const match = digits.match(/^(?:\+94|0)(\d{9})$/)
  return match ? `+94${match[1]}` : null
}

// Every step-2 field is optional, but a value that is given must be valid.
export function validateDetails(input: DetailsInput): DetailsResult {
  const errors: DetailsErrors = {}
  const data: DetailsEntry = {}

  if (input.sells) {
    const sells = SELLS.find((s) => s === input.sells)
    if (sells) data.sells = sells
    else errors.sells = "Choose one of the options."
  }
  if (input.channel) {
    const channel = CHANNELS.find((c) => c === input.channel)
    if (channel) data.channel = channel
    else errors.channel = "Choose one of the options."
  }
  if (input.whatsapp.trim()) {
    const whatsapp = normalisePhone(input.whatsapp)
    if (whatsapp) data.whatsapp = whatsapp
    else errors.whatsapp = "Enter a Sri Lankan number, like 077 123 4567."
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors }
  return { ok: true, data }
}
