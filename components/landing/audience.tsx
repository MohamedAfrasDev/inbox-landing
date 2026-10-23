import { Badge } from "@/components/ui/badge"
import { audiences } from "./content"

export function Audience() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
      <h2 className="text-balance text-4xl sm:text-5xl">
        Made for sellers who sell in the DMs.
      </h2>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        If most of your sales start with “price?” or “available?” in a chat, this is
        for you.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {audiences.map((a) => (
          <Badge
            key={a}
            variant="secondary"
            className="h-auto rounded-full px-4 py-2 text-sm font-normal"
          >
            {a}
          </Badge>
        ))}
      </div>
    </section>
  )
}
