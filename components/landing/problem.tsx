import { painPoints } from "./content"

export function Problem() {
  return (
    <section className="bg-muted/60 py-24">
      <div className="mx-auto w-full max-w-3xl px-6">
        <h2 className="text-4xl sm:text-5xl">Selling in chat is messy.</h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          A real buyer messages on WhatsApp while you’re busy with spam on Instagram.
          You reply once, get distracted, and forget to follow up. By the time you
          answer, they’ve bought from someone else.
        </p>
        <ul className="mt-10 space-y-4">
          {painPoints.map((point) => (
            <li
              key={point}
              className="rounded-xl border bg-card px-5 py-4 leading-relaxed"
            >
              {point}
            </li>
          ))}
        </ul>
        <p className="mt-10 font-heading text-2xl text-primary">
          Every missed reply is an order that went to someone else.
        </p>
      </div>
    </section>
  )
}
