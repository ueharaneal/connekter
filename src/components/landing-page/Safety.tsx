import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, UserCheck, Lock } from "lucide-react";

const safetyFeatures = [
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Our escrow system ensures your money is protected until the job is completed to your satisfaction.",
  },
  {
    icon: UserCheck,
    title: "Verified Contractors",
    description:
      "All contractors undergo a thorough vetting process to ensure quality and reliability.",
  },
  {
    icon: Lock,
    title: "Data Protection",
    description:
      "Your personal and project information is encrypted and stored securely.",
  },
];

export function Safety() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Safety Guaranteed
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {safetyFeatures.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 p-3">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
