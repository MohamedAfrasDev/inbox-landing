import { ShieldCheck } from "lucide-react"

export function Control() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-3xl rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16">
        <ShieldCheck className="mx-auto size-8 opacity-80" aria-hidden />
        <h2 className="mt-6 text-4xl sm:text-5xl">You stay in control. Always.</h2>
        <p className="mt-6 text-lg leading-relaxed opacity-85">
          Inbox never sends a message on its own. It drafts, you decide. The aim isn’t
          to replace you. It’s to make sure you never miss the customer who was about
          to buy.
        </p>
      </div>
    </section>
  )
}
