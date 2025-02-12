'use client'
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, SmilePlus, Check } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Snowflake } from "lucide-react"
import Image from "next/image"

// Add image imports at the top
import family from '@/../public/assets/images/landing-page/family.png'
import ladyLaptop from '@/../public/assets/images/landing-page/lady_laptop.png'
import familyHome1 from '@/../public/assets/images/landing-page/family_home_1.jpg'
import seniorCare2 from '@/../public/assets/images/landing-page/senior_care_2.jpg'
import familyHome2 from '@/../public/assets/images/landing-page/family_home_2.jpg'
import familyHome3 from '@/../public/assets/images/landing-page/family_home_3.jpg'
import videoThumbnail from '@/../public/assets/images/landing-page/video_thumbnail.jpg'

export default function Header() {
  return (
    <main className="mx-auto max-w-7xl text-foreground mt-16">
      {/* Hero Section */}
      <div className=" text-foreground px-6 py-12 border-zinc-600 border rounded-2xl max-w-7xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto_1fr] gap-8 items-center h-full">
        {/* Left side images */}
        <div className="hidden xl:flex flex-col gap-4 justify-center">
          <Card className="w-40 h-40 overflow-hidden rounded-2xl border-0">
            <Image
              src={familyHome1}
              alt="Family home"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </Card>
          <Card className="w-40 h-40 overflow-hidden rounded-2xl border-0">
            <Image
              src={familyHome3}
              alt="Senior care"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </Card>
          <Card className="w-40 h-40 overflow-hidden rounded-2xl border-0">
            <Image
              src={seniorCare2}
              alt="Senior care"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </Card>
        </div>

        {/* Center content */}
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
              We connect seniors to
              <br />
              Adult Family Homes
            </h1>
            <p className="text-xl text-gray-400">Washington State</p>
          </div>

          <div className="space-y-6">
            <p className="text-lg">
              Meet agent Rumi, designed to assist families with
              <br />
              navigating washington state senior care.{" "}
              <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                Beta
              </Badge>
            </p>

            <div className="relative max-w-md mx-auto">
              <Input
                placeholder="Start by searching a city"
                className="h-12 pl-4 pr-12 bg-white/5 border-white/10 text-white placeholder:text-gray-400 rounded-full"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Snowflake className="w-5 h-5 text-pink-500" />
              </div>
            </div>
          </div>

          <p className="text-secondary font-medium">Trusted by</p>
        </div>

        {/* Right side images */}
        <div className="hidden xl:flex flex-col gap-4 justify-center">
          <Card className="w-40 h-40 overflow-hidden rounded-2xl border-0 ml-auto">
            <Image
              src={ladyLaptop}
              alt="Senior care"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </Card>
          <Card className="w-40 h-40 overflow-hidden rounded-2xl border-0 ml-auto">
            <Image
              src={familyHome2}
              alt="Senior care"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </Card>
          <Card className="w-40 h-40 overflow-hidden rounded-2xl border-0 ml-auto">
            <Image
              src={family}
              alt="Family"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </Card>
        </div>
      </div>
    </div>

      {/* Video Section */}
      <section className="container grid lg:grid-cols-2 gap-8 items-center py-12">
        <div className="relative aspect-video w-full0 rounded-lg">
          <Image
            src={videoThumbnail}
            alt="Video Thumbnail"
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center">
              <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1" />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-xl">
            Thanks to modern technology, families no longer need senior advisors to determine cost of care, search for homes, or find comparable options. You just use Carefinder.
          </p>
          <p className="text-gray-400">
            All options on Carefinder are pre-vetted, meet high standards for providing quality care and are highly recommendable.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-12 space-y-8">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">A better way to care</h2>
          <p className="text-gray-400">
            Enjoy our transparent & unbaised care matchmaking experience, backed by real relationships with trusted care providers.{" "}
            <span className="text-pink-500">Our story.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6 space-y-4">
              <MapPin className="w-10 h-10 text-pink-500" />
              <h3 className="text-xl font-semibold">Skip the search</h3>
              <p className="text-gray-400">
                AI driven matchmaking, connects you directly to the most compatible pre vetted care.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6 space-y-4">
              <SmilePlus className="w-10 h-10 text-yellow-500" />
              <h3 className="text-xl font-semibold">Stress free zone</h3>
              <p className="text-gray-400">
                We streamline the entire process from matchmaking to admissions. Simply give us a call or message if you need any support along the way.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6 space-y-4">
              <Check className="w-10 h-10 text-green-500" />
              <h3 className="text-xl font-semibold">Transparent & Unbiased</h3>
              <p className="text-gray-400">
                We don&apos;t collect behind the scenes commisions, which means you can be confident in receiving unbiased guidance that you can trust.
              </p>
              <span className="text-pink-500 text-sm">Learn more.</span>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}