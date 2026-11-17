/**
 * Single source of truth for the pet permit service — fees, turnaround,
 * payment links and the BAHFSA veterinary requirements. Used by the blog
 * post, the /pet-permit form and the /api/pet-permit route.
 */

export const BAHFSA_URL = 'https://bahfsabahamas.com/'
export const PET_GUIDE_URL = '/blog/how-to-bring-a-pet-into-the-bahamas'

export type ServiceLevel = 'standard' | 'expedited'

export interface PetPermitPlan {
  id: ServiceLevel
  name: string
  turnaround: string
  permit: number
  vat: number
  brokerage: number
  total: number
  /**
   * PayPal payment link for this plan.
   * TODO: paste the PayPal links here once they're created.
   */
  paypalUrl: string
}

export const PET_PERMIT_PLANS: Record<ServiceLevel, PetPermitPlan> = {
  standard: {
    id: 'standard',
    name: 'Standard',
    turnaround: '5 business days',
    permit: 50,
    vat: 5,
    brokerage: 20,
    total: 75,
    paypalUrl: '',
  },
  expedited: {
    id: 'expedited',
    name: 'Expedited',
    turnaround: '24 hours',
    permit: 150,
    vat: 15,
    brokerage: 85,
    total: 250,
    paypalUrl: '',
  },
}

export const formatMoney = (n: number) => `$${n.toFixed(2)}`

/* ------------------------------------------------------------------ */
/* BAHFSA veterinary requirements                                      */
/* ------------------------------------------------------------------ */

export type Species = 'dog' | 'cat'

export interface RabiesOption {
  label: string
  detail: string
}

export interface SpeciesRequirement {
  species: Species
  title: string
  age: string
  /** Immunisations other than rabies. */
  vaccines: string[]
  internalParasites: string
  externalParasites: string
}

export interface RequirementGroup {
  id: 'rabies-free' | 'not-rabies-free'
  title: string
  summary: string
  /** null = rabies vaccination required with no timing window. */
  rabiesOptions: RabiesOption[] | null
  species: SpeciesRequirement[]
}

const DOG_VACCINES = ['Distemper', 'Hepatitis', 'Leptospirosis', 'Parvovirus', 'Adenovirus']
const CAT_VACCINES = [
  'Feline Leukemia',
  'Feline Rhinotracheitis',
  'Feline Calicivirus',
  'Feline Panleukopenia',
  'Feline Pneumonitis',
]

const RABIES_WINDOWS: RabiesOption[] = [
  {
    label: '1-year duration vaccine',
    detail:
      'Must have been administered not more than ten (10) months and not less than one (1) month prior to importation.',
  },
  {
    label: '3-year duration vaccine',
    detail:
      'Must have been administered not more than thirty-four (34) months and not less than one (1) month prior to importation.',
  },
]

export const CERTIFICATE_NOTE =
  'A valid vaccination certificate is required and must attest to the following.'

export const REQUIREMENT_GROUPS: RequirementGroup[] = [
  {
    id: 'rabies-free',
    title: 'From a rabies-free country, zone or compartment',
    summary: 'As recognised by the World Organization for Animal Health (WOAH).',
    rabiesOptions: null,
    species: [
      {
        species: 'dog',
        title: 'Dogs',
        age: 'More than six (6) months of age',
        vaccines: DOG_VACCINES,
        internalParasites:
          'Free of internal parasites, as determined by a negative test result using a stool sample test',
        externalParasites: 'Free of external parasites',
      },
      {
        species: 'cat',
        title: 'Cats',
        age: 'More than six (6) months of age, since birth',
        vaccines: CAT_VACCINES,
        internalParasites:
          'Free of internal parasites, as determined by a negative faecal matter test result',
        externalParasites: 'Free of external parasites',
      },
    ],
  },
  {
    id: 'not-rabies-free',
    title: 'From a country, zone or compartment NOT free from rabies',
    summary: 'As recognised by the World Organization for Animal Health (WOAH).',
    rabiesOptions: RABIES_WINDOWS,
    species: [
      {
        species: 'dog',
        title: 'Dogs',
        age: 'More than six (6) months of age',
        vaccines: DOG_VACCINES,
        internalParasites:
          'Free of internal parasites, as determined by a negative faecal matter test result',
        externalParasites: 'Free of external parasites',
      },
      {
        species: 'cat',
        title: 'Cats',
        age: 'More than six (6) months of age',
        vaccines: CAT_VACCINES,
        internalParasites:
          'Free of internal parasites, as determined by a negative faecal matter test result',
        externalParasites: 'Free of external parasites',
      },
    ],
  },
]
