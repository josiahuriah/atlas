import { ReactNode } from 'react'

/**
 * Emphasised pull-quote block. Uses a <div> wrapper (not <p>) because MDX wraps
 * loose inner text in its own <p> — nesting paragraphs would be invalid HTML.
 * Type styles inherit to that inner paragraph; its margin is zeroed.
 */
export default function PullQuote({ children }: { children: ReactNode }) {
  return (
    <div
      className="not-prose border-l-4 border-gold bg-amber-50 rounded-r-xl px-5 py-4 my-7
                 font-montserrat font-bold text-sm text-navy leading-relaxed [&_p]:m-0"
    >
      {children}
    </div>
  )
}
