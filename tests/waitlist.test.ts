import { describe, expect, it } from "vitest"
import { validateDetails, validateEmail } from "@/lib/waitlist"

describe("validateEmail", () => {
  it("accepts and normalises a valid email", () => {
    expect(validateEmail("  Nimali@Example.com ")).toEqual({
      ok: true,
      email: "nimali@example.com",
    })
  })

  it.each(["", "nimali", "nimali@", "a@b", "a b@c.com"])("rejects %j", (bad) => {
    expect(validateEmail(bad).ok).toBe(false)
  })
})

describe("validateDetails", () => {
  const empty = { sells: "", channel: "", whatsapp: "" }

  it("accepts all fields empty, since step 2 is optional", () => {
    expect(validateDetails(empty)).toEqual({ ok: true, data: {} })
  })

  it("accepts a complete, valid entry and normalises the number", () => {
    const result = validateDetails({
      sells: "clothing",
      channel: "equal",
      whatsapp: "077 123 4567",
    })
    expect(result).toEqual({
      ok: true,
      data: { sells: "clothing", channel: "equal", whatsapp: "+94771234567" },
    })
  })

  it("accepts a number already in +94 format", () => {
    expect(validateDetails({ ...empty, whatsapp: "+94 77 123 4567" }).ok).toBe(true)
  })

  it("rejects a number that is not a Sri Lankan number", () => {
    const result = validateDetails({ ...empty, whatsapp: "12345" })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.errors.whatsapp).toBeDefined()
  })

  it("rejects values outside the dropdowns", () => {
    const result = validateDetails({ ...empty, sells: "cars", channel: "telegram" })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.sells).toBeDefined()
      expect(result.errors.channel).toBeDefined()
    }
  })
})
