import { UserCheck, FileCheck2, PlaneLanding } from 'lucide-react'

const steps = [
  {
    icon: UserCheck,
    label: 'Click2Clear registration',
    time: '1 business day',
    text: 'Handled by Atlas Brokerage as part of our brokerage service.',
  },
  {
    icon: FileCheck2,
    label: 'BAHFSA pet permit approval',
    time: '3 business days',
    text: 'Standard permit review by the Bahamas Agricultural Health and Food Safety Authority.',
  },
  {
    icon: PlaneLanding,
    label: 'Arrive with your pet',
    time: 'Start 1 week ahead',
    text: 'We recommend beginning at least one week before you travel.',
  },
]

/** Three-step horizontal timeline of the pet permit lead time. */
export default function PermitTimeline() {
  return (
    <div className="not-prose my-8 grid grid-cols-1 md:grid-cols-3 gap-3">
      {steps.map((s, i) => (
        <div key={s.label} className="relative bg-[#f8fafc] border-2 border-[#e4ecf3] rounded-xl p-4">
          <div className="flex items-center gap-2.5 mb-3">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                i === steps.length - 1 ? 'bg-gold text-navy' : 'bg-navy text-gold'
              }`}
            >
              <s.icon className="w-4 h-4" />
            </div>
            <span className="font-montserrat font-bold text-[10px] uppercase tracking-[0.16em] text-mid-grey">
              Step {i + 1}
            </span>
          </div>
          <div className="font-montserrat font-bold text-sm text-navy leading-snug">{s.label}</div>
          <div className="font-montserrat font-semibold text-xs text-ocean-blue mt-1 mb-2">{s.time}</div>
          <p className="font-inter text-xs leading-relaxed text-near-black/65">{s.text}</p>
        </div>
      ))}
    </div>
  )
}
