"use server"

import { validateWaitlist, type WaitlistErrors, type WaitlistInput } from "@/lib/waitlist"

export type JoinWaitlistResult = { ok: true } | { ok: false; errors: WaitlistErrors }

// TODO: persist `result.data` (e.g. Supabase table) before launch. Nothing is stored yet.
export async function joinWaitlist(input: WaitlistInput): Promise<JoinWaitlistResult> {
  const result = validateWaitlist(input)
  if (!result.ok) return result
  return { ok: true }
}
