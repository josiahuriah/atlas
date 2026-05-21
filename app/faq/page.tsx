import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import WaveDivider from '@/components/WaveDivider'
import AnimatedSection from '@/components/AnimatedSection'
import FaqAccordion from '@/components/FaqAccordion'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Customs Broker FAQ',
  description:
    'Answers to common questions about customs brokerage in The Bahamas. Duty rates, clearance timelines, required documents, Click2Clear, vehicle imports, and more.',
}

const faqItems = [
  {
    question: 'How long does customs clearance take in The Bahamas?',
    answer:
      'Standard customs clearance typically takes 3-5 business days once all documents are submitted and duties are paid. For urgent shipments, we offer same-day entry submissions which can significantly speed up the process. The exact timeline depends on the type of goods, completeness of documentation, and any inspections required by Customs.',
  },
  {
    question: 'What documents do I need to clear customs?',
    answer:
      'The core documents required for most imports are: a Bill of Lading (or Airway Bill for air cargo), a commercial invoice showing the value of goods, a packing list, and your import permit if applicable. For vehicle imports, you will also need the vehicle title, purchase invoice, and registration. Our team reviews all your documents before submission to ensure nothing is missing.',
  },
  {
    question: 'How much are customs broker fees?',
    answer:
      'Broker fees vary depending on the type and complexity of your import. We provide transparent, upfront quotes before any work begins — no hidden fees or surprises. Contact us with details about your shipment and we will provide a clear breakdown of all costs, including estimated duties and our service fee.',
  },
  {
    question: 'How do I import a car to The Bahamas?',
    answer:
      'Vehicle imports require specific documentation including the Bill of Lading, vehicle title, purchase invoice, and registration. Import duty on vehicles ranges from 45-65% for petrol vehicles and 10% for electric vehicles, calculated on the assessed value. Vehicles must be less than 10 years old. Atlas Brokerage handles the entire process from document preparation to Click2Clear entry submission and port coordination.',
  },
  {
    question: 'What is Click2Clear?',
    answer:
      'Click2Clear is the official electronic customs management system used by the Bahamas Customs Department. All import and export entries must be filed through this system. As a registered Click2Clear broker, Atlas Brokerage files your entries directly in the system, tracks their status, and manages all interactions with Customs on your behalf.',
  },
  {
    question: 'Do I need a customs broker to import goods?',
    answer:
      'While it is technically possible to file your own customs entries, working with a licensed broker ensures your documentation is correct, duties are properly calculated, and your goods clear without delays. Errors in customs filings can result in penalties, goods being held, or overpayment of duties. A broker saves you time, reduces risk, and often saves money through accurate duty classification.',
  },
  {
    question: 'What are the duty rates in The Bahamas?',
    answer:
      'Duty rates in The Bahamas vary by product category. Common rates include 45-65% for vehicles (10% for electric), 5-35% for general consumer goods, and 0-10% for essential items. Some goods qualify for exemptions or reduced rates. We calculate your exact duty obligation upfront so you know precisely what to expect before your goods arrive.',
  },
  {
    question: 'Can I get a duty exemption on my imports?',
    answer:
      'Yes, several categories of duty exemption exist in The Bahamas. Returning residents may qualify for exemptions on household goods and personal effects. First-time homeowners can apply for duty relief on building materials. Religious organizations, charities, and businesses under certain government programmes may also qualify. Atlas Brokerage guides you through the eligibility assessment and application process.',
  },
  {
    question: 'How do I import a pet to The Bahamas?',
    answer:
      'Pet imports require an import permit from BAHFSA (Bahamas Agricultural Health and Food Safety Authority), a veterinary health certificate issued within 48 hours of travel, current vaccination records including rabies, and a microchip. Certain breeds may be restricted. Atlas Brokerage coordinates the permit application and customs clearance so your pet arrives safely and legally.',
  },
  {
    question: 'What is the difference between a customs broker and a freight forwarder?',
    answer:
      'A customs broker specialises in the legal and regulatory side of importing — filing customs entries, calculating duties, and ensuring compliance with government requirements. A freight forwarder handles the physical logistics of moving goods from origin to destination. Atlas Brokerage offers both services, giving you a single point of contact for the entire import process.',
  },
  {
    question: 'Do you handle imports to the Family Islands?',
    answer:
      'Yes. While our office is based in Nassau, we handle customs clearance for goods destined for any island in The Bahamas. Goods cleared through Nassau can be trans-shipped to the Family Islands, and we coordinate this process as part of our service.',
  },
  {
    question: 'How do I get a quote?',
    answer:
      'Getting a quote is simple. You can fill out our online contact form, call us, or email us directly with details about your shipment — what you are importing, where it is coming from, and the approximate value. We will respond within one business day with a clear, detailed quote covering all expected costs.',
  },
]

export default function FaqPage() {
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
                Help Centre
              </span>
            </div>
            <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Frequently Asked{' '}
              <span className="text-gold">Questions</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl">
              Everything you need to know about customs clearance in The Bahamas.
              Can&apos;t find your answer? Contact us directly.
            </p>
          </AnimatedSection>
        </div>
        <WaveDivider fill="#ffffff" variant="layered" className="absolute bottom-0 left-0 right-0" />
      </section>

      {/* FAQ schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map(item => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* FAQ Content */}
      <section className="bg-white py-16 md:py-24 section-padding">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <FaqAccordion items={faqItems} />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sky-blue py-16 md:py-20 section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-navy mb-4">
              Still Have Questions?
            </h2>
            <p className="text-near-black/60 max-w-xl mx-auto mb-8">
              Our team is happy to help. Reach out and we&apos;ll get you the
              answers you need within one business day.
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
