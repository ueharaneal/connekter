"use client";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, SmilePlus, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Snowflake } from "lucide-react";
import Image from "next/image";

// Add image imports at the top
import family from "@/../public/assets/images/landing-page/family.png";
import ladyLaptop from "@/../public/assets/images/landing-page/lady_laptop.png";
import familyHome1 from "@/../public/assets/images/landing-page/family_home_1.jpg";
import seniorCare2 from "@/../public/assets/images/landing-page/senior_care_2.jpg";
import familyHome2 from "@/../public/assets/images/landing-page/family_home_2.jpg";
import familyHome3 from "@/../public/assets/images/landing-page/family_home_3.jpg";
import videoThumbnail from "@/../public/assets/images/landing-page/video_thumbnail.jpg";

export default function Header() {
  return (
    <main className="mx-auto mt-10 max-w-7xl text-foreground">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl rounded-2xl border-zinc-700 px-6 py-12 text-foreground lg:border">
        <div className="grid h-full grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          {/* Left side images */}
          <div className="hidden flex-col justify-center gap-4 lg:flex">
            <Card className="h-40 w-40 overflow-hidden rounded-2xl border-0">
              <Image
                src={familyHome1}
                alt="Family home"
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            </Card>
            <Card className="h-40 w-40 overflow-hidden rounded-2xl border-0">
              <Image
                src={familyHome3}
                alt="Senior care"
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            </Card>
            <Card className="h-40 w-40 overflow-hidden rounded-2xl border-0">
              <Image
                src={seniorCare2}
                alt="Senior care"
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            </Card>
          </div>

          {/* Center content */}
          <div className="space-y-6 text-center">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                We connect seniors to
                <br />
                Adult Family Homes
              </h1>
              <p className="text-lg text-gray-400 lg:text-xl">
                Washington State
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-x-2 text-sm sm:text-base md:text-lg">
                Meet agent Rumi, designed to assist families with
                <br />
                navigating washington state senior care.{" "}
                <Badge
                  variant="outline"
                  className="border-orange-500/20 bg-orange-500/10 text-orange-500"
                >
                  Beta
                </Badge>
              </div>

              <div className="relative mx-auto max-w-md">
                <Input
                  placeholder="Start by searching a city"
                  className="h-12 rounded-full border-white/10 bg-white/5 pl-4 pr-12 text-white placeholder:text-gray-400"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Snowflake className="h-5 w-5 text-pink-500" />
                </div>
              </div>
            </div>

            <p className="font-medium text-secondary">Trusted by</p>
          </div>

          {/* Right side images */}
          <div className="hidden flex-col justify-center gap-4 lg:flex">
            <Card className="ml-auto h-40 w-40 overflow-hidden rounded-2xl border-0">
              <Image
                src={ladyLaptop}
                alt="Senior care"
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            </Card>
            <Card className="ml-auto h-40 w-40 overflow-hidden rounded-2xl border-0">
              <Image
                src={familyHome2}
                alt="Senior care"
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            </Card>
            <Card className="ml-auto h-40 w-40 overflow-hidden rounded-2xl border-0">
              <Image
                src={family}
                alt="Family"
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            </Card>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <section className="container grid items-center gap-8 py-12 lg:grid-cols-2">
        <div className="w-full0 relative aspect-video rounded-lg">
          <Image
            src={videoThumbnail}
            alt="Video Thumbnail"
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-500">
              <div className="ml-1 h-0 w-0 border-y-[12px] border-l-[20px] border-y-transparent border-l-white" />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-xl">
            Thanks to modern technology, families no longer need senior advisors
            to determine cost of care, search for homes, or find comparable
            options. You just use Connekter.
          </p>
          <p className="text-gray-400">
            All options on Connekter are pre-vetted, meet high standards for
            providing quality care and are highly recommendable.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container space-y-8 py-12">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl font-bold md:text-4xl">
            A better way to care
          </h2>
          <p className="text-gray-400">
            Enjoy our transparent & unbaised care matchmaking experience, backed
            by real relationships with trusted care providers.{" "}
            <span className="text-pink-500">Our story.</span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-gray-800 bg-gray-900/50">
            <CardContent className="space-y-4 p-6">
              <MapPin className="h-10 w-10 text-pink-500" />
              <h3 className="text-xl font-semibold">Skip the search</h3>
              <p className="text-gray-400">
                AI driven matchmaking, connects you directly to the most
                compatible pre vetted care.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50">
            <CardContent className="space-y-4 p-6">
              <SmilePlus className="h-10 w-10 text-yellow-500" />
              <h3 className="text-xl font-semibold">Stress free zone</h3>
              <p className="text-gray-400">
                We streamline the entire process from matchmaking to admissions.
                Simply give us a call or message if you need any support along
                the way.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50">
            <CardContent className="space-y-4 p-6">
              <Check className="h-10 w-10 text-green-500" />
              <h3 className="text-xl font-semibold">Transparent & Unbiased</h3>
              <p className="text-gray-400">
                We don&apos;t collect behind the scenes commisions, which means
                you can be confident in receiving unbiased guidance that you can
                trust.
              </p>
              <span className="text-sm text-pink-500">Learn more.</span>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
