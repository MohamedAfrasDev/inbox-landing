import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function JoinCta({ size = "lg" }: { size?: "default" | "lg" }) {
  return (
    <Button
      asChild
      size={size}
      className={
        size === "lg"
          ? "h-11 rounded-full px-6 text-base shadow-[0_14px_30px_-12px_oklch(0.25_0.06_268/0.7)]"
          : "h-9 rounded-full px-4"
      }
    >
      <a href="#waitlist">
        Join the waitlist
        <ArrowRight aria-hidden />
      </a>
    </Button>
  )
}
