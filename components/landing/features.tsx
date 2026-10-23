import { Bell, Inbox, Languages, ListOrdered, PenLine, Tags } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { features } from "./content"

const icons = {
  list: ListOrdered,
  inbox: Inbox,
  tags: Tags,
  pen: PenLine,
  languages: Languages,
  bell: Bell,
}

export function Features() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-4xl sm:text-5xl">
          An inbox built for sellers who close deals in chat.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Every conversation in one place, the important ones first, and a reply
          ready to go. You stay in charge of what gets sent.
        </p>
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon, title, body }) => {
          const Icon = icons[icon]
          return (
            <Card key={title} className="border-border/70 shadow-none">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="font-sans text-base font-medium">{title}</h3>
              </CardHeader>
              <CardContent className="leading-relaxed text-muted-foreground">
                {body}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
