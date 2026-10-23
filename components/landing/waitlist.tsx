import { WaitlistForm } from "./waitlist-form"

export function Waitlist() {
  return (
    <section id="waitlist" className="scroll-mt-8 bg-muted/60 py-24">
      <div className="mx-auto w-full max-w-md px-6 text-center">
        <h2 className="text-balance text-4xl sm:text-5xl">
          Join the first group of sellers.
        </h2>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          We’re letting in a small group of Sri Lankan sellers first. Early members
          get priority setup and help shape what we build next.
        </p>
        <div className="mt-10 rounded-2xl border bg-card p-6 sm:p-8">
          <WaitlistForm />
        </div>
      </div>
    </section>
  )
}
