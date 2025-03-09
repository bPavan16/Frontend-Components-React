'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, Shield, Star, ArrowRight, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';
import { motion } from 'framer-motion';
import { useRef } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Home() {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]"></div>
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-6 text-center md:text-left">
              <div className="inline-block bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-full px-4 py-1.5 text-sm font-medium text-blue-200 mb-2">
                Anonymous Feedback Platform
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                Get Honest Feedback Without Barriers
              </h1>

              <p className="text-lg md:text-xl text-blue-100/90">
                Create your profile, share your link, and receive anonymous messages that help you grow personally and professionally.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40">
                  <Link href="/sign-up">Get Started Free</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white">
                  <Link href="/learn-more">Learn More</Link>
                </Button>
              </div>
            </div>

            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 p-1 rounded-3xl shadow-xl">
                <Carousel
                  plugins={[plugin.current]}
                  className="w-full"
                  opts={{ loop: true }}
                >
                  <CarouselContent>
                    {messages.map((message, index) => (
                      <CarouselItem key={index} className="p-1">
                        <Card className="border-0 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-2xl shadow-lg">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-blue-100">"{message.title}"</CardTitle>
                          </CardHeader>
                          <CardContent className="pb-6">
                            <div className="flex items-start gap-4">
                              <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Mail className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <p className="text-gray-300">{message.content}</p>
                                <p className="text-xs text-blue-300 mt-2">
                                  {message.received}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose True Feedback?</h2>
            <p className="text-blue-100/80 max-w-2xl mx-auto">
              Our platform is built with privacy and simplicity at its core, making it easy to receive honest feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-blue-300" />}
              title="100% Anonymous"
              description="Feedback providers remain completely anonymous, encouraging honest and candid responses."
            />
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6 text-blue-300" />}
              title="Simple & Intuitive"
              description="Streamlined interface makes it easy to share your profile and manage incoming messages."
            />
            <FeatureCard
              icon={<Star className="h-6 w-6 text-blue-300" />}
              title="Insightful Growth"
              description="Gather valuable insights about yourself that you might not hear otherwise."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.1]"></div>

            <div className="relative px-6 py-12 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Receive Honest Feedback?</h2>
              <p className="mb-8 text-blue-100 max-w-lg mx-auto">
                Create your profile in seconds and start getting anonymous insights today.
              </p>
              <Button asChild size="lg" className="rounded-full bg-white hover:bg-gray-100 text-blue-700 shadow-lg">
                <Link href="/sign-up" className="flex items-center gap-2">
                  Get Started Now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 mt-auto bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4 text-xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">True Feedback</h3>
              <p className="text-sm text-gray-400">Anonymous feedback platform for personal and professional growth.</p>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-gray-300">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Use Cases</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Testimonials</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-gray-300">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-gray-300">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} True Feedback. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gradient-to-b from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
      <div className="h-12 w-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
