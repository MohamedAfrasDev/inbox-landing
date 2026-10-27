"use server"

import {
  validateDetails,
  validateEmail,
  type DetailsErrors,
  type DetailsInput,
  type Source,
} from "@/lib/waitlist"

export type JoinResult = { ok: true } | { ok: false; error: string }
export type DetailsResponse = { ok: true } | { ok: false; errors: DetailsErrors }

// TODO: persist the email with `source` and a timestamp (e.g. Supabase) before any
// traffic is sent, and add a per-address rate limit. Nothing is stored yet.
export async function joinWaitlist(input: {
  email: string
  source: Source
  trap: string
}): Promise<JoinResult> {
  // Hidden field: only bots fill it. Pretend it worked.
  if (input.trap) return { ok: true }
  const result = validateEmail(input.email)
  if (!result.ok) return result
  return { ok: true }
}

// TODO: attach these answers to the step-1 row and mark step 2 as completed.
export async function saveWaitlistDetails(
  input: DetailsInput & { email: string },
): Promise<DetailsResponse> {
  const email = validateEmail(input.email)
  if (!email.ok) return { ok: false, errors: {} }
  const result = validateDetails(input)
  if (!result.ok) return result
  return { ok: true }
}
