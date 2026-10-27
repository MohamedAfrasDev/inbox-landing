import { Bell, Camera, MessageCircle, Megaphone, Phone, Sparkles } from "lucide-react"
import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { SampleTag } from "./shot"

// UI-6. The customer's side of a chat. Built in code from the sample shop used in the
// product screens, because the product has no customer-facing screen to export.
export function CustomerPhone({
  tilt = "0deg",
  className,
}: {
  tilt?: string
  className?: string
}) {
  return (
    <figure
      style={{ "--tilt": tilt } as CSSProperties}
      className={cn("w-64 rotate-(--tilt) sm:w-72", className)}
    >
      <div className="rounded-[2.4rem] bg-primary p-2 shadow-[0_40px_80px_-30px_oklch(0.3_0.1_270/0.6)]">
        <div className="overflow-hidden rounded-[2rem] bg-white">
          <div className="flex items-center gap-2.5 bg-[oklch(0.96_0.04_160)] px-4 pb-3 pt-5">
            <span className="grid size-8 place-items-center rounded-full bg-[oklch(0.62_0.14_155)] text-white">
              <Phone className="size-4" aria-hidden />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium">Lanka Looms</p>
              <p className="text-xs text-muted-foreground">WhatsApp · 9:02 PM</p>
            </div>
          </div>
          <div className="min-h-[24rem] space-y-3 bg-[oklch(0.975_0.01_95)] px-3 py-4 text-[13px] leading-snug">
            <p className="ml-auto max-w-[78%] rounded-2xl rounded-br-sm bg-white px-3 py-2 shadow-sm">
              Is the blue kurta still available?
            </p>
            <div className="max-w-[88%]">
              <p className="mb-1 flex items-center gap-1 text-[11px] font-medium text-brand">
                <Sparkles className="size-3" aria-hidden /> AI assistant
              </p>
              <p className="rounded-2xl rounded-tl-sm bg-brand-soft px-3 py-2">
                Hi, I&apos;m the shop&apos;s AI assistant. The blue kurta is Rs. 4,500 in
                S, M and L. The owner will confirm stock and delivery tomorrow morning.
              </p>
            </div>
            <p className="mx-auto w-fit rounded-full bg-white px-3 py-1 text-[11px] text-muted-foreground shadow-sm">
              Owner notified
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        What your customer sees <SampleTag />
      </figcaption>
    </figure>
  )
}

// The owner's side of the same chat, shown as a notification.
export function OwnerAlert({
  tilt = "0deg",
  className,
}: {
  tilt?: string
  className?: string
}) {
  return (
    <div
      style={{ "--tilt": tilt } as CSSProperties}
      className={cn(
        "w-72 rotate-(--tilt) rounded-2xl bg-white p-4 shadow-[0_30px_60px_-30px_oklch(0.4_0.12_285/0.5)] ring-1 ring-black/5",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <span className="grid size-6 place-items-center rounded-full bg-brand-soft text-brand">
          <Bell className="size-3.5" aria-hidden />
        </span>
        Assistant is holding a chat
        <SampleTag className="ml-auto" />
      </div>
      <p className="mt-3 text-sm font-medium">Nimali Perera</p>
      <p className="text-sm text-muted-foreground">
        Wants the blue kurta in M by Friday, delivery to Colombo 7.
      </p>
      <div className="mt-3 flex gap-1.5 text-xs">
        <span className="rounded-full bg-[oklch(0.95_0.05_155)] px-2.5 py-1 text-[oklch(0.4_0.1_155)]">
          Ready to buy
        </span>
        <span className="rounded-full bg-[oklch(0.95_0.06_90)] px-2.5 py-1 text-[oklch(0.45_0.1_80)]">
          From ad
        </span>
      </div>
    </div>
  )
}

// UI-2. Two chats from one boosted post: one answered, one left waiting.
export function AdLeakScene({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="rounded-3xl bg-white/70 p-5 shadow-[0_40px_90px_-50px_oklch(0.4_0.12_285/0.5)] ring-1 ring-black/5 backdrop-blur sm:p-8">
        <div className="grid items-center gap-5 sm:grid-cols-[1fr_1.15fr]">
          <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
            <p className="flex items-center gap-1.5 text-xs font-medium text-brand">
              <Megaphone className="size-3.5" aria-hidden /> Boosted post
            </p>
            <div className="mt-3 grid aspect-[4/3] place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.88_0.07_250)] to-[oklch(0.9_0.07_20)] font-heading text-2xl text-primary/80">
              Blue kurta
            </div>
            <p className="mt-3 text-sm">New in: the blue kurta, Rs. 4,500.</p>
            <p className="text-sm text-muted-foreground">
              Order on WhatsApp: 077 123 4567
            </p>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
              <p className="flex items-center gap-2 text-xs font-medium text-[oklch(0.45_0.12_155)]">
                <Phone className="size-3.5" aria-hidden /> WhatsApp
                <span className="ml-auto text-muted-foreground">Replied in 2 min</span>
              </p>
              <p className="mt-2 w-fit rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm">
                Is the blue kurta in M?
              </p>
            </div>
            <div className="rounded-2xl bg-[oklch(0.97_0.035_85)] p-4 ring-1 ring-[oklch(0.85_0.08_85)]">
              <p className="flex items-center gap-2 text-xs font-medium text-[oklch(0.45_0.12_260)]">
                <MessageCircle className="size-3.5" aria-hidden /> Messenger
                <span className="ml-auto whitespace-nowrap font-semibold text-[oklch(0.5_0.12_75)]">
                  No reply · 3 hours
                </span>
              </p>
              <p className="mt-2 w-fit rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-sm">
                Price for 2 pieces? I will pay today.
              </p>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Camera className="size-3.5" aria-hidden /> Instagram: nothing yet
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">
        A made-up example.
      </figcaption>
    </figure>
  )
}
