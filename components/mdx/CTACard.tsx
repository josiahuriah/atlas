import Link from 'next/link'

interface CTACardProps {
  heading?: string
  text?: string
  href?: string
  label?: string
}

/**
 * Inline call-to-action card (sky-blue panel) for use within article bodies.
 *
 *   <CTACard heading="Ready to import?" text="Get a custom duty estimate." />
 */
export default function CTACard({
  heading = 'Ready to clear customs the easy way?',
  text = 'Get a custom duty estimate and full guidance from our team.',
  href = '/contact',
  label = 'Get a Quote',
}: CTACardProps) {
  return (
    <div className="not-prose bg-sky-blue rounded-xl px-6 py-5 my-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="font-montserrat font-bold text-sm text-navy mb-1">{heading}</div>
        <div className="font-inter text-xs text-near-black/60">{text}</div>
      </div>
      <Link
        href={href}
        className="bg-gold text-navy font-montserrat font-bold text-xs px-5 py-2.5 rounded-md
                   tracking-wide whitespace-nowrap shrink-0 transition-colors hover:bg-deep-gold"
      >
        {label}
      </Link>
    </div>
  )
}
