import type { MDXComponents } from 'mdx/types'
import PullQuote from './PullQuote'
import Checklist from './Checklist'
import ChecklistItem from './ChecklistItem'
import CTACard from './CTACard'
import PetRequirements from '@/components/pet/PetRequirements'
import PetPermitPricing from '@/components/pet/PetPermitPricing'
import PermitTimeline from '@/components/pet/PermitTimeline'

/**
 * Custom components available to every blog MDX file. Native elements (h2, p,
 * ul, a, …) are styled by the `prose` wrapper on the article page; these are
 * the branded building blocks authors can drop into the body.
 */
export const mdxComponents: MDXComponents = {
  PullQuote,
  Checklist,
  ChecklistItem,
  CTACard,
  PetRequirements,
  PetPermitPricing,
  PermitTimeline,
}
