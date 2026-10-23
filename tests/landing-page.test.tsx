import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

vi.mock("@/app/actions", () => ({
  joinWaitlist: vi.fn(async () => ({ ok: true })),
}))

import Home from "@/app/page"

describe("landing page", () => {
  it("leads with the buyer-loss headline", () => {
    render(<Home />)
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /stop losing serious buyers in your dms/i,
      }),
    ).toBeInTheDocument()
  })

  it("has one call to action: every CTA points at the waitlist form", () => {
    render(<Home />)
    const ctas = screen.getAllByRole("link", { name: /join the waitlist/i })
    expect(ctas.length).toBeGreaterThanOrEqual(2)
    for (const cta of ctas) expect(cta).toHaveAttribute("href", "#waitlist")
    expect(screen.queryByText(/get early access/i)).not.toBeInTheDocument()
  })

  it("covers problem, features, how it works, audience, control and FAQ", () => {
    render(<Home />)
    for (const name of [
      /selling in chat is messy/i,
      /built for sellers who close deals in chat/i,
      /up and running in four steps/i,
      /made for sellers who sell in the dms/i,
      /you stay in control/i,
      /frequently asked questions/i,
    ]) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument()
    }
  })

  it("lists all six feature outcomes", () => {
    render(<Home />)
    for (const name of [
      /know who to reply to first/i,
      /everything in one place/i,
      /spot orders, not noise/i,
      /reply in seconds, in your voice/i,
      /works the way sri lanka chats/i,
      /never drop a follow-up/i,
    ]) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument()
    }
  })

  it("makes no unsourced proof claims", () => {
    render(<Home />)
    expect(screen.queryByText(/testimonial/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/\d+\s?(%|x)\b/)).not.toBeInTheDocument()
  })
})

describe("waitlist form", () => {
  it("asks for exactly four fields", () => {
    render(<Home />)
    const form = screen.getByRole("form", { name: /join the waitlist/i })
    expect(within(form).getByLabelText(/^name/i)).toBeInTheDocument()
    expect(within(form).getByLabelText(/whatsapp number/i)).toBeInTheDocument()
    expect(
      within(form).getByLabelText(/business name or instagram handle/i),
    ).toBeInTheDocument()
    expect(within(form).getByLabelText(/main sales channel/i)).toBeInTheDocument()
  })

  it("shows errors and does not submit when fields are empty", async () => {
    const { joinWaitlist } = await import("@/app/actions")
    render(<Home />)
    await userEvent.click(within(screen.getByRole("form", { name: /join the waitlist/i })).getByRole("button", { name: /join the waitlist/i }))
    expect(await screen.findAllByRole("alert")).not.toHaveLength(0)
    expect(joinWaitlist).not.toHaveBeenCalled()
  })

  it("shows a confirmation after a valid submission", async () => {
    render(<Home />)
    await userEvent.type(screen.getByLabelText(/^name/i), "Nimali Perera")
    await userEvent.type(screen.getByLabelText(/whatsapp number/i), "0771234567")
    await userEvent.type(
      screen.getByLabelText(/business name or instagram handle/i),
      "@nimali.threads",
    )
    await userEvent.selectOptions(screen.getByLabelText(/main sales channel/i), "both")
    await userEvent.click(within(screen.getByRole("form", { name: /join the waitlist/i })).getByRole("button", { name: /join the waitlist/i }))
    expect(await screen.findByText(/you're on the list/i)).toBeInTheDocument()
  })
})
