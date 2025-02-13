import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <section className="w-full bg-background py-16 text-foreground">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Frequently asked questions
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border-b-white/20">
            <AccordionTrigger className="text-xl font-normal hover:text-white/80 hover:no-underline">
              How does it work?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              We use AI-powered technology to match seniors with the most
              compatible care providers based on their specific needs,
              preferences, and location.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-b-white/20">
            <AccordionTrigger className="text-xl font-normal hover:text-white/80 hover:no-underline">
              Explain how you make money?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              We operate on a transparent fee structure, charging care providers
              a flat rate for our matching services. We never accept hidden
              commissions or referral fees.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-b-white/20">
            <AccordionTrigger className="text-xl font-normal hover:text-white/80 hover:no-underline">
              How is Carefinder unbiased?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              Unlike traditional referral services, we don&apos;t accept
              commissions that could influence our recommendations. Our
              AI-driven matching process is based solely on compatibility and
              quality of care.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-b-white/20">
            <AccordionTrigger className="text-xl font-normal hover:text-white/80 hover:no-underline">
              Why is Carefinder better for the industry?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              We&apos;re modernizing senior care matching by eliminating bias,
              reducing costs, and using technology to create more accurate
              matches between seniors and care providers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-b-white/20">
            <AccordionTrigger className="text-xl font-normal hover:text-white/80 hover:no-underline">
              What if I change my mind?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              We understand that circumstances can change. We offer flexible
              options and support throughout the process, including assistance
              with modifying or canceling arrangements.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-b-white/20">
            <AccordionTrigger className="text-xl font-normal hover:text-white/80 hover:no-underline">
              What if we want the senior moved?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              We can help coordinate transfers between care facilities and
              provide guidance throughout the transition process to ensure a
              smooth relocation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
