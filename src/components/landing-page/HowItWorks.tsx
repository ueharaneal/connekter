import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ClipboardList,
  Search,
  Handshake,
  UserPlus,
  Send,
  LucideIcon,
} from "lucide-react";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const jobPosterSteps = [
  {
    icon: ClipboardList,
    title: "Post Your Job",
    description: "Describe your project requirements, budget, and timeline.",
  },
  {
    icon: Search,
    title: "Review Bids",
    description: "Browse contractor bids and profiles tailored to your needs.",
  },
  {
    icon: Handshake,
    title: "Hire and Manage",
    description: "Choose the best contractor and manage your project easily.",
  },
];

const contractorSteps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description:
      "Showcase your skills, experience, and portfolio to stand out.",
  },
  {
    icon: Search,
    title: "Find Opportunities",
    description:
      "Browse available jobs that match your expertise and interests.",
  },
  {
    icon: Send,
    title: "Submit Proposals",
    description: "Bid on projects and communicate with potential clients.",
  },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <Card key={index}>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 p-3">
          <step.icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>{step.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{step.description}</p>
      </CardContent>
    </Card>
  );
}

export function HowItWorks() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">
          How Carefinder Works
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-center text-2xl font-semibold">
              For Job Posters
            </h3>
            <div className="space-y-4">
              {jobPosterSteps.map((step, index) => (
                <StepCard key={index} step={step} index={index} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-center text-2xl font-semibold">
              For Contractors
            </h3>
            <div className="space-y-4">
              {contractorSteps.map((step, index) => (
                <StepCard key={index} step={step} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
