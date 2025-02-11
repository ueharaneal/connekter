import {
  ArrowRight,
  UserPlus,
  FileText,
  Gavel,
  Search,
  Handshake,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const steps = [
    {
      icon: <UserPlus className="h-8 w-8" />,
      title: "Create an account",
      description: "Sign up and join our community of users and professionals.",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Post a detailed job listing",
      description:
        "Describe your project needs and add photos to get accurate bids.",
    },
    {
      icon: <Gavel className="h-8 w-8" />,
      title: "Receive bids from professionals",
      description: "Licensed professionals will start bidding for your job.",
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Review professional profiles",
      description: "Examine each contractor's profile, ratings, and past work.",
    },
    {
      icon: <Handshake className="h-8 w-8" />,
      title: "Choose and get Connekted!",
      description:
        "Select the best contractor for your project and start working together.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-4xl font-bold">About Carefinder</h1>
      <p className="mb-12 text-center text-xl text-muted-foreground">
        Carefinder is the premier platform connecting skilled contractors with
        users who need their services.
      </p>

      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-semibold">
          Need help to get a job done?
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="flex flex-col items-center text-center"
            >
              <CardHeader>
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  {step.icon}
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>For Users</CardTitle>
            <CardDescription>
              How Carefinder works for those seeking services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-inside list-decimal space-y-2">
              <li>
                Create a detailed job posting with your project requirements
              </li>
              <li>Set your budget and project timeline</li>
              <li>Receive competitive bids from skilled contractors</li>
              <li>Review contractor profiles, ratings, and portfolios</li>
              <li>Select the best contractor for your project</li>
              <li>Collaborate through our secure platform</li>
              <li>Pay only when you&apos;re satisfied with the work</li>
            </ol>
            <Button asChild>
              <Link href="/post-job">
                Post a Job <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Contractors</CardTitle>
            <CardDescription>
              How Carefinder empowers skilled professionals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-inside list-decimal space-y-2">
              <li>Create a comprehensive profile showcasing your skills</li>
              <li>Browse available jobs matching your expertise</li>
              <li>Submit competitive bids for projects</li>
              <li>Communicate with potential clients through our platform</li>
              <li>Secure work and complete projects</li>
              <li>Build your reputation with client ratings and reviews</li>
              <li>Receive secure and timely payments</li>
            </ol>
            <Button asChild>
              <Link href="/contractor-signup">
                Become a Contractor <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why Choose Carefinder?</CardTitle>
            <CardDescription>Our commitment to excellence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-inside list-disc space-y-2">
              <li>Wide range of skilled professionals</li>
              <li>Secure and transparent transactions</li>
              <li>Quality assurance and dispute resolution</li>
              <li>Competitive pricing</li>
              <li>User-friendly platform</li>
              <li>24/7 customer support</li>
              <li>Satisfaction guarantee</li>
            </ul>
            <Button asChild>
              <Link href="/faq">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="mb-4 text-2xl font-semibold">Ready to get started?</h2>
        <p className="mb-8 text-muted-foreground">
          Join Carefinder today and experience the future of service
          contracting.
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/signup">
              Sign Up <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
