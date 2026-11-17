import Link from 'next/link'
import { Clock, Zap, ArrowRight } from 'lucide-react'
import { PET_PERMIT_PLANS, formatMoney, type PetPermitPlan } from '@/lib/pet-permit'

/** Standard vs. expedited pet permit pricing cards (blog / marketing use). */
export default function PetPermitPricing() {
  const plans = [PET_PERMIT_PLANS.standard, PET_PERMIT_PLANS.expedited]
  return (
    <div className="not-prose my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map(p => (
          <PlanCard key={p.id} plan={p} />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Link href="/pet-permit" className="btn-primary !text-sm !px-6 !py-3 gap-2">
          Apply for a Pet Permit
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

function PlanCard({ plan }: { plan: PetPermitPlan }) {
  const expedited = plan.id === 'expedited'
  const Icon = expedited ? Zap : Clock
  return (
    <div
      className={`relative rounded-2xl p-5 md:p-6 overflow-hidden ${
        expedited ? 'bg-navy text-white' : 'bg-white border-2 border-gray-100'
      }`}
    >
      {expedited && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      )}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${expedited ? 'text-gold' : 'text-ocean-blue'}`} />
          <span
            className={`font-montserrat font-bold text-[11px] uppercase tracking-[0.16em] ${
              expedited ? 'text-gold' : 'text-ocean-blue'
            }`}
          >
            {plan.name}
          </span>
        </div>
        <span
          className={`font-inter text-[11px] px-2.5 py-1 rounded-full ${
            expedited ? 'bg-white/10 text-white/80' : 'bg-sky-blue text-navy'
          }`}
        >
          {plan.turnaround}
        </span>
      </div>

      <div
        className={`font-montserrat font-extrabold text-4xl mb-4 ${expedited ? 'text-white' : 'text-navy'}`}
      >
        {formatMoney(plan.total)}
      </div>

      <dl className={`space-y-1.5 font-inter text-[13px] ${expedited ? 'text-white/70' : 'text-near-black/65'}`}>
        <Row label="Pet permit" value={plan.permit} />
        <Row label="VAT on permit" value={plan.vat} />
        <Row label="Brokerage fee" value={plan.brokerage} />
      </dl>
    </div>
  )
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between">
      <dt>{label}</dt>
      <dd className="font-medium tabular-nums">{formatMoney(value)}</dd>
    </div>
  )
}
