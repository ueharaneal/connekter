import { ClipboardList, Users, UserCheck, CheckCircle } from "lucide-react";

const steps = [
  {
    title: "Post Your Job",
    description:
      "Describe your project, set your maximum budget, and specify your preferred date range.",
    icon: ClipboardList,
  },
  {
    title: "Receive Bids",
    description:
      "Multiple professionals will compete, offering their best prices for your project.",
    icon: Users,
  },
  {
    title: "Choose a Contractor",
    description:
      "Review bids, profiles, and reviews to select the best professional for your needs.",
    icon: UserCheck,
  },
  {
    title: "Complete Your Project",
    description:
      "Your chosen contractor will carry out the work to transform your home.",
    icon: CheckCircle,
  },
];

export function ProcessSteps() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
          How It Works
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 transform bg-primary/30 md:block"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`mb-8 flex flex-col items-center md:mb-16 md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div
                className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-8" : "md:pr-8"} mb-4 md:mb-0`}
              >
                <div className="h-full rounded-lg border border-primary/10 bg-background p-6 shadow-lg">
                  <h3 className="mb-2 text-xl font-semibold text-primary">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
              <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <step.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <div
                className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"} hidden md:block`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
