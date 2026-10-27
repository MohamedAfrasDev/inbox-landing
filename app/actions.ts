"use server"

import { saveDetails, saveSignup } from "@/lib/sheets"
import {
  validateDetails,
  validateEmail,
  type DetailsErrors,
  type DetailsInput,
  type Source,
} from "@/lib/waitlist"

export type JoinResult = { ok: true } | { ok: false; error: string }
export type DetailsResponse = { ok: true } | { ok: false; errors: DetailsErrors }

const SOURCE_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const

// The client sends this, so trim it to the three known keys and a sane length.
function cleanSource(source: Source): Source {
  const clean: Source = {}
  for (const key of SOURCE_KEYS) {
    const value = source?.[key]
    if (typeof value === "string" && value) clean[key] = value.slice(0, 100)
  }
  return clean
}

// TODO: add a per-address rate limit before sending real traffic.
export async function joinWaitlist(input: {
  email: string
  source: Source
  trap: string
}): Promise<JoinResult> {
  // Hidden field: only bots fill it. Pretend it worked.
  if (input.trap) return { ok: true }
  const result = validateEmail(input.email)
  if (!result.ok) return result

  const saved = await saveSignup(result.email, cleanSource(input.source))
  if (!saved.ok) {
    return { ok: false, error: "We could not save your spot. Please try again." }
  }
  return { ok: true }
}

export async function saveWaitlistDetails(
  input: DetailsInput & { email: string },
): Promise<DetailsResponse> {
  const email = validateEmail(input.email)
  if (!email.ok) return { ok: false, errors: {} }
  const result = validateDetails(input)
  if (!result.ok) return result

  const saved = await saveDetails(email.email, result.data)
  if (!saved.ok) return { ok: false, errors: {} }
  return { ok: true }
}
