import { ReactNode } from 'react'

interface ChecklistProps {
  title?: string
  children?: ReactNode
}

/**
 * A titled checklist box. Pair with <ChecklistItem> rows for the gold-check
 * styling from the Atlas blog design:
 *
 *   <Checklist title="Required Documents">
 *     <ChecklistItem>Original Bill of Lading</ChecklistItem>
 *   </Checklist>
 */
export default function Checklist({ title = 'Checklist', children }: ChecklistProps) {
  return (
    <div className="not-prose bg-[#f8fafc] border-2 border-[#e4ecf3] rounded-xl px-5 py-5 my-7">
      <div className="font-montserrat font-bold text-[10px] text-navy uppercase tracking-[0.16em] mb-3.5">
        {title}
      </div>
      <ul className="m-0 p-0 list-none flex flex-col gap-2.5">{children}</ul>
    </div>
  )
}
