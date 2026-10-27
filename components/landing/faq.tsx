import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "./content"
import { Eyebrow } from "./eyebrow"

export function Faq() {
  return (
    <section id="faq" className="mx-auto w-full max-w-2xl scroll-mt-24 px-6 py-24">
      <Eyebrow center>FAQ</Eyebrow>
        <h2 className="text-center text-4xl sm:text-5xl">Questions owners ask</h2>
      <Accordion type="single" collapsible className="mt-12">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="font-sans text-base font-medium">{f.q}</AccordionTrigger>
            <AccordionContent className="text-base leading-relaxed text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
