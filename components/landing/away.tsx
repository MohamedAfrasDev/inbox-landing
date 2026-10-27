import { JoinCta } from "./cta"
import { CustomerPhone } from "./scenes"
import { Caption, Shot } from "./shot"
import { Eyebrow } from "./eyebrow"

export function Away() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24">
      <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Eyebrow>While you are away</Eyebrow>
        <h2 className="text-balance text-4xl sm:text-5xl">
            When you cannot reply, it holds the customer.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            A customer asks about a dress at 9 PM. The assistant answers from the facts
            you gave it, such as price and delivery areas, tells the customer it is an AI
            assistant, and says the owner will confirm the rest. You get a short summary
            and a nudge. It never takes an order, never confirms stock it cannot see, and
            never promises a discount.
          </p>
          <div className="mt-8">
            <JoinCta />
          </div>
          <div className="mt-12 max-w-md">
            <Shot
              screen="arrives"
              tilt="-1deg"
              sizes="(min-width: 1024px) 420px, 100vw"
              alt="A bar chart of chats per hour, with after-hours bars highlighted in purple."
            />
            <Caption>Chats often arrive after hours. Sample data.</Caption>
          </div>
        </div>
        <div className="flex justify-center">
          <CustomerPhone tilt="2deg" />
        </div>
      </div>
    </section>
  )
}
