import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah M.",
    text: "Carefinder helped me find the perfect contractor for my renovation. The bidding process was smooth, and I got great value!",
  },
  {
    name: "John D.",
    text: "As a contractor, Carefinder has been a game-changer. It's so easy to find new projects and showcase my skills.",
  },
  {
    name: "Emily R.",
    text: "I love how transparent the whole process is. The contractor ratings really helped me make an informed decision.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">
          What Our Users Say
        </h2>
        <Carousel className="mx-auto w-full max-w-xs md:max-w-2xl">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="p-6">
                    <p className="mb-4 italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <p className="font-semibold">- {testimonial.name}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
