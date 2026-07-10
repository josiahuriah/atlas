import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock, ArrowUpRight, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      {/* Decorative wave top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path
            d="M0,40 C240,60 480,20 720,35 C960,50 1200,15 1440,30 L1440,0 L0,0 Z"
            fill="#003366"
            opacity="0.3"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image src="/logo.png" alt="Atlas Brokerage" width={44} height={44} />
              <div>
                <span className="text-white font-montserrat font-bold text-lg tracking-wide">
                  ATLAS
                </span>
                <span className="text-ocean-blue font-montserrat text-xs tracking-[0.25em] block -mt-0.5">
                  BROKERAGE
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Nassau&apos;s trusted customs brokerage. We carry the complexity of
              Bahamian customs so you never have to.
            </p>
            <p className="text-gold text-sm font-montserrat font-semibold italic">
              Your World, Cleared.
            </p>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-montserrat font-semibold text-sm tracking-wider uppercase mb-6 text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/services', label: 'Services' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold text-sm transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-montserrat font-semibold text-sm tracking-wider uppercase mb-6 text-white">
              Resources
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/faq', label: 'FAQ' },
                { href: '/blog', label: 'Import Guides' },
                { href: '/services#vehicle-imports', label: 'Vehicle Imports' },
                { href: '/services#duty-exemptions', label: 'Duty Exemptions' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold text-sm transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-montserrat font-semibold text-sm tracking-wider uppercase mb-6 text-white">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">Nassau, The Bahamas</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <a href="tel:+12428194311" className="text-white/60 hover:text-white text-sm transition-colors">
                  (242) 819-4311
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <a
                  href="https://wa.me/12428194311"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  WhatsApp us
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <a href="mailto:info@atlasbrokeragecompany.com" className="text-white/60 hover:text-white text-sm transition-colors">
                  info@atlasbrokeragecompany.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">Mon-Fri: 9AM - 5PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} Atlas Brokerage. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/faq" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
