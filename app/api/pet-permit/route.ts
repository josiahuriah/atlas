import { NextResponse } from 'next/server'
import { PET_PERMIT_PLANS, formatMoney, type ServiceLevel } from '@/lib/pet-permit'

export const runtime = 'nodejs'

const REQUIRED_FIELDS = [
  'consigneeName',
  'email',
  'phone',
  'address1',
  'city',
  'stateProvince',
  'country',
  'arrivalDate',
  'petType',
  'petName',
  'breed',
  'age',
  'gender',
  'neutered',
  'birthCountry',
  'microchip',
  'weight',
] as const

const FILE_FIELDS = [
  { key: 'vaccinationRecord', label: 'Vaccination Record' },
  { key: 'petPhoto', label: 'Pet Picture' },
  { key: 'passport', label: 'Consignee Passport' },
] as const

const MAX_FILE_BYTES = 4.5 * 1024 * 1024
const ALLOWED_TYPES = /^(image\/.+|application\/pdf)$/

const escape = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

function makeReference() {
  const d = new Date()
  const ymd = d.toISOString().slice(0, 10).replace(/-/g, '')
  return `PP-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

const row = (label: string, value: string) =>
  `<tr><td style="padding:6px 12px 6px 0;color:#888;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#111">${escape(value) || '—'}</td></tr>`

const section = (title: string, rows: string) =>
  `<h3 style="font-family:Arial,sans-serif;color:#003366;margin:24px 0 8px;font-size:15px;border-bottom:2px solid #F5C518;padding-bottom:6px">${title}</h3><table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>`

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const get = (k: string) => String(form.get(k) ?? '').trim()

    // Validate text fields
    const missing = REQUIRED_FIELDS.filter(k => !get(k))
    if (missing.length) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get('email'))) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }
    if (!['Dog', 'Cat'].includes(get('petType'))) {
      return NextResponse.json(
        { error: 'Online applications are for dogs and cats only. Please contact us for other animals.' },
        { status: 400 },
      )
    }
    if (get('agreed') !== 'true') {
      return NextResponse.json({ error: 'Please confirm the declaration.' }, { status: 400 })
    }
    const planId = (get('plan') === 'expedited' ? 'expedited' : 'standard') as ServiceLevel
    const plan = PET_PERMIT_PLANS[planId]

    // Validate files
    const attachments: { filename: string; content: Buffer }[] = []
    for (const { key, label } of FILE_FIELDS) {
      const file = form.get(key)
      if (!(file instanceof File) || file.size === 0) {
        return NextResponse.json({ error: `Please upload the ${label.toLowerCase()}.` }, { status: 400 })
      }
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: `The ${label.toLowerCase()} file is too large.` }, { status: 400 })
      }
      if (file.type && !ALLOWED_TYPES.test(file.type)) {
        return NextResponse.json({ error: `The ${label.toLowerCase()} must be a PDF or image.` }, { status: 400 })
      }
      const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin'
      attachments.push({
        filename: `${label.replace(/\s+/g, '-')}-${get('petName').replace(/[^\w-]+/g, '') || 'pet'}.${ext}`,
        content: Buffer.from(await file.arrayBuffer()),
      })
    }

    const reference = makeReference()

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not set — cannot deliver pet permit application.')
      return NextResponse.json(
        { error: 'Something went wrong. Please try again or contact us directly.' },
        { status: 500 },
      )
    }

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    const from = process.env.EMAIL_FROM || 'Atlas Brokerage <noreply@atlasbrokeragecompany.com>'
    const to = process.env.PET_PERMIT_EMAIL || process.env.CONTACT_EMAIL || 'info@atlasbrokeragecompany.com'

    const address = [get('address1'), get('address2'), get('city'), get('stateProvince'), get('country')]
      .filter(Boolean)
      .join(', ')

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:640px">
        <div style="background:#003366;padding:20px 24px;border-radius:12px 12px 0 0">
          <div style="color:#F5C518;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:bold">New Pet Permit Application</div>
          <div style="color:#fff;font-size:20px;font-weight:bold;margin-top:4px">${escape(get('petName'))} · ${escape(get('petType'))}</div>
          <div style="color:rgba(255,255,255,.6);font-size:13px;margin-top:4px">Ref ${reference} · ${plan.name} (${plan.turnaround}) · ${formatMoney(plan.total)}</div>
        </div>
        <div style="padding:8px 24px 24px;border:2px solid #eee;border-top:0;border-radius:0 0 12px 12px">
          ${section(
            'Consignee',
            row('Name', get('consigneeName')) +
              row('Email', get('email')) +
              row('Phone', get('phone')) +
              row('Address', address) +
              row('Arrival date', get('arrivalDate')),
          )}
          ${section(
            'Pet',
            row('Type', get('petType')) +
              row('Name', get('petName')) +
              row('Breed', get('breed')) +
              row('Age', `${get('age')} ${get('ageUnit')}`) +
              row('Gender', get('gender')) +
              row('Neutered / Spayed', get('neutered')) +
              row('Country of birth', get('birthCountry')) +
              row('Microchip #', get('microchip')) +
              row('Weight', `${get('weight')} ${get('weightUnit')}`),
          )}
          ${section(
            'Service & Payment',
            row('Service', `${plan.name} — ${plan.turnaround}`) +
              row('Pet permit', formatMoney(plan.permit)) +
              row('VAT on permit', formatMoney(plan.vat)) +
              row('Brokerage fee', formatMoney(plan.brokerage)) +
              row('Total', formatMoney(plan.total)) +
              row('Declaration', 'Agreed'),
          )}
          <p style="font-size:12px;color:#888;margin-top:24px">Attached: vaccination record, pet picture, consignee passport. Submitted ${new Date().toUTCString()}.</p>
        </div>
      </div>`

    const { error: sendError } = await resend.emails.send({
      from,
      to,
      replyTo: get('email'),
      subject: `Pet Permit Application ${reference} — ${get('petName')} (${plan.name})`,
      html,
      attachments,
    })

    if (sendError) {
      console.error('Resend API error:', sendError)
      return NextResponse.json(
        { error: 'Something went wrong. Please try again or contact us directly.' },
        { status: 500 },
      )
    }

    // Customer confirmation — best effort, never fails the request.
    try {
      const payLine = plan.paypalUrl
        ? `<p><a href="${plan.paypalUrl}" style="display:inline-block;background:#F5C518;color:#003366;font-weight:bold;padding:12px 20px;border-radius:6px;text-decoration:none">Pay ${formatMoney(plan.total)} with PayPal</a></p>`
        : `<p>Our team will send you a secure PayPal payment link for <strong>${formatMoney(plan.total)}</strong> shortly.</p>`
      await resend.emails.send({
        from,
        to: get('email'),
        replyTo: to,
        subject: `We've received your pet permit application (${reference})`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;color:#111">
            <h2 style="color:#003366">Thank you, ${escape(get('consigneeName'))}!</h2>
            <p>We've received the pet permit application for <strong>${escape(get('petName'))}</strong>.</p>
            <p><strong>Reference:</strong> ${reference}<br/>
               <strong>Service:</strong> ${plan.name} — approved permit in ${plan.turnaround}<br/>
               <strong>Arrival date:</strong> ${escape(get('arrivalDate'))}</p>
            ${payLine}
            <p>Your permit is processed once payment is received. Your Click2Clear registration is handled by us as part of our brokerage service.</p>
            <p style="color:#888;font-size:12px">Atlas Brokerage · Nassau, The Bahamas · (242) 819-4311</p>
          </div>`,
      })
    } catch (e) {
      console.error('Confirmation email failed:', e)
    }

    return NextResponse.json({ success: true, reference }, { status: 201 })
  } catch (error) {
    console.error('Pet permit error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or contact us directly.' },
      { status: 500 },
    )
  }
}
