import { JoinCta } from "./cta"
import { PRODUCT_NAME } from "./content"
import { CustomerPhone, OwnerAlert } from "./scenes"
import { Caption, Shot } from "./shot"

export function Hero() {
  return (
    <section id="top" className="bg-pastel relative -mt-[3.75rem] pb-28 pt-32 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-background" />
      <div className="mx-auto w-full max-w-3xl px-6 text-center">
        <h1 className="rise text-balance text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
          Stop losing buyers to <span className="bg-gradient-to-r from-brand to-[oklch(0.6_0.19_300)] bg-clip-text text-transparent">unread</span> messages.
        </h1>
        <p
          style={{ "--i": 1 } as React.CSSProperties}
          className="rise mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          {PRODUCT_NAME} puts your Messenger, Instagram and WhatsApp chats in one inbox,
          shows who is ready to buy, and keeps customers warm until you are back.
        </p>
        <div
          style={{ "--i": 2 } as React.CSSProperties}
          className="rise mt-9 flex flex-col items-center gap-3"
        >
          <JoinCta />
          <p className="text-sm text-muted-foreground">
            Free to join. No card. We email you when your spot opens.
          </p>
        </div>
      </div>

      <div
        style={{ "--i": 3 } as React.CSSProperties}
        className="rise relative mx-auto mt-16 w-full max-w-5xl px-6"
      >
        {/* Phone first on small screens: owners will open this page on a phone. */}
        <div className="relative flex flex-col items-center gap-10 md:block">
          <div className="md:hidden">
            <CustomerPhone />
          </div>
          <div>
            <Shot
              screen="dashboard"
              priority
              tilt="-1deg"
              alt="The dashboard: a Needs you now list of chats ranked by buying signal, with counts of chats the assistant handled."
            />
            <Caption className="text-center">Preview of the product, sample data.</Caption>
          </div>
          <OwnerAlert tilt="-3deg" className="absolute -left-8 top-[58%] hidden md:block" />
          <CustomerPhone
            tilt="3deg"
            className="absolute -bottom-24 -right-6 hidden md:block lg:-right-12"
          />
        </div>
      </div>
    </section>
  )
}
