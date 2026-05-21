'use client'

import { useState, FormEvent } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const services = [
  'General Goods Clearance',
  'Vehicle Import',
  'Duty Exemption',
  'Animal / Pet Import',
  'Other',
]

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || 'Something went wrong')
      }

      setStatus('success')
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send message')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-montserrat font-bold text-2xl text-navy mb-3">
          Message Sent
        </h3>
        <p className="text-mid-grey max-w-md mx-auto mb-8">
          Thank you for reaching out. Our team will review your inquiry and get back to you within one business day.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-primary"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name & Email row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your full name"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-near-black
                       placeholder:text-mid-grey/60 transition-all duration-300
                       focus:border-ocean-blue focus:ring-0 focus:outline-none
                       hover:border-gray-300"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-near-black
                       placeholder:text-mid-grey/60 transition-all duration-300
                       focus:border-ocean-blue focus:ring-0 focus:outline-none
                       hover:border-gray-300"
          />
        </div>
      </div>

      {/* Phone & Service row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-navy mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="(242) 000-0000"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-near-black
                       placeholder:text-mid-grey/60 transition-all duration-300
                       focus:border-ocean-blue focus:ring-0 focus:outline-none
                       hover:border-gray-300"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-navy mb-2">
            Service Needed
          </label>
          <select
            id="service"
            name="service"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-near-black
                       transition-all duration-300
                       focus:border-ocean-blue focus:ring-0 focus:outline-none
                       hover:border-gray-300"
          >
            <option value="">Select a service</option>
            {services.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your import needs, shipment details, or any questions you have..."
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-near-black
                     placeholder:text-mid-grey/60 transition-all duration-300 resize-y min-h-[120px]
                     focus:border-ocean-blue focus:ring-0 focus:outline-none
                     hover:border-gray-300"
        />
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </>
        )}
      </button>
    </form>
  )
}
