import { describe, expect, it } from "vitest"
import { validateWaitlist } from "@/lib/waitlist"

const valid = {
  name: "Nimali Perera",
  whatsapp: "077 123 4567",
  business: "@nimali.threads",
  channel: "both",
}

describe("validateWaitlist", () => {
  it("accepts a complete, valid entry", () => {
    const result = validateWaitlist(valid)
    expect(result.ok).toBe(true)
  })

  it("requires a name", () => {
    const result = validateWaitlist({ ...valid, name: "  " })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.errors.name).toBeDefined()
  })

  it("normalises a local Sri Lankan number to +94 format", () => {
    const result = validateWaitlist(valid)
    if (result.ok) expect(result.data.whatsapp).toBe("+94771234567")
  })

  it("accepts a number already in +94 format", () => {
    const result = validateWaitlist({ ...valid, whatsapp: "+94 77 123 4567" })
    expect(result.ok).toBe(true)
  })

  it("rejects a number that is not a Sri Lankan number", () => {
    const result = validateWaitlist({ ...valid, whatsapp: "12345" })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.errors.whatsapp).toBeDefined()
  })

  it("requires a business name or Instagram handle", () => {
    const result = validateWaitlist({ ...valid, business: "" })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.errors.business).toBeDefined()
  })

  it("rejects an unknown sales channel", () => {
    const result = validateWaitlist({ ...valid, channel: "telegram" })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.errors.channel).toBeDefined()
  })
})
