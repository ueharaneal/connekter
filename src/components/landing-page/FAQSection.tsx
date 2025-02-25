import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How does HomeProConnect work?",
    answer:
      "HomeProConnect connects homeowners with skilled contractors. Homeowners post their projects with details and budget, and contractors bid on these jobs. You can then review bids, contractor profiles, and choose the best fit for your project.",
  },
  {
    question: "Is there a fee to use HomeProConnect?",
    answer:
      "It's free for homeowners to post jobs and receive bids. Contractors pay a small fee only when they win a job, ensuring quality and commitment.",
  },
  {
    question: "How do you ensure the quality of contractors?",
    answer:
      "We verify all contractors' licenses and insurance. Additionally, our platform includes a review system where homeowners can rate and review contractors after job completion.",
  },
  {
    question: "What kind of projects can I post on HomeProConnect?",
    answer:
      "You can post a wide range of home improvement projects, from small repairs to major renovations. This includes painting, plumbing, electrical work, landscaping, and more.",
  },
  {
    question: "How do I know I'm getting a fair price?",
    answer:
      "By receiving multiple bids, you can compare prices and services. Our system encourages competitive pricing while maintaining quality standards.",
  },
  {
    question: "I'm a contractor. How can I join HomeProConnect?",
    answer:
      "Contractors can sign up on our platform. We offer an AI agent to help you build out your profile, showcasing your skills and experience effectively. This AI assistance ensures your profile stands out to potential clients.",
  },
  {
    question: "Tell me more about the AI agent for contractors.",
    answer:
      "Our AI agent is designed to help contractors create compelling profiles. It guides you through the process, suggesting optimal ways to present your skills, experience, and past projects. The AI can help write descriptions, choose the right keywords, and even suggest which photos of your work might be most impactful.",
  },
  {
    question: "Is my personal information safe on HomeProConnect?",
    answer:
      "We take data privacy seriously. All personal information is encrypted and securely stored. We never share your contact details without your permission.",
  },
];

export function FAQSection() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-3xl"
        >
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
