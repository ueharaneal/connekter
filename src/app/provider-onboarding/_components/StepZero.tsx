import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  Award,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StepZero() {
  const benefits = [
    {
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      title: "Competitive Pricing",
      description:
        "Set your own rates and earn what you deserve for your skills.",
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Wide Range of Opportunities",
      description:
        "Access a diverse pool of projects from clients across various industries.",
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Fully book your AFH",
      description:
        "Build your reputation with our rating system and portfolio features.",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      title: "Secure Payments",
      description:
        "Get paid on time, every time with our secure payment system.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Join Connekter as a Provider
          </CardTitle>
          <CardDescription className="mt-2 text-xl">
            Unlock Your Potential, and fill your homes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-lg text-muted-foreground">
            Connekter is the premier platform for skilled providers to find
            exciting projects, connect with clients, and take their careers to
            the next level.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-secondary">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg font-semibold">
                    {benefit.icon}
                    <span className="ml-2">{benefit.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center"></CardFooter>
      </Card>
    </div>
  );
}
