import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { joinWaitlist, saveWaitlistDetails } from "@/app/actions"

const URL = "https://script.google.com/macros/s/test/exec"
const fetchMock = vi.fn()

function reply(body: unknown, status = 200) {
  return Promise.resolve(new Response(JSON.stringify(body), { status }))
}

function sent(call = 0) {
  return JSON.parse(fetchMock.mock.calls[call][1].body as string)
}

describe("waitlist storage in Google Sheets", () => {
  beforeEach(() => {
    fetchMock.mockReset().mockImplementation(() => reply({ ok: true }))
    vi.stubGlobal("fetch", fetchMock)
    vi.stubEnv("SHEETS_WEBHOOK_URL", URL)
    vi.stubEnv("SHEETS_WEBHOOK_TOKEN", "secret-token")
  })
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it("posts the normalised email, UTM tags and token to the web app", async () => {
    const result = await joinWaitlist({
      email: " Nimali@Example.com ",
      source: { utm_source: "fb-group", utm_medium: "post", utm_campaign: "launch" },
      trap: "",
    })
    expect(result).toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][0]).toBe(URL)
    expect(sent()).toEqual({
      type: "signup",
      email: "nimali@example.com",
      utm_source: "fb-group",
      utm_medium: "post",
      utm_campaign: "launch",
      token: "secret-token",
    })
  })

  it("drops unknown or oversized source fields from the client", async () => {
    await joinWaitlist({
      email: "a@b.co",
      source: { utm_source: "x".repeat(500), admin: "yes" } as never,
      trap: "",
    })
    const body = sent()
    expect(body.utm_source).toHaveLength(100)
    expect(body).not.toHaveProperty("admin")
  })

  it("fails the join when the sheet cannot be reached", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    fetchMock.mockRejectedValueOnce(new Error("network"))
    const result = await joinWaitlist({ email: "a@b.co", source: {}, trap: "" })
    expect(result.ok).toBe(false)
  })

  it("fails the join when the web app rejects the request", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    fetchMock.mockImplementationOnce(() => reply({ ok: false, error: "unauthorized" }))
    const result = await joinWaitlist({ email: "a@b.co", source: {}, trap: "" })
    expect(result.ok).toBe(false)
  })

  it("sends nothing for a bad email or a filled honeypot", async () => {
    expect((await joinWaitlist({ email: "nope", source: {}, trap: "" })).ok).toBe(false)
    expect(await joinWaitlist({ email: "a@b.co", source: {}, trap: "x" })).toEqual({ ok: true })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it("reports missing settings as a failure in production", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    vi.stubEnv("NODE_ENV", "production")
    vi.stubEnv("SHEETS_WEBHOOK_URL", "")
    const result = await joinWaitlist({ email: "a@b.co", source: {}, trap: "" })
    expect(result.ok).toBe(false)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it("logs instead of saving when unconfigured in development", async () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {})
    vi.stubEnv("SHEETS_WEBHOOK_URL", "")
    const result = await joinWaitlist({ email: "a@b.co", source: {}, trap: "" })
    expect(result).toEqual({ ok: true })
    expect(fetchMock).not.toHaveBeenCalled()
    expect(info).toHaveBeenCalled()
  })

  it("sends the step 2 answers for the same email", async () => {
    const result = await saveWaitlistDetails({
      email: "A@b.co",
      sells: "clothing",
      channel: "instagram",
      whatsapp: "077 123 4567",
    })
    expect(result).toEqual({ ok: true })
    expect(sent()).toEqual({
      type: "details",
      email: "a@b.co",
      sells: "clothing",
      channel: "instagram",
      whatsapp: "+94771234567",
      token: "secret-token",
    })
  })

  it("returns a form-level failure when step 2 cannot be saved", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    fetchMock.mockRejectedValueOnce(new Error("network"))
    const result = await saveWaitlistDetails({
      email: "a@b.co",
      sells: "",
      channel: "equal",
      whatsapp: "",
    })
    expect(result).toEqual({ ok: false, errors: {} })
  })
})
