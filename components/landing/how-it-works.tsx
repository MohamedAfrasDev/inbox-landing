import { steps } from "./content"

export function HowItWorks() {
  return (
    <section className="bg-muted/60 py-24">
      <div className="mx-auto w-full max-w-5xl px-6">
        <h2 className="text-center text-4xl sm:text-5xl">
          Up and running in four steps
        </h2>
        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title}>
              <span className="font-heading text-4xl text-primary/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-sans text-lg font-medium">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
