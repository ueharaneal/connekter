import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQAccordion() {
  return (
    <div className="flex w-full max-w-7xl flex-col items-center p-4">
      <h2 className="mb-8 text-2xl font-medium text-white">
        Frequently asked questions
      </h2>
      <div className="w-full max-w-2xl">
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem
            value="item-1"
            className="rounded-sm border-zinc-800 px-6"
          >
            <AccordionTrigger className="text-white hover:text-white/90">
              Who do you care for?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              We provide comprehensive care for elderly residents requiring
              assisted living, memory care, and specialized medical attention.
              Our facility is equipped to support individuals with varying
              levels of independence and care needs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="rounded-sm border-zinc-800 px-6"
          >
            <AccordionTrigger className="text-white hover:text-white/90">
              What is included in all care levels?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              All care levels include 24/7 staff supervision, meal services,
              medication management, housekeeping, laundry services, social
              activities, and basic medical monitoring. Additional services are
              available based on individual care requirements.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="rounded-sm border-zinc-800 px-6"
          >
            <AccordionTrigger className="text-white hover:text-white/90">
              What are your policies?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              Our policies prioritize resident safety, dignity, and quality of
              life. We maintain strict health and safety protocols, visitor
              guidelines, and emergency procedures. All policies are designed to
              ensure the highest standard of care while respecting resident
              independence.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="rounded-sm border-zinc-800 px-6"
          >
            <AccordionTrigger className="text-white hover:text-white/90">
              What are the house rules?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              House rules include quiet hours, visitor registration, communal
              space guidelines, and safety protocols. These rules are designed
              to create a harmonious living environment while ensuring the
              comfort and security of all residents.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
