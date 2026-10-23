import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "./content"

export function Faq() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-24">
      <h2 className="text-center text-4xl sm:text-5xl">Frequently asked questions</h2>
      <Accordion type="single" collapsible className="mt-12">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="text-base">{f.q}</AccordionTrigger>
            <AccordionContent className="text-base leading-relaxed text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
