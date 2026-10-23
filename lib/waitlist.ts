export const CHANNELS = ["whatsapp", "instagram", "both"] as const
export type Channel = (typeof CHANNELS)[number]

export type WaitlistInput = {
  name: string
  whatsapp: string
  business: string
  channel: string
}

export type WaitlistEntry = {
  name: string
  whatsapp: string
  business: string
  channel: Channel
}

export type WaitlistErrors = Partial<Record<keyof WaitlistInput, string>>

export type ValidationResult =
  | { ok: true; data: WaitlistEntry }
  | { ok: false; errors: WaitlistErrors }

// Sri Lankan numbers: 0XXXXXXXXX or +94XXXXXXXXX (9 digits after the prefix).
function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/[\s\-()]/g, "")
  const match = digits.match(/^(?:\+94|0)(\d{9})$/)
  return match ? `+94${match[1]}` : null
}

export function validateWaitlist(input: WaitlistInput): ValidationResult {
  const errors: WaitlistErrors = {}
  const name = input.name.trim()
  const business = input.business.trim()
  const whatsapp = normalisePhone(input.whatsapp)
  const channel = CHANNELS.find((c) => c === input.channel)

  if (!name) errors.name = "Please tell us your name."
  if (!whatsapp) errors.whatsapp = "Enter a Sri Lankan number, like 077 123 4567."
  if (!business) errors.business = "Add your business name or Instagram handle."
  if (!channel) errors.channel = "Choose where most of your sales happen."

  if (errors.name || errors.whatsapp || errors.business || errors.channel) {
    return { ok: false, errors }
  }
  return {
    ok: true,
    data: { name, whatsapp: whatsapp!, business, channel: channel! },
  }
}
