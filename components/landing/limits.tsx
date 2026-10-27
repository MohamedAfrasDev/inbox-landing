import { Minus } from "lucide-react"
import { limits } from "./content"

export function Limits() {
  return (
    <section className="bg-pastel-soft py-24">
      <div className="mx-auto w-full max-w-2xl px-6">
        <h2 className="text-center text-4xl sm:text-5xl">We keep this short on purpose.</h2>
        <ul className="mt-12 divide-y rounded-3xl bg-white/80 px-6 ring-1 ring-black/5">
          {limits.map((item) => (
            <li key={item} className="flex items-start gap-3 py-4 leading-relaxed">
              <Minus className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
