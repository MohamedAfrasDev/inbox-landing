import { Audience } from "@/components/landing/audience"
import { Control } from "@/components/landing/control"
import { Faq } from "@/components/landing/faq"
import { Features } from "@/components/landing/features"
import { Footer } from "@/components/landing/footer"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Problem } from "@/components/landing/problem"
import { Waitlist } from "@/components/landing/waitlist"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <Audience />
        <Control />
        <Waitlist />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
