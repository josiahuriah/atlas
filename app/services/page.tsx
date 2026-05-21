import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Package,
  Car,
  FileCheck,
  PawPrint,
  ArrowRight,
  CheckCircle,
  Phone,
} from 'lucide-react'
import WaveDivider from '@/components/WaveDivider'
import AnimatedSection from '@/components/AnimatedSection'

export const metadata: Metadata = {
  title: 'Customs Brokerage Services Bahamas',
  description:
    'Full-service customs brokerage in Nassau, The Bahamas. Vehicle imports, duty exemptions, general goods clearance, and animal imports. One broker, every import type.',
}

const services = [
  {
    id: 'general-goods',
    icon: Package,
    title: 'General Goods Clearance',
    subtitle: 'Commercial & Personal Imports',
    description:
      'Whether you are importing a container of commercial goods for your business or a personal shipment for your home, Atlas Brokerage handles the entire customs clearance process from start to finish.',
    features: [
      'Full customs entry preparation and submission via Click2Clear',
      'Duty rate assessment and classification for all goods categories',
      'Commercial invoice and Bill of Lading review',
      'Coordination with shipping lines and freight agents',
      'Nassau Harbour and airport cargo clearance',
      'Same-day entry submission for urgent shipments',
    ],
  },
  {
    id: 'vehicle-imports',
    icon: Car,
    title: 'Vehicle Imports',
    subtitle: 'Cars, Motorcycles & Boats',
    description:
      'Importing a vehicle to The Bahamas involves specific customs requirements, duty calculations based on vehicle value, and documentation that must be handled precisely. We manage every step so your vehicle clears customs without delays.',
    features: [
      'Duty calculation based on vehicle value and type (45-65% for petrol, 10% for electric)',
      'All required documentation: Bill of Lading, title, invoice, and registration',
      'Compliance with the 10-year vehicle age restriction',
      'Click2Clear entry submission and government liaison',
      'Coordination with port authorities for vehicle release',
      'Electric vehicle import guidance with reduced duty rates',
    ],
  },
  {
    id: 'duty-exemptions',
    icon: FileCheck,
    title: 'Duty Exemptions',
    subtitle: 'Qualifying Relief & Applications',
    description:
      'Certain individuals and organizations in The Bahamas qualify for full or partial duty exemptions on imports. We guide clients through eligibility requirements, application procedures, and ensure all documentation is properly filed.',
    features: [
      'Returning resident exemption applications',
      'First-time homeowner duty relief assistance',
      'Over-the-Hill Initiative and government programme exemptions',
      'Religious and charitable organization import concessions',
      'Eligibility assessment and qualification guidance',
      'Full application preparation and submission support',
    ],
  },
  {
    id: 'animal-imports',
    icon: PawPrint,
    title: 'Animal / Pet Imports',
    subtitle: 'Live Animal Clearance & Permits',
    description:
      'Importing pets and live animals into The Bahamas requires specific permits from BAHFSA, health certifications, and customs clearance. We coordinate the entire process so your animal arrives safely and legally.',
    features: [
      'BAHFSA import permit coordination and application',
      'Veterinary health certificate guidance',
      'Vaccination record verification and compliance',
      'Breed restriction advisement',
      'Customs entry for live animal imports',
      'Quarantine requirement guidance where applicable',
    ],
  },
]

export default function ServicesPage() {
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
                What We Do
              </span>
            </div>
            <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Customs Brokerage{' '}
              <span className="text-gold">Services</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl">
              One broker, every import type. From general goods to vehicles, duty
              exemptions to live animals — Atlas Brokerage handles it all.
            </p>
          </AnimatedSection>
        </div>
        <WaveDivider fill="#ffffff" variant="layered" className="absolute bottom-0 left-0 right-0" />
      </section>

      {/* Services List */}
      <section className="bg-white py-16 md:py-24 section-padding">
        <div className="max-w-7xl mx-auto space-y-12">
          {services.map((service, i) => (
            <AnimatedSection key={service.id} delay={0.05}>
              <div
                id={service.id}
                className="scroll-mt-24 bg-white rounded-3xl border-2 border-gray-100 p-8 md:p-12
                           hover:border-ocean-blue/20 hover:shadow-xl hover:shadow-ocean-blue/5
                           transition-all duration-500 group"
              >
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                  {/* Left: Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-sky-blue flex items-center justify-center
                                      group-hover:bg-navy transition-colors duration-500">
                        <service.icon className="w-7 h-7 text-ocean-blue group-hover:text-gold transition-colors duration-500" />
                      </div>
                      <div>
                        <h2 className="font-montserrat font-bold text-2xl text-navy">
                          {service.title}
                        </h2>
                        <p className="text-ocean-blue text-sm font-medium">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-near-black/70 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-ocean-blue font-semibold text-sm
                                 hover:text-navy transition-colors group/link"
                    >
                      Get a quote for this service
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Right: Features */}
                  <div className="lg:w-[420px] shrink-0">
                    <div className="bg-sky-blue/60 rounded-2xl p-6 md:p-8">
                      <h3 className="font-montserrat font-semibold text-sm text-navy tracking-wide uppercase mb-5">
                        What&apos;s Included
                      </h3>
                      <ul className="space-y-3">
                        {service.features.map(feature => (
                          <li key={feature} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-ocean-blue shrink-0 mt-0.5" />
                            <span className="text-near-black/70 text-sm leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-navy py-20 section-padding overflow-hidden noise-overlay">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-6">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
              Tell us what you&apos;re importing and we&apos;ll handle the rest. Our team
              will assess your needs and provide a clear, upfront quote.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Get a Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a href="tel:+12428194311" className="btn-outline-white">
                <Phone className="w-5 h-5 mr-2" />
                (242) 819-4311
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
