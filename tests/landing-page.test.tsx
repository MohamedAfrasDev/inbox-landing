import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

vi.mock("@/app/actions", () => ({
  joinWaitlist: vi.fn(async () => ({ ok: true })),
  saveWaitlistDetails: vi.fn(async () => ({ ok: true })),
}))

import Home from "@/app/page"

describe("landing page", () => {
  it("leads with the buyer-loss headline", () => {
    render(<Home />)
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /stop losing buyers to unread messages/i,
      }),
    ).toBeInTheDocument()
  })

  it("has one call to action: every CTA points at the waitlist form", () => {
    render(<Home />)
    const ctas = screen.getAllByRole("link", { name: /join the waitlist/i })
    expect(ctas.length).toBeGreaterThanOrEqual(3)
    for (const cta of ctas) expect(cta).toHaveAttribute("href", "#waitlist")
    expect(screen.queryByText(/watch demo|contact sales|get early access/i)).not.toBeInTheDocument()
  })

  it("covers every section of the structure, in order", () => {
    render(<Home />)
    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)
    const expected = [
      /you boosted a post/i,
      /one tool, three jobs/i,
      /when you cannot reply/i,
      /you decide what it may say/i,
      /nothing happens in the dark/i,
      /which ad is leaking/i,
      /set it up in three steps/i,
      /we keep this short on purpose/i,
      /questions owners ask/i,
      /be one of the first to try it/i,
    ]
    let last = -1
    for (const pattern of expected) {
      const index = headings.findIndex((h) => pattern.test(h ?? ""))
      expect(index, String(pattern)).toBeGreaterThan(last)
      last = index
    }
  })

  it("links the nav to real sections", () => {
    const { container } = render(<Home />)
    for (const id of ["how", "control", "faq", "waitlist"]) {
      expect(container.querySelector(`#${id}`), id).not.toBeNull()
    }
  })

  it("labels every product screen as sample data and gives it alt text", () => {
    render(<Home />)
    for (const img of screen.getAllByRole("img")) {
      expect(img).toHaveAttribute("alt", expect.stringMatching(/\w/))
    }
    expect(screen.getAllByText(/sample data/i).length).toBeGreaterThanOrEqual(5)
  })

  it("makes no unsourced proof claims", () => {
    render(<Home />)
    expect(screen.queryByText(/testimonial/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/\d+\s?(%|x)\b/)).not.toBeInTheDocument()
    expect(screen.queryByText(/ai-powered|next-generation|revolutionise/i)).not.toBeInTheDocument()
  })

  it("has no unfinished placeholders", () => {
    const { container } = render(<Home />)
    expect(container.textContent).not.toMatch(/\[(product name|decide|write)/i)
  })
})

describe("waitlist form", () => {
  const form = () => screen.getByRole("form", { name: /join the waitlist/i })

  it("asks only for an email first", () => {
    render(<Home />)
    expect(within(form()).getByLabelText(/^email/i)).toBeInTheDocument()
    expect(within(form()).queryByLabelText(/whatsapp/i)).not.toBeInTheDocument()
  })

  it("shows an error and does not submit an invalid email", async () => {
    const { joinWaitlist } = await import("@/app/actions")
    render(<Home />)
    await userEvent.type(within(form()).getByLabelText(/^email/i), "not-an-email")
    await userEvent.click(within(form()).getByRole("button", { name: /join the waitlist/i }))
    expect(await screen.findByRole("alert")).toBeInTheDocument()
    expect(joinWaitlist).not.toHaveBeenCalled()
  })

  it("confirms the join, then offers three optional questions", async () => {
    const { saveWaitlistDetails } = await import("@/app/actions")
    render(<Home />)
    await userEvent.type(within(form()).getByLabelText(/^email/i), "nimali@example.com")
    await userEvent.click(within(form()).getByRole("button", { name: /join the waitlist/i }))
    expect(await screen.findByText(/you're on the list/i)).toBeInTheDocument()
    expect(screen.getByText(/nimali@example\.com/)).toBeInTheDocument()

    await userEvent.click(screen.getByRole("button", { name: "Instagram" }))
    await userEvent.click(screen.getByRole("button", { name: /send answers/i }))
    expect(await screen.findByText(/that helps/i)).toBeInTheDocument()
    expect(saveWaitlistDetails).toHaveBeenCalledWith(
      expect.objectContaining({ email: "nimali@example.com", channel: "instagram" }),
    )
  })
})
