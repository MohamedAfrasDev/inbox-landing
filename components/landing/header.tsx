import { JoinCta } from "./cta"
import { navLinks, PRODUCT_NAME } from "./content"

export function Header() {
  return (
    <header className="sticky top-3 z-40 px-4">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-full bg-white/80 py-2 pl-5 pr-2 shadow-[0_10px_40px_-20px_oklch(0.3_0.1_280/0.4)] ring-1 ring-black/5 backdrop-blur-md">
        <a href="#top" className="font-heading text-2xl">
          {PRODUCT_NAME}
        </a>
        <nav aria-label="Page sections" className="hidden items-center gap-8 text-sm sm:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <JoinCta size="default" />
      </div>
    </header>
  )
}
