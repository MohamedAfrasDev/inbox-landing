import { JoinCta } from "./cta"

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 pb-24 pt-16 text-center sm:pt-24">
      <h1 className="text-balance text-5xl leading-[1.05] sm:text-7xl">
        Stop losing serious buyers in your DMs.
      </h1>
      <p className="mx-auto mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
        Bring your WhatsApp and Instagram chats into one inbox. See who’s ready to
        buy, get a reply drafted in your style (Sinhala, Tamil or English), and send
        it with one tap.
      </p>
      <div className="mt-10 flex flex-col items-center gap-3">
        <JoinCta />
        <p className="text-sm text-muted-foreground">
          Built for Sri Lankan sellers. Early members get priority setup.
        </p>
      </div>
    </section>
  )
}
