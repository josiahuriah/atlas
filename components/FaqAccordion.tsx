'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  items: FaqItem[]
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className={`border-2 rounded-xl transition-all duration-300 ${
              isOpen
                ? 'border-ocean-blue/30 bg-sky-blue/50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
              aria-expanded={isOpen}
            >
              <span className={`font-montserrat font-semibold text-base transition-colors ${
                isOpen ? 'text-navy' : 'text-near-black'
              }`}>
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                  isOpen ? 'rotate-180 text-ocean-blue' : 'text-mid-grey'
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-5">
                <div className="w-12 h-0.5 bg-gold rounded-full mb-4" />
                <p className="text-near-black/80 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
