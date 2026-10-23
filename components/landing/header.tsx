import { JoinCta } from "./cta"
import { PRODUCT_NAME } from "./content"

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
      <span className="font-heading text-2xl">{PRODUCT_NAME}</span>
      <JoinCta size="default" />
    </header>
  )
}
