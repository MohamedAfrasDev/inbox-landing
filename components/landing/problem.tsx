import { Clock, Filter, Layers } from "lucide-react";
import { problemPoints } from "./content";
import { AdLeakScene } from "./scenes";
import { Eyebrow } from "./eyebrow";

const icons = { layers: Layers, filter: Filter, clock: Clock };

export function Problem() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 pb-24 pt-44 md:pt-52">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="text-balance text-4xl sm:text-5xl">
            You boosted a post. The enquiry went somewhere you did not look.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              You put your WhatsApp number on a boosted Facebook post. Some
              people message on WhatsApp. Others message on Messenger, where
              nobody is watching. By the time you see it, they have bought from
              someone else.
            </p>
            <p>
              Meanwhile one spam message has your attention on WhatsApp while a
              real buyer waits on Instagram. You did not ignore them. You just
              could not tell who mattered.
            </p>
          </div>
          <ul className="mt-7 space-y-3">
            {problemPoints.map(({ icon, text }) => {
              const Icon = icons[icon];
              return (
                <li key={text} className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-brand-soft text-brand">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="font-medium">{text}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <AdLeakScene />
      </div>
    </section>
  );
}
