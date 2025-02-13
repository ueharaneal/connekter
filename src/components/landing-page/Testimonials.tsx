import { Card } from "@/components/ui/card"
import { TwitterLogoIcon } from "@radix-ui/react-icons"
import { Play, Star, Linkedin, TwitterIcon } from "lucide-react"
import Image from "next/image"

export function Testimonials() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Video Testimonial 1 */}
          <Card className="relative overflow-hidden bg-black">
            <div className="relative aspect-video">
              <Image src="/placeholder.svg?height=300&width=400" alt="Blaine Anderson" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black">
                <h3 className="text-white font-semibold">Blaine Anderson</h3>
                <p className="text-white/80 text-sm">CEO and founder of Dating by Blaine</p>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 bg-indigo-600 text-white">
              <p className="text-lg">&quot;Video testimonial is what convinces potential customers to give me a chance&quot;</p>
            </div>
          </Card>

          {/* LinkedIn Style Testimonial */}
          <Card className="p-6 bg-gray-900 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/placeholder.svg?height=48&width=48"
                alt="Madeleine Work"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold">Madeleine Work</h3>
                <p className="text-sm text-gray-400">Content Marketing Manager at Chili Piper</p>
              </div>
              <Linkedin className="w-5 h-5 ml-auto text-blue-400" />
            </div>
            <p className="text-gray-200">
              Chili Piper just implemented our Wall of Love using Testimonial. So far results have been 🔥🔥🔥 Check it
              out: chilipiper.com/wall-of-love
            </p>
          </Card>

          {/* Video Testimonial 2 */}
          <Card className="relative overflow-hidden bg-black">
            <div className="relative aspect-video">
              <Image src="/placeholder.svg?height=300&width=400" alt="Justin Welsh" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black">
                <h3 className="text-white font-semibold">Justin Welsh</h3>
                <p className="text-white/80 text-sm">Founder of The Saturday Solopreneur</p>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 bg-indigo-600 text-white">
              <p className="text-lg">&quot;For the small price I pay, it&apos;s 3X&apos;d conversions with such a massive ROI!&quot;</p>
            </div>
          </Card>

          {/* Twitter Style Testimonial */}
          <Card className="p-6 bg-gray-900 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/placeholder.svg?height=48&width=48"
                alt="Tibo"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold">Tibo</h3>
                <p className="text-sm text-gray-400">@tibo_maker</p>
              </div>
              <TwitterLogoIcon className="w-5 h-5 ml-auto text-blue-400" />
            </div>
            <p className="text-gray-200">I&poas;ve been using testimonial.to last few weeks and I absolutely LOVE it ❤️</p>
          </Card>
        </div>
      </div>
    </section>
  )
}

