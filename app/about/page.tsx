import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  Layers,
  Clock,
  Eye,
  Anchor,
  ArrowRight,
  MapPin,
  Target,
} from 'lucide-react'
import WaveDivider from '@/components/WaveDivider'
import AnimatedSection from '@/components/AnimatedSection'

export const metadata: Metadata = {
  title: 'About Us — Licensed Customs Broker Bahamas',
  description:
    'Learn about Atlas Brokerage — a licensed Bahamian customs broker based in Nassau. Island roots, global reach. We carry the complexity of customs so you never have to.',
}

const values = [
  {
    icon: Award,
    title: 'Expertise',
    tagline: 'We know Bahamian customs law inside and out.',
    description:
      'With deep knowledge of Click2Clear, duty classifications, and every import category, we ensure your shipment is done right the first time. Clients trust us because we remove the fear of mistakes, wrong duties, or non-compliance.',
  },
  {
    icon: Layers,
    title: 'Full-Service',
    tagline: 'One broker, every import type.',
    description:
      'Many brokers specialise in a single area. Atlas Brokerage handles everything — vehicles, animals, commercial goods, duty exemptions — all under one roof. You never need to coordinate between multiple providers.',
  },
  {
    icon: Clock,
    title: 'Speed',
    tagline: 'We move fast so you aren\'t left waiting.',
    description:
      'Same-day entry submissions. 24-hour document turnaround. Customs delays cost money and cause frustration — our commitment to speed means your goods are released as quickly as the system allows.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    tagline: 'No surprises — you know exactly what you\'ll pay and when.',
    description:
      'We walk every client through their expected duties and fees upfront. Duty rates, broker fees, and timelines are explained in plain English before any work begins.',
  },
  {
    icon: Anchor,
    title: 'Bahamian',
    tagline: 'We are from here — and that makes all the difference.',
    description:
      'As a Bahamian-owned and operated brokerage, we have the local relationships and in-person presence to keep your goods moving — even when things get complicated. International freight companies cannot offer what we can.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy py-24 md:py-32 section-padding overflow-hidden noise-overlay">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold font-montserrat font-semibold text-sm tracking-[0.2em] uppercase">
                About Us
              </span>
            </div>
            <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Island Roots.{' '}
              <span className="text-gold">Global Reach.</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl">
              Atlas Brokerage is a licensed Bahamian customs brokerage serving
              individuals and businesses across Nassau and the wider archipelago.
            </p>
          </AnimatedSection>
        </div>
        <WaveDivider fill="#ffffff" variant="layered" className="absolute bottom-0 left-0 right-0" />
      </section>

      {/* Story / Mission */}
      <section className="bg-white py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-12 bg-gold" />
                  <span className="text-ocean-blue font-montserrat font-semibold text-sm tracking-[0.15em] uppercase">
                    Our Story
                  </span>
                </div>
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-navy mb-6">
                  Carrying the Complexity <br className="hidden md:block" />So You Don&apos;t Have To
                </h2>
                <div className="space-y-4 text-near-black/70 leading-relaxed">
                  <p>
                    We handle every type of customs clearance — from everyday goods
                    and commercial shipments to vehicles, duty exemptions, and live
                    animals. We exist to remove friction from the import process and
                    give our clients confidence that their goods are cleared
                    correctly, quickly, and compliantly.
                  </p>
                  <p>
                    As a licensed broker registered with Click2Clear, we work
                    directly within the Bahamian electronic customs system to prepare
                    entries, calculate duties, and manage every interaction with
                    government agencies on your behalf.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-sky-blue rounded-2xl p-8 text-center">
                  <Target className="w-8 h-8 text-ocean-blue mx-auto mb-4" />
                  <h3 className="font-montserrat font-bold text-sm text-navy uppercase tracking-wide mb-3">
                    Mission
                  </h3>
                  <p className="text-near-black/60 text-sm leading-relaxed">
                    To carry the complexity of Bahamian customs so our clients never have to.
                  </p>
                </div>
                <div className="bg-navy rounded-2xl p-8 text-center">
                  <MapPin className="w-8 h-8 text-gold mx-auto mb-4" />
                  <h3 className="font-montserrat font-bold text-sm text-white uppercase tracking-wide mb-3">
                    Vision
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    To be the most trusted name in customs clearance across The Bahamas — the first call every importer makes.
                  </p>
                </div>
                <div className="col-span-2 bg-gradient-to-r from-ocean-blue to-navy rounded-2xl p-8 text-center">
                  <p className="text-gold font-montserrat font-semibold text-lg italic mb-1">
                    &ldquo;Your World, Cleared.&rdquo;
                  </p>
                  <p className="text-white/50 text-sm">
                    Our promise to every client, every shipment.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <WaveDivider fill="#EAF4FB" bg="#ffffff" variant="gentle" />

      {/* Values */}
      <section className="bg-sky-blue py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-navy mb-4 relative inline-block gold-accent-center">
                What Sets Us Apart
              </h2>
              <p className="text-near-black/60 max-w-2xl mx-auto mt-6">
                Every piece of our work connects back to these five core pillars.
                They drive how we serve, communicate, and deliver results.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10
                               hover:shadow-lg hover:shadow-navy/5 transition-all duration-500 group">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                    <div className="w-14 h-14 rounded-xl bg-navy/5 flex items-center justify-center shrink-0
                                    group-hover:bg-navy transition-colors duration-500">
                      <value.icon className="w-7 h-7 text-ocean-blue group-hover:text-gold transition-colors duration-500" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-xl text-navy mb-1">
                        {value.title}
                      </h3>
                      <p className="text-ocean-blue font-medium text-sm mb-3">
                        {value.tagline}
                      </p>
                      <p className="text-near-black/60 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#003366" bg="#EAF4FB" variant="steep" />

      {/* CTA */}
      <section className="bg-navy py-20 section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
              Whether you&apos;re importing your first shipment or managing regular
              commercial freight, our team is here to make the process seamless.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Get a Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/services" className="btn-outline-white">
                View Our Services
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
