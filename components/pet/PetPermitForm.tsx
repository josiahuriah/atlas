'use client'

import { useEffect, useRef, useState, type ReactNode, type DragEvent } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  User,
  PawPrint,
  FileUp,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle,
  AlertCircle,
  Loader2,
  BookOpen,
  UploadCloud,
  FileText,
  X,
  Clock,
  Zap,
  Dog,
  Cat,
  ShieldCheck,
  ExternalLink,
  Info,
} from 'lucide-react'
import PetRequirements from './PetRequirements'
import { COUNTRIES, PRIORITY_COUNTRIES } from '@/lib/countries'
import {
  PET_PERMIT_PLANS,
  PET_GUIDE_URL,
  CLICK2CLEAR_URL,
  formatMoney,
  type ServiceLevel,
} from '@/lib/pet-permit'

/* ------------------------------------------------------------------ */
/* Types & constants                                                   */
/* ------------------------------------------------------------------ */

type DocKey = 'vaccinationRecord' | 'petPhoto' | 'passport'

interface FormData {
  consigneeName: string
  email: string
  phone: string
  address1: string
  address2: string
  city: string
  stateProvince: string
  country: string
  arrivalDate: string
  petType: '' | 'Dog' | 'Cat'
  petName: string
  breed: string
  age: string
  ageUnit: 'years' | 'months'
  gender: '' | 'Male' | 'Female'
  neutered: '' | 'Yes' | 'No'
  birthCountry: string
  microchip: string
  weight: string
  weightUnit: 'lbs' | 'kg'
}

const INITIAL: FormData = {
  consigneeName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  stateProvince: '',
  country: '',
  arrivalDate: '',
  petType: '',
  petName: '',
  breed: '',
  age: '',
  ageUnit: 'years',
  gender: '',
  neutered: '',
  birthCountry: '',
  microchip: '',
  weight: '',
  weightUnit: 'lbs',
}

const STEPS = [
  { title: 'Traveller', subtitle: 'Consignee & arrival', icon: User },
  { title: 'Your Pet', subtitle: 'Pet details', icon: PawPrint },
  { title: 'Documents', subtitle: 'Uploads & payment', icon: FileUp },
]

const DOCS: { key: DocKey; label: string; hint: string; accept: string }[] = [
  {
    key: 'vaccinationRecord',
    label: "Pet's Vaccination Record",
    hint: 'Official record only — receipts are not accepted. PDF or image.',
    accept: 'application/pdf,image/*',
  },
  {
    key: 'petPhoto',
    label: 'Pet Picture',
    hint: 'A clear, recent photo of your pet.',
    accept: 'image/*',
  },
  {
    key: 'passport',
    label: "Consignee's Passport",
    hint: 'Photo page of the travelling consignee’s passport. PDF or image.',
    accept: 'application/pdf,image/*',
  },
]

/** Keep the whole request under Vercel's 4.5 MB serverless body limit. */
const MAX_TOTAL_BYTES = 4 * 1024 * 1024

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClass =
  'w-full px-4 py-3 rounded-lg border-2 bg-white text-near-black placeholder:text-mid-grey/60 ' +
  'transition-all duration-300 focus:border-ocean-blue focus:ring-0 focus:outline-none hover:border-gray-300'

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`
  return `${(b / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Downscale large photos in the browser so three uploads fit comfortably in
 * one request. PDFs and images the browser can't decode (e.g. HEIC outside
 * Safari) are passed through untouched.
 */
async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith('image/') || file.size < 600 * 1024) return file
  try {
    const bitmap = await createImageBitmap(file)
    const MAX = 2000
    const scale = Math.min(1, MAX / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const blob: Blob | null = await new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.82))
    if (!blob || blob.size >= file.size) return file
    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg'
    return new File([blob], name, { type: 'image/jpeg' })
  } catch {
    return file
  }
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function PetPermitForm() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [data, setData] = useState<FormData>(INITIAL)
  const [files, setFiles] = useState<Partial<Record<DocKey, File>>>({})
  const [plan, setPlan] = useState<ServiceLevel>('standard')
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')
  const [reference, setReference] = useState('')
  const [minDate, setMinDate] = useState<string>()
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const d = new Date()
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
    setMinDate(d.toISOString().slice(0, 10))
  }, [])

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData(prev => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }))
  }

  const totalBytes = Object.values(files).reduce((sum, f) => sum + (f?.size ?? 0), 0)

  function validate(s: number): Record<string, string> {
    const e: Record<string, string> = {}
    const req = (k: keyof FormData, msg = 'This field is required') => {
      if (!String(data[k]).trim()) e[k] = msg
    }
    if (s === 0) {
      req('consigneeName')
      req('email')
      if (data.email && !EMAIL_RE.test(data.email)) e.email = 'Enter a valid email address'
      req('phone')
      req('address1')
      req('city')
      req('stateProvince')
      req('country', 'Select a country')
      req('arrivalDate', 'Select your arrival date')
    }
    if (s === 1) {
      req('petType', 'Select dog or cat')
      req('petName')
      req('breed')
      req('age')
      if (data.age && Number(data.age) <= 0) e.age = 'Enter a valid age'
      req('gender', 'Select a gender')
      req('neutered', 'Select an option')
      req('birthCountry', 'Select a country')
      req('microchip')
      req('weight')
      if (data.weight && Number(data.weight) <= 0) e.weight = 'Enter a valid weight'
    }
    if (s === 2) {
      DOCS.forEach(d => {
        if (!files[d.key]) e[d.key] = 'Please upload this document'
      })
      if (totalBytes > MAX_TOTAL_BYTES)
        e.files = `Your uploads total ${formatBytes(totalBytes)}. Please keep them under ${formatBytes(MAX_TOTAL_BYTES)}.`
      if (!agreed) e.agreed = 'Please confirm the declaration to continue'
    }
    return e
  }

  function scrollTop() {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function next() {
    const e = validate(step)
    setErrors(e)
    if (Object.values(e).some(Boolean)) return
    setDirection(1)
    setStep(s => s + 1)
    scrollTop()
  }

  function back() {
    setDirection(-1)
    setStep(s => s - 1)
    scrollTop()
  }

  async function submit() {
    const e = validate(2)
    setErrors(e)
    if (Object.values(e).some(Boolean)) return

    setStatus('sending')
    setSubmitError('')
    const body = new window.FormData()
    Object.entries(data).forEach(([k, v]) => body.append(k, v))
    body.append('plan', plan)
    body.append('agreed', String(agreed))
    DOCS.forEach(d => {
      const f = files[d.key]
      if (f) body.append(d.key, f, f.name)
    })

    try {
      const res = await fetch('/api/pet-permit', { method: 'POST', body })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || 'Something went wrong')
      setReference(json.reference || '')
      setStatus('success')
      scrollTop()
    } catch (err) {
      setStatus('error')
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit application')
    }
  }

  if (status === 'success') {
    return <SuccessScreen reference={reference} plan={plan} email={data.email} petName={data.petName} />
  }

  return (
    <div ref={topRef} className="scroll-mt-32">
      {/* Guide banner */}
      <Link
        href={PET_GUIDE_URL}
        className="group flex items-center gap-4 bg-sky-blue rounded-xl px-5 py-4 mb-8 hover:bg-sky-blue/70 transition-colors"
      >
        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5 text-ocean-blue" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-montserrat font-bold text-sm text-navy">First time bringing a pet in?</div>
          <div className="font-inter text-xs text-near-black/60">
            Read our step-by-step guide to importing a pet into The Bahamas before you apply.
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-ocean-blue shrink-0 group-hover:translate-x-1 transition-transform" />
      </Link>

      <Stepper step={step} />

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {step === 0 && <StepTraveller data={data} set={set} errors={errors} minDate={minDate} />}
            {step === 1 && <StepPet data={data} set={set} errors={errors} />}
            {step === 2 && (
              <StepDocuments
                files={files}
                setFile={(k, f) => {
                  setFiles(prev => ({ ...prev, [k]: f }))
                  setErrors(prev => ({ ...prev, [k]: '', files: '' }))
                }}
                totalBytes={totalBytes}
                plan={plan}
                setPlan={setPlan}
                agreed={agreed}
                setAgreed={v => {
                  setAgreed(v)
                  if (v) setErrors(prev => ({ ...prev, agreed: '' }))
                }}
                errors={errors}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 mt-6 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <p className="text-sm text-red-700">{submitError}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 mt-10 pt-6 border-t-2 border-gray-100">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center justify-center gap-2 text-ocean-blue hover:text-navy font-semibold text-sm transition-colors py-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <span className="font-inter text-xs text-mid-grey">
            Fields marked <span className="text-red-500">*</span> are required
          </span>
        )}

        {step < STEPS.length - 1 ? (
          <button type="button" onClick={next} className="btn-primary gap-2">
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={status === 'sending'}
            className="btn-primary gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                Submit &amp; Continue to Payment
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Stepper                                                             */
/* ------------------------------------------------------------------ */

function Stepper({ step }: { step: number }) {
  return (
    <div className="mb-10">
      <ol className="grid grid-cols-3 gap-2 md:gap-4">
        {STEPS.map((s, i) => {
          const done = i < step
          const active = i === step
          return (
            <li key={s.title} className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 text-center md:text-left">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-500 ${
                  done ? 'bg-gold text-navy' : active ? 'bg-navy text-gold' : 'bg-sky-blue text-ocean-blue/50'
                }`}
              >
                {done ? <Check className="w-5 h-5" strokeWidth={3} /> : <s.icon className="w-5 h-5" />}
              </div>
              <div>
                <div className="font-montserrat font-bold text-[10px] uppercase tracking-[0.16em] text-mid-grey">
                  Step {i + 1}
                </div>
                <div className={`font-montserrat font-bold text-sm ${active || done ? 'text-navy' : 'text-near-black/40'}`}>
                  {s.title}
                </div>
                <div className="hidden md:block font-inter text-[11px] text-mid-grey">{s.subtitle}</div>
              </div>
            </li>
          )
        })}
      </ol>
      <div className="mt-5 h-1.5 rounded-full bg-sky-blue overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-ocean-blue to-gold rounded-full"
          initial={false}
          animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Field primitives                                                    */
/* ------------------------------------------------------------------ */

function Field({
  id,
  label,
  required,
  optional,
  error,
  children,
  className = '',
}: {
  id: string
  label: string
  required?: boolean
  optional?: boolean
  error?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-navy mb-2">
        {label} {required && <span className="text-red-500">*</span>}
        {optional && <span className="text-mid-grey font-normal text-xs ml-1">(optional)</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-600 mt-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  )
}

const border = (err?: string) => (err ? 'border-red-300' : 'border-gray-200')

function SectionHeading({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-6">
      <h3 className="font-montserrat font-bold text-xl text-navy gold-accent mb-5">{title}</h3>
      <p className="font-inter text-sm text-mid-grey">{text}</p>
    </div>
  )
}

function CountrySelect({
  id,
  value,
  onChange,
  error,
}: {
  id: string
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return (
    <select id={id} value={value} onChange={e => onChange(e.target.value)} className={`${inputClass} ${border(error)}`}>
      <option value="">Select a country</option>
      <optgroup label="Common">
        {PRIORITY_COUNTRIES.map(c => (
          <option key={`p-${c}`} value={c}>
            {c}
          </option>
        ))}
      </optgroup>
      <optgroup label="All countries">
        {COUNTRIES.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </optgroup>
    </select>
  )
}

function Segmented<T extends string>({
  name,
  options,
  value,
  onChange,
  error,
}: {
  name: string
  options: { value: T; label: string; icon?: ReactNode }[]
  value: string
  onChange: (v: T) => void
  error?: string
}) {
  return (
    <div role="radiogroup" aria-label={name} className="grid grid-cols-2 gap-2">
      {options.map(o => {
        const selected = value === o.value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.value)}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 font-medium text-sm transition-all duration-300 ${
              selected
                ? 'border-navy bg-navy text-white shadow-md shadow-navy/10'
                : `${border(error)} bg-white text-near-black/70 hover:border-gray-300`
            }`}
          >
            {o.icon}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

type Setter = <K extends keyof FormData>(key: K, value: FormData[K]) => void

/* ------------------------------------------------------------------ */
/* Step 1 — Traveller                                                  */
/* ------------------------------------------------------------------ */

function StepTraveller({
  data,
  set,
  errors,
  minDate,
}: {
  data: FormData
  set: Setter
  errors: Record<string, string>
  minDate?: string
}) {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="Consignee Details"
        text="The consignee is the individual who will be travelling with the pet."
      />

      <Field id="consigneeName" label="Consignee Full Name" required error={errors.consigneeName}>
        <input
          id="consigneeName"
          value={data.consigneeName}
          onChange={e => set('consigneeName', e.target.value)}
          placeholder="As it appears on your passport"
          autoComplete="name"
          className={`${inputClass} ${border(errors.consigneeName)}`}
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field id="email" label="Email Address" required error={errors.email}>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={e => set('email', e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className={`${inputClass} ${border(errors.email)}`}
          />
        </Field>
        <Field id="phone" label="Phone Number" required error={errors.phone}>
          <input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={e => set('phone', e.target.value)}
            placeholder="+1 (242) 000-0000"
            autoComplete="tel"
            className={`${inputClass} ${border(errors.phone)}`}
          />
        </Field>
      </div>

      <div className="pt-2">
        <div className="font-montserrat font-bold text-[10px] uppercase tracking-[0.16em] text-navy mb-4">
          Address
        </div>
        <div className="space-y-6">
          <Field id="address1" label="Address Line 1" required error={errors.address1}>
            <input
              id="address1"
              value={data.address1}
              onChange={e => set('address1', e.target.value)}
              placeholder="Street address"
              autoComplete="address-line1"
              className={`${inputClass} ${border(errors.address1)}`}
            />
          </Field>
          <Field id="address2" label="Address Line 2" optional>
            <input
              id="address2"
              value={data.address2}
              onChange={e => set('address2', e.target.value)}
              placeholder="Apartment, suite, unit, etc."
              autoComplete="address-line2"
              className={`${inputClass} border-gray-200`}
            />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Field id="city" label="City" required error={errors.city}>
              <input
                id="city"
                value={data.city}
                onChange={e => set('city', e.target.value)}
                autoComplete="address-level2"
                className={`${inputClass} ${border(errors.city)}`}
              />
            </Field>
            <Field id="stateProvince" label="State / Province" required error={errors.stateProvince}>
              <input
                id="stateProvince"
                value={data.stateProvince}
                onChange={e => set('stateProvince', e.target.value)}
                autoComplete="address-level1"
                className={`${inputClass} ${border(errors.stateProvince)}`}
              />
            </Field>
            <Field id="country" label="Country" required error={errors.country}>
              <CountrySelect id="country" value={data.country} onChange={v => set('country', v)} error={errors.country} />
            </Field>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <Field id="arrivalDate" label="Date of Arrival in The Bahamas" required error={errors.arrivalDate}>
          <input
            id="arrivalDate"
            type="date"
            min={minDate}
            value={data.arrivalDate}
            onChange={e => set('arrivalDate', e.target.value)}
            className={`${inputClass} ${border(errors.arrivalDate)}`}
          />
        </Field>
        <div className="flex items-start gap-3 bg-amber-50 border-l-4 border-gold rounded-r-lg px-4 py-3 self-end">
          <Clock className="w-4 h-4 text-deep-gold shrink-0 mt-0.5" />
          <p className="font-inter text-xs leading-relaxed text-near-black/70">
            Standard permits take <strong className="text-navy">5 business days</strong>. Arriving sooner? Choose{' '}
            <strong className="text-navy">Expedited (24 hrs)</strong> on step 3.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Step 2 — Pet                                                        */
/* ------------------------------------------------------------------ */

function StepPet({ data, set, errors }: { data: FormData; set: Setter; errors: Record<string, string> }) {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="Pet Details"
        text="These should match the details on your pet's vaccination record exactly."
      />

      <Field id="petType" label="Type of Pet" required error={errors.petType}>
        <Segmented
          name="Type of pet"
          value={data.petType}
          onChange={v => set('petType', v)}
          error={errors.petType}
          options={[
            { value: 'Dog', label: 'Dog', icon: <Dog className="w-4 h-4" /> },
            { value: 'Cat', label: 'Cat', icon: <Cat className="w-4 h-4" /> },
          ]}
        />
        <p className="flex items-center gap-1.5 font-inter text-xs text-mid-grey mt-2">
          <Info className="w-3.5 h-3.5 shrink-0" />
          Bringing another type of animal?{' '}
          <Link href="/contact" className="text-ocean-blue hover:underline">
            Contact us
          </Link>{' '}
          for the applicable procedure.
        </p>
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field id="petName" label="Pet Name" required error={errors.petName}>
          <input
            id="petName"
            value={data.petName}
            onChange={e => set('petName', e.target.value)}
            className={`${inputClass} ${border(errors.petName)}`}
          />
        </Field>
        <Field id="breed" label="Breed" required error={errors.breed}>
          <input
            id="breed"
            value={data.breed}
            onChange={e => set('breed', e.target.value)}
            placeholder={data.petType === 'Cat' ? 'e.g. Domestic Shorthair' : 'e.g. Labrador Retriever'}
            className={`${inputClass} ${border(errors.breed)}`}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field id="age" label="Age" required error={errors.age}>
          <div className="flex gap-2">
            <input
              id="age"
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              value={data.age}
              onChange={e => set('age', e.target.value)}
              className={`${inputClass} ${border(errors.age)}`}
            />
            <select
              aria-label="Age unit"
              value={data.ageUnit}
              onChange={e => set('ageUnit', e.target.value as FormData['ageUnit'])}
              className={`${inputClass} border-gray-200 !w-32 shrink-0`}
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
        </Field>
        <Field id="weight" label="Weight" required error={errors.weight}>
          <div className="flex gap-2">
            <input
              id="weight"
              type="number"
              min="0"
              step="0.1"
              inputMode="decimal"
              value={data.weight}
              onChange={e => set('weight', e.target.value)}
              className={`${inputClass} ${border(errors.weight)}`}
            />
            <select
              aria-label="Weight unit"
              value={data.weightUnit}
              onChange={e => set('weightUnit', e.target.value as FormData['weightUnit'])}
              className={`${inputClass} border-gray-200 !w-32 shrink-0`}
            >
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
          </div>
        </Field>
      </div>

      {data.ageUnit === 'months' && data.age && Number(data.age) <= 6 && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="font-inter text-xs leading-relaxed text-red-700">
            BAHFSA requires pets to be <strong>more than six (6) months of age</strong>. Please{' '}
            <Link href="/contact" className="underline">
              contact us
            </Link>{' '}
            before applying.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field id="gender" label="Gender" required error={errors.gender}>
          <Segmented
            name="Gender"
            value={data.gender}
            onChange={v => set('gender', v)}
            error={errors.gender}
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
            ]}
          />
        </Field>
        <Field id="neutered" label="Neutered / Spayed" required error={errors.neutered}>
          <Segmented
            name="Neutered or spayed"
            value={data.neutered}
            onChange={v => set('neutered', v)}
            error={errors.neutered}
            options={[
              { value: 'Yes', label: 'Yes' },
              { value: 'No', label: 'No' },
            ]}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field id="birthCountry" label="Country of Birth" required error={errors.birthCountry}>
          <CountrySelect
            id="birthCountry"
            value={data.birthCountry}
            onChange={v => set('birthCountry', v)}
            error={errors.birthCountry}
          />
        </Field>
        <Field id="microchip" label="Microchip #" required error={errors.microchip}>
          <input
            id="microchip"
            value={data.microchip}
            onChange={e => set('microchip', e.target.value)}
            placeholder="15-digit microchip number"
            className={`${inputClass} ${border(errors.microchip)} font-mono tracking-wide`}
          />
        </Field>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Step 3 — Documents, declaration & payment                           */
/* ------------------------------------------------------------------ */

function StepDocuments({
  files,
  setFile,
  totalBytes,
  plan,
  setPlan,
  agreed,
  setAgreed,
  errors,
}: {
  files: Partial<Record<DocKey, File>>
  setFile: (k: DocKey, f: File | undefined) => void
  totalBytes: number
  plan: ServiceLevel
  setPlan: (p: ServiceLevel) => void
  agreed: boolean
  setAgreed: (v: boolean) => void
  errors: Record<string, string>
}) {
  return (
    <div className="space-y-10">
      {/* Uploads */}
      <div>
        <SectionHeading
          title="Upload Documents"
          text="Drag and drop each file, or click to browse. Large photos are resized automatically."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DOCS.map(d => (
            <Dropzone
              key={d.key}
              label={d.label}
              hint={d.hint}
              accept={d.accept}
              file={files[d.key]}
              onFile={f => setFile(d.key, f)}
              error={errors[d.key]}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className={`font-inter text-xs ${totalBytes > MAX_TOTAL_BYTES ? 'text-red-600' : 'text-mid-grey'}`}>
            Total: {formatBytes(totalBytes)} of {formatBytes(MAX_TOTAL_BYTES)}
          </span>
          {errors.files && <span className="font-inter text-xs text-red-600">{errors.files}</span>}
        </div>
      </div>

      {/* Click2Clear reminder */}
      <div className="flex items-start gap-3 bg-sky-blue/60 rounded-xl px-5 py-4">
        <Info className="w-5 h-5 text-ocean-blue shrink-0 mt-0.5" />
        <p className="font-inter text-[13px] leading-relaxed text-near-black/70">
          The consignee must also be registered on the{' '}
          <a
            href={CLICK2CLEAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ocean-blue font-semibold hover:underline inline-flex items-center gap-1"
          >
            Customs Click2Clear portal <ExternalLink className="w-3 h-3" />
          </a>{' '}
          (takes about 1 business day). Register now if you haven&apos;t already.
        </p>
      </div>

      {/* Service level */}
      <div>
        <SectionHeading title="Choose Your Service" text="All prices are in Bahamian dollars and include VAT on the permit." />
        <div role="radiogroup" aria-label="Service level" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(['standard', 'expedited'] as const).map(id => {
            const p = PET_PERMIT_PLANS[id]
            const selected = plan === id
            const Icon = id === 'expedited' ? Zap : Clock
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setPlan(id)}
                className={`relative text-left rounded-2xl border-2 p-5 transition-all duration-300 ${
                  selected
                    ? 'border-navy bg-navy text-white shadow-xl shadow-navy/15'
                    : 'border-gray-100 bg-white hover:border-ocean-blue/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${selected ? 'text-gold' : 'text-ocean-blue'}`} />
                    <span
                      className={`font-montserrat font-bold text-[11px] uppercase tracking-[0.16em] ${
                        selected ? 'text-gold' : 'text-ocean-blue'
                      }`}
                    >
                      {p.name}
                    </span>
                  </div>
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selected ? 'border-gold bg-gold' : 'border-gray-300'
                    }`}
                  >
                    {selected && <Check className="w-3 h-3 text-navy" strokeWidth={4} />}
                  </span>
                </div>
                <div className={`font-montserrat font-extrabold text-3xl ${selected ? 'text-white' : 'text-navy'}`}>
                  {formatMoney(p.total)}
                </div>
                <div className={`font-inter text-xs mt-1 mb-4 ${selected ? 'text-white/60' : 'text-mid-grey'}`}>
                  Approved permit in {p.turnaround}
                </div>
                <dl className={`space-y-1 font-inter text-xs ${selected ? 'text-white/70' : 'text-near-black/60'}`}>
                  {[
                    ['Pet permit', p.permit],
                    ['VAT on permit', p.vat],
                    ['Brokerage fee', p.brokerage],
                  ].map(([label, v]) => (
                    <div key={label} className="flex justify-between">
                      <dt>{label}</dt>
                      <dd className="tabular-nums">{formatMoney(v as number)}</dd>
                    </div>
                  ))}
                </dl>
              </button>
            )
          })}
        </div>
      </div>

      {/* Declaration */}
      <div>
        <SectionHeading
          title="Declaration"
          text="Please review the BAHFSA veterinary requirements below before confirming."
        />
        <div className="max-h-[420px] overflow-y-auto rounded-2xl border-2 border-gray-100 p-3 md:p-4 bg-white">
          <PetRequirements compact />
        </div>
        <p className="font-inter text-xs text-mid-grey mt-2">
          Want the full explanation?{' '}
          <Link href={PET_GUIDE_URL} target="_blank" className="text-ocean-blue hover:underline">
            Read our pet import guide
          </Link>
          .
        </p>

        <label
          className={`mt-5 flex items-start gap-4 rounded-xl border-2 px-5 py-4 cursor-pointer transition-colors ${
            agreed ? 'border-gold bg-amber-50/60' : errors.agreed ? 'border-red-300 bg-red-50/40' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className={`mt-0.5 w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ocean-blue ${
              agreed ? 'bg-gold border-gold' : 'bg-white border-gray-300'
            }`}
          >
            {agreed && <Check className="w-4 h-4 text-navy" strokeWidth={3.5} />}
          </span>
          <span className="font-inter text-[13px] leading-relaxed text-near-black/75">
            I confirm that the information I have provided is true to the best of my knowledge, and that the
            vaccination record I have supplied shows my pet is vaccinated up to the date on which I plan to leave
            The Bahamas, and adheres to the BAHFSA guidelines above.
          </span>
        </label>
        {errors.agreed && (
          <p className="flex items-center gap-1.5 text-xs text-red-600 mt-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.agreed}
          </p>
        )}
      </div>

      {/* Summary */}
      <div className="bg-sky-blue rounded-xl px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-ocean-blue" />
          <div>
            <div className="font-montserrat font-bold text-sm text-navy">
              {PET_PERMIT_PLANS[plan].name} pet permit
            </div>
            <div className="font-inter text-xs text-near-black/60">
              You&apos;ll be taken to secure PayPal checkout after submitting.
            </div>
          </div>
        </div>
        <div className="font-montserrat font-extrabold text-2xl text-navy tabular-nums">
          {formatMoney(PET_PERMIT_PLANS[plan].total)}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Dropzone                                                            */
/* ------------------------------------------------------------------ */

function Dropzone({
  label,
  hint,
  accept,
  file,
  onFile,
  error,
}: {
  label: string
  hint: string
  accept: string
  file?: File
  onFile: (f: File | undefined) => void
  error?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [preview, setPreview] = useState<string>()

  useEffect(() => {
    if (!file || !file.type.startsWith('image/')) {
      setPreview(undefined)
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  async function handle(f?: File) {
    if (!f) return
    const ok =
      f.type === 'application/pdf' || f.type.startsWith('image/') || /\.(pdf|jpe?g|png|heic|webp)$/i.test(f.name)
    if (!ok || (accept === 'image/*' && !f.type.startsWith('image/'))) return
    setProcessing(true)
    onFile(await compressImage(f))
    setProcessing(false)
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    setDragging(false)
    handle(e.dataTransfer.files?.[0])
  }

  return (
    <div>
      <div className="font-montserrat font-semibold text-sm text-navy mb-2">
        {label} <span className="text-red-500">*</span>
      </div>
      {file ? (
        <div className="relative rounded-xl border-2 border-ocean-blue/30 bg-sky-blue/40 p-3 h-44 flex flex-col">
          <div className="flex-1 rounded-lg overflow-hidden bg-white flex items-center justify-center">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt={label} className="w-full h-full object-cover" />
            ) : (
              <FileText className="w-10 h-10 text-ocean-blue" />
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
            <span className="font-inter text-xs text-navy truncate flex-1" title={file.name}>
              {file.name}
            </span>
            <span className="font-inter text-[11px] text-mid-grey shrink-0">{formatBytes(file.size)}</span>
          </div>
          <button
            type="button"
            onClick={() => onFile(undefined)}
            aria-label={`Remove ${label}`}
            className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-navy text-white flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={e => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`w-full h-44 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 px-4 text-center transition-all duration-300 ${
            dragging
              ? 'border-ocean-blue bg-sky-blue scale-[1.01]'
              : error
                ? 'border-red-300 bg-red-50/40'
                : 'border-gray-200 bg-[#f8fafc] hover:border-ocean-blue/50 hover:bg-sky-blue/40'
          }`}
        >
          {processing ? (
            <Loader2 className="w-8 h-8 text-ocean-blue animate-spin" />
          ) : (
            <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center">
              <UploadCloud className="w-5 h-5 text-ocean-blue" />
            </div>
          )}
          <span className="font-inter text-sm font-medium text-navy">
            {dragging ? 'Drop file here' : 'Drop file or browse'}
          </span>
          <span className="font-inter text-[11px] leading-snug text-mid-grey">{hint}</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={e => {
          handle(e.target.files?.[0])
          e.target.value = ''
        }}
      />
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-600 mt-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Success / payment                                                   */
/* ------------------------------------------------------------------ */

function SuccessScreen({
  reference,
  plan,
  email,
  petName,
}: {
  reference: string
  plan: ServiceLevel
  email: string
  petName: string
}) {
  const p = PET_PERMIT_PLANS[plan]
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-6 md:py-10"
    >
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-navy mb-3">Application Received</h3>
      <p className="text-mid-grey max-w-md mx-auto mb-2">
        Thank you! We&apos;ve received {petName ? `${petName}'s` : 'your'} pet permit application. A confirmation has
        been sent to <span className="text-navy font-medium">{email}</span>.
      </p>
      {reference && (<p className="font-inter text-xs text-mid-grey mb-8">
        Reference: <span className="font-mono font-semibold text-navy">{reference}</span>
      </p>)}

      <div className="max-w-md mx-auto bg-navy rounded-2xl p-6 md:p-8 text-left relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="font-montserrat font-bold text-[11px] uppercase tracking-[0.16em] text-gold mb-1">
          Final step · Payment
        </div>
        <div className="font-montserrat font-bold text-white text-lg mb-4">
          {p.name} pet permit — {p.turnaround}
        </div>
        <dl className="space-y-1.5 font-inter text-sm text-white/70 mb-4">
          {[
            ['Pet permit', p.permit],
            ['VAT on permit', p.vat],
            ['Brokerage fee', p.brokerage],
          ].map(([label, v]) => (
            <div key={label} className="flex justify-between">
              <dt>{label}</dt>
              <dd className="tabular-nums">{formatMoney(v as number)}</dd>
            </div>
          ))}
          <div className="flex justify-between pt-2 mt-2 border-t border-white/10 text-white font-semibold">
            <dt>Total</dt>
            <dd className="tabular-nums font-montserrat text-xl text-gold">{formatMoney(p.total)}</dd>
          </div>
        </dl>
        {p.paypalUrl ? (
          <a href={p.paypalUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full gap-2">
            Pay {formatMoney(p.total)} with PayPal
            <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <p className="font-inter text-xs text-white/60 bg-white/5 rounded-lg px-4 py-3">
            Our team will email you a secure PayPal payment link for {formatMoney(p.total)} shortly. Your permit is
            processed once payment is received.
          </p>
        )}
        {reference && (
          <p className="font-inter text-[11px] text-white/40 mt-3 text-center">
            Please include your reference <span className="font-mono">{reference}</span> with your payment.
          </p>
        )}
      </div>
    </motion.div>
  )
}
