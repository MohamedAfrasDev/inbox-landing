import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const sendMail = vi.fn()
vi.mock("nodemailer", () => ({
  default: { createTransport: vi.fn(() => ({ sendMail })) },
}))

import { joinWaitlist, saveWaitlistDetails } from "@/app/actions"

const ENV = {
  SMTP_HOST: "smtp.test",
  SMTP_PORT: "587",
  SMTP_USER: "user",
  SMTP_PASS: "pass",
  MAIL_FROM: "Inbox <hello@test.dev>",
  WAITLIST_NOTIFY_EMAIL: "team@test.dev",
}

describe("waitlist emails", () => {
  beforeEach(() => {
    sendMail.mockReset().mockResolvedValue({})
    for (const [k, v] of Object.entries(ENV)) vi.stubEnv(k, v)
  })
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it("notifies the team with the UTM source, then welcomes the person", async () => {
    const result = await joinWaitlist({
      email: "Nimali@Example.com",
      source: { utm_source: "fb-group", utm_medium: "post" },
      trap: "",
    })
    expect(result).toEqual({ ok: true })
    expect(sendMail).toHaveBeenCalledTimes(2)
    const [team, welcome] = sendMail.mock.calls.map((c) => c[0])
    expect(team).toMatchObject({ to: "team@test.dev", from: ENV.MAIL_FROM })
    expect(team.text).toContain("nimali@example.com")
    expect(team.text).toContain("fb-group")
    expect(welcome).toMatchObject({ to: "nimali@example.com" })
  })

  it("fails the join when the team notification cannot be sent", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    sendMail.mockRejectedValueOnce(new Error("smtp down"))
    const result = await joinWaitlist({ email: "a@b.co", source: {}, trap: "" })
    expect(result.ok).toBe(false)
    expect(sendMail).toHaveBeenCalledTimes(1)
  })

  it("still succeeds when only the welcome email fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    sendMail.mockResolvedValueOnce({}).mockRejectedValueOnce(new Error("bounce"))
    const result = await joinWaitlist({ email: "a@b.co", source: {}, trap: "" })
    expect(result).toEqual({ ok: true })
  })

  it("sends nothing for a bad email or a filled honeypot", async () => {
    expect((await joinWaitlist({ email: "nope", source: {}, trap: "" })).ok).toBe(false)
    expect(await joinWaitlist({ email: "a@b.co", source: {}, trap: "x" })).toEqual({ ok: true })
    expect(sendMail).not.toHaveBeenCalled()
  })

  it("reports a missing configuration as a failure in production", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    vi.stubEnv("NODE_ENV", "production")
    vi.stubEnv("SMTP_HOST", "")
    const result = await joinWaitlist({ email: "a@b.co", source: {}, trap: "" })
    expect(result.ok).toBe(false)
    expect(sendMail).not.toHaveBeenCalled()
  })

  it("logs instead of sending when unconfigured in development", async () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {})
    vi.stubEnv("SMTP_HOST", "")
    const result = await joinWaitlist({ email: "a@b.co", source: {}, trap: "" })
    expect(result).toEqual({ ok: true })
    expect(sendMail).not.toHaveBeenCalled()
    expect(info).toHaveBeenCalled()
  })

  it("emails the step 2 answers to the team", async () => {
    const result = await saveWaitlistDetails({
      email: "a@b.co",
      sells: "clothing",
      channel: "instagram",
      whatsapp: "077 123 4567",
    })
    expect(result).toEqual({ ok: true })
    const mail = sendMail.mock.calls[0][0]
    expect(mail.text).toContain("clothing")
    expect(mail.text).toContain("+94771234567")
  })

  it("escapes markup in the HTML body", async () => {
    await joinWaitlist({
      email: "a@b.co",
      source: { utm_source: "<script>x</script>" },
      trap: "",
    })
    expect(sendMail.mock.calls[0][0].html).not.toContain("<script>")
  })
})
