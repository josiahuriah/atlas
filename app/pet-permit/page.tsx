import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, Camera, BookUser, Clock, Zap, Phone, ArrowRight } from 'lucide-react'
import WaveDivider from '@/components/WaveDivider'
import AnimatedSection from '@/components/AnimatedSection'
import PetPermitForm from '@/components/pet/PetPermitForm'
import { PET_PERMIT_PLANS, PET_GUIDE_URL, formatMoney } from '@/lib/pet-permit'

export const metadata: Metadata = {
  title: 'Pet Permit Application — Bring Your Dog or Cat to The Bahamas',
  description:
    'Apply online for a BAHFSA pet permit to bring your dog or cat into The Bahamas. Standard 5-day or expedited 24-hour service from Atlas Brokerage.',
}

const needs = [
  { icon: FileText, label: 'Official vaccination record', text: 'Not a receipt — must show clinic, vet, pet details and validity.' },
  { icon: Camera, label: 'A picture of your pet', text: 'Clear and recent.' },
  { icon: BookUser, label: "Consignee's passport", text: 'Photo page of the person travelling with the pet.' },
]

export default function PetPermitPage() {
  const { standard, expedited } = PET_PERMIT_PLANS
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
                Pet Imports
              </span>
            </div>
            <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Pet Permit <span className="text-gold">Application</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mb-8">
              Bringing your dog or cat to The Bahamas? Submit your details and documents in three quick
              steps and we&apos;ll secure your BAHFSA pet permit.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 text-gold" />
                Standard · {standard.turnaround} · {formatMoney(standard.total)}
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm px-4 py-2 rounded-full">
                <Zap className="w-4 h-4 text-gold" />
                Expedited · {expedited.turnaround} · {formatMoney(expedited.total)}
              </span>
            </div>
          </AnimatedSection>
        </div>
        <WaveDivider fill="#ffffff" variant="layered" className="absolute bottom-0 left-0 right-0" />
      </section>

      {/* Form + sidebar */}
      <section className="bg-white py-16 md:py-24 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 sm:p-8 md:p-12">
                  <PetPermitForm />
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-1">
              <AnimatedSection delay={0.15}>
                <div className="space-y-6 sticky top-28">
                  <div className="bg-sky-blue/60 rounded-2xl p-6">
                    <h3 className="font-montserrat font-semibold text-sm text-navy tracking-wide uppercase mb-5">
                      Have These Ready
                    </h3>
                    <ul className="space-y-4">
                      {needs.map(n => (
                        <li key={n.label} className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
                            <n.icon className="w-5 h-5 text-ocean-blue" />
                          </div>
                          <div>
                            <div className="font-montserrat font-semibold text-sm text-navy">{n.label}</div>
                            <div className="text-near-black/60 text-xs leading-relaxed">{n.text}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={PET_GUIDE_URL}
                    className="group block bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-ocean-blue/30 hover:shadow-lg hover:shadow-ocean-blue/5 transition-all"
                  >
                    <div className="font-montserrat font-bold text-[10px] uppercase tracking-[0.16em] text-ocean-blue mb-2">
                      Import Guide
                    </div>
                    <div className="font-montserrat font-bold text-navy mb-2 leading-snug">
                      How to Bring Your Pet into The Bahamas
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-ocean-blue text-sm font-semibold">
                      Read the guide
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>

                  <div className="bg-navy rounded-2xl p-6 text-center">
                    <p className="text-gold font-montserrat font-semibold text-sm mb-2">Not a dog or cat?</p>
                    <p className="text-white/60 text-sm mb-4">
                      Other animals follow different procedures. Get in touch and we&apos;ll advise.
                    </p>
                    <a
                      href="tel:+12428194311"
                      className="inline-flex items-center gap-2 text-white text-sm hover:text-gold transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      (242) 819-4311
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
