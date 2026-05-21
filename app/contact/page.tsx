import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import WaveDivider from '@/components/WaveDivider'
import AnimatedSection from '@/components/AnimatedSection'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us — Get a Free Quote',
  description:
    'Contact Atlas Brokerage for a free customs clearance quote. Licensed customs broker in Nassau, The Bahamas. Call, email, or submit our online form.',
}

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'Nassau, New Providence\nThe Bahamas',
    href: undefined,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '(242) 819-4311',
    href: 'tel:+12428194311',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@atlasbrokeragecompany.com',
    href: 'mailto:info@atlasbrokeragecompany.com',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Monday - Friday\n9:00 AM - 5:00 PM',
    href: undefined,
  },
]

export default function ContactPage() {
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
                Get in Touch
              </span>
            </div>
            <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Contact <span className="text-gold">Us</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl">
              Ready to clear your next shipment? Tell us what you need and our
              team will respond within one business day.
            </p>
          </AnimatedSection>
        </div>
        <WaveDivider fill="#ffffff" variant="layered" className="absolute bottom-0 left-0 right-0" />
      </section>

      {/* Contact Content */}
      <section className="bg-white py-16 md:py-24 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 md:p-12">
                  <h2 className="font-montserrat font-bold text-2xl text-navy mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-mid-grey mb-8">
                    Fill out the form below and we&apos;ll get back to you with a quote
                    or answer.
                  </p>
                  <ContactForm />
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.15}>
                <div className="space-y-6 sticky top-28">
                  {/* Contact info cards */}
                  {contactInfo.map(item => (
                    <div
                      key={item.label}
                      className="bg-sky-blue/60 rounded-2xl p-6 flex items-start gap-4"
                    >
                      <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-ocean-blue" />
                      </div>
                      <div>
                        <h3 className="font-montserrat font-semibold text-sm text-navy mb-1">
                          {item.label}
                        </h3>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-near-black/70 text-sm hover:text-ocean-blue transition-colors whitespace-pre-line"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-near-black/70 text-sm whitespace-pre-line">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Quick response note */}
                  <div className="bg-navy rounded-2xl p-6 text-center">
                    <p className="text-gold font-montserrat font-semibold text-sm mb-2">
                      Quick Response Guarantee
                    </p>
                    <p className="text-white/60 text-sm">
                      We respond to all inquiries within one business day. For
                      urgent shipments, call us directly.
                    </p>
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
