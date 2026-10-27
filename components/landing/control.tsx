import { Eye, FlaskConical, Moon } from "lucide-react"
import { controlPoints } from "./content"
import { Caption, Shot } from "./shot"
import { Eyebrow } from "./eyebrow"

const icons = { eye: Eye, moon: Moon, flask: FlaskConical }

export function Control() {
  return (
    <section id="control" className="bg-pastel-soft scroll-mt-24 py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Eyebrow center>Control</Eyebrow>
        <h2 className="text-center text-4xl sm:text-5xl">You decide what it may say.</h2>
        <ul className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
          {controlPoints.map(({ icon, text }) => {
            const Icon = icons[icon]
            return (
              <li
                key={text}
                className="rounded-2xl bg-white/80 p-5 leading-relaxed ring-1 ring-black/5"
              >
                <span className="mb-3 grid size-9 place-items-center rounded-full bg-brand-soft text-brand">
                  <Icon className="size-4" aria-hidden />
                </span>
                {text}
              </li>
            )
          })}
        </ul>
        <div className="mx-auto mt-14 max-w-5xl">
          <Shot
            screen="knowledge-base"
            tilt="0.6deg"
            alt="The Knowledge Base: product columns marked Public or Private, and a Test it panel that blocks cost price and supplier."
          />
          <Caption className="text-center">You choose what it can say. Sample data.</Caption>
        </div>
      </div>
    </section>
  )
}
