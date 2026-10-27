import { jobs } from "./content"
import { Caption, Crop } from "./shot"
import { Eyebrow } from "./eyebrow"

const tilts = ["-1.5deg", "1deg", "-1deg"]

export function ThreeJobs() {
  return (
    <section className="bg-pastel-soft py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Eyebrow center>What it does</Eyebrow>
        <h2 className="text-center text-4xl sm:text-5xl">One tool, three jobs.</h2>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {jobs.map((job, i) => (
            <article
              key={job.title}
              className="flex flex-col rounded-3xl bg-white/70 p-5 ring-1 ring-black/5 backdrop-blur"
            >
              <div className="rounded-2xl bg-gradient-to-br from-[oklch(0.95_0.04_290)] to-[oklch(0.96_0.03_230)] p-4">
                <Crop screen="messages" region={job.crop} alt={job.alt} tilt={tilts[i]} />
              </div>
              <Caption>{job.caption} · sample data</Caption>
              <h3 className="mt-4 text-2xl">{job.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{job.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
