import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function JoinCta({ size = "lg" }: { size?: "default" | "lg" }) {
  return (
    <Button asChild size={size} className="rounded-full px-6">
      <a href="#waitlist">
        Join the waitlist
        <ArrowRight aria-hidden />
      </a>
    </Button>
  )
}
