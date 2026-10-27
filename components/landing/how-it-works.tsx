import { Eye, EyeOff } from "lucide-react"
import { steps } from "./content"
import { SampleTag } from "./shot"
import { Eyebrow } from "./eyebrow"

function Chip({ kind }: { kind: "Public" | "Private" }) {
  const Icon = kind === "Public" ? Eye : EyeOff
  return (
    <span
      className={
        kind === "Public"
          ? "inline-flex items-center gap-1 rounded-full bg-[oklch(0.95_0.05_155)] px-2.5 py-1 text-xs text-[oklch(0.4_0.1_155)]"
          : "inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
      }
    >
      <Icon className="size-3" aria-hidden /> {kind}
    </span>
  )
}

const row = "flex items-center justify-between rounded-xl bg-muted/70 px-3 py-2 text-sm"

// UI-10. A small setup stepper drawn with the same tokens as the product screens.
function StepPreview({ index }: { index: number }) {
  if (index === 0) {
    return (
      <ul className="space-y-2">
        {["Messenger", "Instagram", "WhatsApp"].map((app, i) => (
          <li key={app} className={row}>
            {app}
            <span className="text-xs text-muted-foreground">
              {i < 2 ? "Connect" : "Guided setup"}
            </span>
          </li>
        ))}
      </ul>
    )
  }
  if (index === 1) {
    return (
      <div className="space-y-2">
        {(
          [
            ["Price", "Public"],
            ["Sizes", "Public"],
            ["Cost price", "Private"],
          ] as const
        ).map(([name, kind]) => (
          <div key={name} className={row}>
            {name}
            <Chip kind={kind} />
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="space-y-2">
      <div className={`${row} text-muted-foreground`}>What did you pay for the linen set?</div>
      <div className="flex items-center justify-between rounded-xl bg-primary px-3 py-2 text-sm text-primary-foreground">
        Assistant is on
        <span className="text-xs opacity-80">After hours only</span>
      </div>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto w-full max-w-5xl scroll-mt-24 px-6 py-24">
      <Eyebrow center>Setup</Eyebrow>
        <h2 className="text-center text-4xl sm:text-5xl">Set it up in three steps.</h2>
      <ol className="mt-14 grid gap-5 md:grid-cols-3">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="flex flex-col rounded-3xl bg-white p-6 shadow-[0_30px_70px_-45px_oklch(0.4_0.12_285/0.5)] ring-1 ring-black/5"
          >
            <span className="text-4xl font-medium tracking-tight text-brand/60">{i + 1}</span>
            <h3 className="mt-2 text-2xl">{step.title}</h3>
            <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{step.body}</p>
            <div className="mt-6">
              <StepPreview index={i} />
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-muted-foreground">
        Our target is about ten minutes for the first two steps. We will report the real
        time once owners try it. <SampleTag />
      </p>
    </section>
  )
}
