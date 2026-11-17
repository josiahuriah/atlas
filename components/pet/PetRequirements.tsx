import { Dog, Cat, ShieldCheck, ShieldAlert, Syringe, CalendarClock, Bug, Microscope } from 'lucide-react'
import {
  REQUIREMENT_GROUPS,
  CERTIFICATE_NOTE,
  type SpeciesRequirement,
  type RabiesOption,
} from '@/lib/pet-permit'

interface PetRequirementsProps {
  /** Tighter spacing for use inside the permit form. */
  compact?: boolean
}

/**
 * BAHFSA veterinary certificate requirements for dogs and cats, grouped by
 * the WOAH rabies status of the exporting country. Shared by the pet import
 * blog post (via MDX) and the pet permit form's declaration step.
 */
export default function PetRequirements({ compact = false }: PetRequirementsProps) {
  return (
    <div className={`not-prose ${compact ? 'space-y-6' : 'space-y-8 my-8'}`}>
      {REQUIREMENT_GROUPS.map((group, gi) => {
        const free = group.id === 'rabies-free'
        const Icon = free ? ShieldCheck : ShieldAlert
        return (
          <section
            key={group.id}
            className={`rounded-2xl border-2 ${
              free ? 'border-[#e4ecf3] bg-[#f8fafc]' : 'border-gold/30 bg-amber-50/40'
            } ${compact ? 'p-4 md:p-5' : 'p-5 md:p-6'}`}
          >
            <div className="flex items-start gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  free ? 'bg-sky-blue text-ocean-blue' : 'bg-gold/20 text-deep-gold'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-montserrat font-bold text-[10px] uppercase tracking-[0.16em] text-mid-grey mb-0.5">
                  Scenario {gi + 1}
                </div>
                <h3 className="font-montserrat font-bold text-navy text-[15px] leading-snug">
                  {group.title}
                </h3>
                <p className="font-inter text-xs text-near-black/55 mt-0.5">{group.summary}</p>
              </div>
            </div>

            <p className="font-inter text-[13px] leading-relaxed text-near-black/70 mb-4">
              {CERTIFICATE_NOTE}
            </p>

            {group.rabiesOptions && <RabiesWindows options={group.rabiesOptions} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.species.map(s => (
                <SpeciesCard key={s.species} req={s} rabiesTimed={!!group.rabiesOptions} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

function RabiesWindows({ options }: { options: RabiesOption[] }) {
  return (
    <div className="border-l-4 border-gold bg-white rounded-r-xl px-4 py-3.5 mb-4">
      <div className="flex items-center gap-2 font-montserrat font-bold text-xs text-navy mb-2.5">
        <CalendarClock className="w-4 h-4 text-deep-gold" />
        Rabies vaccine timing (dogs &amp; cats)
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map(o => (
          <div key={o.label}>
            <div className="font-montserrat font-semibold text-[13px] text-navy">{o.label}</div>
            <div className="font-inter text-xs leading-relaxed text-near-black/65">{o.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SpeciesCard({ req, rabiesTimed }: { req: SpeciesRequirement; rabiesTimed: boolean }) {
  const Icon = req.species === 'dog' ? Dog : Cat
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
          <Icon className="w-4 h-4 text-gold" />
        </div>
        <span className="font-montserrat font-bold text-navy">{req.title}</span>
        <span className="ml-auto font-inter text-[11px] text-mid-grey">{req.age}</span>
      </div>

      <div className="flex items-center gap-1.5 font-montserrat font-semibold text-[11px] uppercase tracking-wider text-ocean-blue mb-2">
        <Syringe className="w-3.5 h-3.5" />
        Actively immunised against
      </div>
      <ul className="flex flex-wrap gap-1.5 mb-4">
        <li className="font-inter text-[11px] font-semibold px-2 py-1 rounded-md bg-navy text-white">
          Rabies{rabiesTimed ? '*' : ''}
        </li>
        {req.vaccines.map(v => (
          <li
            key={v}
            className="font-inter text-[11px] font-medium px-2 py-1 rounded-md bg-sky-blue text-navy"
          >
            {v}
          </li>
        ))}
      </ul>

      <ul className="space-y-2">
        <li className="flex items-start gap-2 font-inter text-xs leading-relaxed text-near-black/70">
          <Microscope className="w-3.5 h-3.5 text-ocean-blue shrink-0 mt-0.5" />
          {req.internalParasites}
        </li>
        <li className="flex items-start gap-2 font-inter text-xs leading-relaxed text-near-black/70">
          <Bug className="w-3.5 h-3.5 text-ocean-blue shrink-0 mt-0.5" />
          {req.externalParasites}
        </li>
      </ul>
      {rabiesTimed && (
        <p className="font-inter text-[10px] text-mid-grey mt-3">*See rabies vaccine timing above.</p>
      )}
    </div>
  )
}
