import { WaitlistForm } from "./waitlist-form"

export function Waitlist() {
  return (
    <section id="waitlist" className="bg-pastel relative scroll-mt-8 py-28">
      <div className="mx-auto w-full max-w-lg px-6 text-center">
        <h2 className="text-balance text-4xl sm:text-5xl">Be one of the first to try it.</h2>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          Tell us how you sell and we will let you in when your spot opens. No card
          needed.
        </p>
        <div className="relative mt-10 rounded-3xl bg-white/90 p-6 text-left shadow-[0_40px_90px_-40px_oklch(0.4_0.12_285/0.5)] ring-1 ring-black/5 backdrop-blur sm:p-8">
          <WaitlistForm />
        </div>
      </div>
    </section>
  )
}
