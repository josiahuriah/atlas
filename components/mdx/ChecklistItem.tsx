import { ReactNode } from 'react'
import { Check } from 'lucide-react'

/** A single gold-checkmark row inside a <Checklist>. */
export default function ChecklistItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 font-inter text-[13px] leading-relaxed text-near-black/80">
      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" strokeWidth={3} />
      <span>{children}</span>
    </li>
  )
}
