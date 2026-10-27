import { PRODUCT_NAME } from "./content"

export function Footer() {
  return (
    <footer className="border-t py-10 text-center text-sm text-muted-foreground">
      <p>
        {PRODUCT_NAME} · A student project from University of Westminster at IIT
      </p>
      <p className="mt-1">We use your email only for the waitlist.</p>
    </footer>
  )
}
