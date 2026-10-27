import { Activity } from "@/components/landing/activity"
import { AdLeak } from "@/components/landing/ad-leak"
import { Away } from "@/components/landing/away"
import { Control } from "@/components/landing/control"
import { Faq } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Limits } from "@/components/landing/limits"
import { Problem } from "@/components/landing/problem"
import { ThreeJobs } from "@/components/landing/three-jobs"
import { Waitlist } from "@/components/landing/waitlist"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <ThreeJobs />
        <Away />
        <Control />
        <Activity />
        <AdLeak />
        <HowItWorks />
        <Limits />
        <Faq />
        <Waitlist />
      </main>
      <Footer />
    </>
  )
}
