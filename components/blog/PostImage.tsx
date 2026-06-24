import Image from 'next/image'
import { ReactNode } from 'react'

interface PostImageProps {
  /** Path under /public. When omitted, a branded gradient placeholder renders instead. */
  src?: string
  alt: string
  /** Tailwind classes for the wrapper (set the height/radius here). */
  className?: string
  /** Sizes hint forwarded to next/image when a real image is used. */
  sizes?: string
  priority?: boolean
  /** Overlays (gradient scrim, badges, captions) rendered above the image. */
  children?: ReactNode
}

/**
 * The blog's signature image surface: a navy→ocean gradient with a fine
 * diagonal hatch, mirroring the Atlas blog design. When a cover `src` is
 * supplied it shows the real photo instead; overlays render on top of either.
 */
export default function PostImage({
  src,
  alt,
  className = '',
  sizes = '100vw',
  priority = false,
  children,
}: PostImageProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#001f4d] to-ocean-blue ${className}`}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 40px)',
          }}
        />
      )}
      {children}
    </div>
  )
}
