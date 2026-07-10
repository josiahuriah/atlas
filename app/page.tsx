import Link from 'next/link'
import Image from 'next/image'
import {
  Car,
  FileCheck,
  PawPrint,
  Package,
  Clock,
  Eye,
  Award,
  Anchor,
  ArrowRight,
  ChevronRight,
  Phone,
} from 'lucide-react'
import WaveDivider from '@/components/WaveDivider'
import AnimatedSection from '@/components/AnimatedSection'

const services = [
  {
    icon: Package,
    title: 'General Goods Clearance',
    description:
      'Full customs clearance for commercial and personal imports arriving by air or ocean freight.',
    href: '/services#general-goods',
  },
  {
    icon: Car,
    title: 'Vehicle Imports',
    description:
      'Complete handling of vehicle import documentation, duty assessment, and customs entry for cars, motorcycles, and boats.',
    href: '/services#vehicle-imports',
  },
  {
    icon: FileCheck,
    title: 'Duty Exemptions',
    description:
      'Expert guidance on qualifying for and applying duty exemptions.',
    href: '/services#duty-exemptions',
  },
  {
    icon: PawPrint,
    title: 'Animal / Pet Imports',
    description:
      'Permit coordination and customs clearance for live animal imports, including BAHFSA compliance.',
    href: '/services#animal-imports',
  }
  
]

const pillars = [
  {
    icon: Award,
    title: 'Expertise',
    description:
      'Deep knowledge of Bahamian customs law, Click2Clear, and every import classification. We get it right the first time.',
  },
  {
    icon: Clock,
    title: 'Speed',
    description:
      'Same-day entry submissions and 24-hour document turnaround. We don\'t let paperwork slow you down.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description:
      'We walk every client through their expected duties and fees upfront. No surprises at the Customs counter.',
  },
  {
    icon: Anchor,
    title: 'Bahamian',
    description:
      'Local knowledge, local relationships, and in-person presence to keep your goods moving — even when things get complicated.',
  },
]


export default function HomePage() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[92vh] flex items-center bg-navy overflow-hidden">
        {/* Background photo */}
        <Image
          src="/containers.jpg"
          alt="Shipping containers at port"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Dark navy gradient overlay — heavier on the left for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(0,20,50,0.96) 0%, rgba(0,35,70,0.85) 45%, rgba(0,20,50,0.55) 100%)',
          }}
        />

        {/* Subtle warm vignette at bottom to blend into next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(0,20,50,0.4))',
          }}
        />

        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-gold" />
                <span className="text-gold font-montserrat font-semibold text-sm tracking-[0.2em] uppercase">
                  Professional Customs Brokerage
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h1 className="font-montserrat font-extrabold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
                Your World,{' '}
                <span className="text-gold">Cleared.</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mb-10">
                Nassau&apos;s trusted customs brokerage for vehicles, goods, duty
                exemptions, and more. We carry the complexity of Bahamian customs
                so you never have to.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary">
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link href="/services" className="btn-outline-white">
                  Our Services
                </Link>
              </div>
            </AnimatedSection>

          </div>
        </div>

        <WaveDivider
          fill="#ffffff"
          variant="layered"
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      {/* ===== SERVICES PREVIEW SECTION ===== */}
      <section className="bg-white py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-12 bg-gold" />
                  <span className="text-ocean-blue font-montserrat font-semibold text-sm tracking-[0.2em] uppercase">
                    What We Do
                  </span>
                </div>
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-navy">
                  Our Services
                </h2>
              </div>
              <Link
                href="/services"
                className="text-ocean-blue font-semibold text-sm hover:text-navy transition-colors flex items-center gap-1 group"
              >
                View all services
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.08}>
                <Link
                  href={service.href}
                  className="group block bg-white rounded-2xl border-2 border-gray-100 p-8 h-full
                             hover:border-ocean-blue/30 hover:shadow-xl hover:shadow-ocean-blue/5
                             hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-lg bg-sky-blue flex items-center justify-center mb-5
                                  group-hover:bg-ocean-blue transition-colors duration-500">
                    <service.icon className="w-6 h-6 text-ocean-blue group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-montserrat font-bold text-lg text-navy mb-3 group-hover:text-ocean-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-near-black/60 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="text-ocean-blue text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#EAF4FB" bg="#ffffff" variant="gentle" />

      {/* ===== PROCESS SECTION ===== */}
      <section className="bg-sky-blue py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-gold" />
                <span className="text-ocean-blue font-montserrat font-semibold text-sm tracking-[0.2em] uppercase">
                  How It Works
                </span>
                <div className="h-px w-12 bg-gold" />
              </div>
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-navy">
                Simple, Stress-Free Clearance
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '01',
                title: 'Send Your Documents',
                description:
                  'Share your Bill of Lading, commercial invoice, and any relevant import documents with our team.',
              },
              {
                step: '02',
                title: 'We Handle Customs',
                description:
                  'We prepare and submit your customs entry via Click2Clear, calculate duties, and manage all government interactions.',
              },
              {
                step: '03',
                title: 'Goods Released',
                description:
                  'Once cleared, your goods are released for pickup or delivery. We keep you updated at every step.',
              },
            ].map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.15}>
                <div className="relative text-center md:text-left">
                  <span className="font-montserrat font-extrabold text-7xl text-navy/5 absolute -top-4 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0">
                    {item.step}
                  </span>
                  <div className="relative pt-8">
                    <div className="w-12 h-1 bg-gold rounded-full mx-auto md:mx-0 mb-6" />
                    <h3 className="font-montserrat font-bold text-xl text-navy mb-3">
                      {item.title}
                    </h3>
                    <p className="text-near-black/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>


      {/* ===== CTA BANNER ===== */}
      <section className="relative bg-navy py-20 md:py-24 section-padding overflow-hidden noise-overlay">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #003366 0%, #1A7AB5 50%, #003366 100%)',
          }}
        />
        {/* Gold accent lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Ready to Clear Your Next Shipment?
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Send us your Bill of Lading and invoice, and we&apos;ll have your entry
              submission ready within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Get a Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a href="tel:+12428194311" className="btn-outline-white">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== WHY ATLAS SECTION ===== */}
      <section className="bg-sky-blue py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-gold" />
                <span className="text-ocean-blue font-montserrat font-semibold text-sm tracking-[0.2em] uppercase">
                  Why Atlas
                </span>
                <div className="h-px w-12 bg-gold" />
              </div>
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-navy mb-4">
                Why Choose Atlas
              </h2>
              <p className="text-near-black/60 max-w-2xl mx-auto mt-2">
                As a Bahamian-owned and operated brokerage, we have the expertise,
                speed, and local relationships to keep your goods moving.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <AnimatedSection key={pillar.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 h-full border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-navy/5 hover:-translate-y-1 transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-xl bg-navy/5 flex items-center justify-center mb-6 group-hover:bg-navy group-hover:scale-110 transition-all duration-500">
                    <pillar.icon className="w-7 h-7 text-ocean-blue group-hover:text-gold transition-colors duration-500" />
                  </div>
                  <h3 className="font-montserrat font-bold text-xl text-navy mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-near-black/60 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#003366" bg="#EAF4FB" variant="gentle" />

      {/* ===== FINAL CTA ===== */}
      <section className="bg-navy py-16 section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-gold font-montserrat font-semibold text-lg italic mb-2">
              Your World, Cleared.
            </p>
            <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-white mb-8">
              Atlas Brokerage — Nassau&apos;s Trusted Customs Partner
            </h2>
            <Link href="/contact" className="btn-primary">
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
