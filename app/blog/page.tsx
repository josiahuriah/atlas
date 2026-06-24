import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight, Newspaper } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import { formatDate } from '@/lib/format'
import WaveDivider from '@/components/WaveDivider'
import AnimatedSection from '@/components/AnimatedSection'
import PostImage from '@/components/blog/PostImage'

export const metadata: Metadata = {
  title: 'Customs & Import Guides — Blog',
  description:
    'Guides, tips, and updates on Bahamian customs clearance, vehicle imports, duty rates, Click2Clear, and more. Expert insights from Atlas Brokerage.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts
  const secondary = rest.slice(0, 2)
  const more = rest.slice(2)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy py-20 md:py-28 section-padding overflow-hidden noise-overlay">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-gold" />
              <span className="text-gold font-montserrat font-bold text-xs tracking-[0.22em] uppercase">
                Insights &amp; Guides
              </span>
            </div>
            <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-5">
              The Atlas <span className="text-gold">Blog</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
              Expert guides on importing to The Bahamas, customs clearance, duty
              rates, and everything you need to know about Click2Clear.
            </p>
          </AnimatedSection>
        </div>
        <WaveDivider fill="#ffffff" variant="layered" className="absolute bottom-0 left-0 right-0" />
      </section>

      {/* Blog Content */}
      <section className="bg-white py-14 md:py-20 section-padding">
        <div className="max-w-5xl mx-auto">
          {posts.length > 0 ? (
            <>
              {/* Featured article */}
              {featured && (
                <AnimatedSection>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="group block rounded-2xl overflow-hidden mb-10 shadow-[0_4px_24px_rgba(0,51,102,0.10)]
                               hover:shadow-[0_10px_36px_rgba(0,51,102,0.18)] transition-shadow duration-500"
                  >
                    <PostImage
                      src={featured.image}
                      alt={featured.title}
                      priority
                      sizes="(min-width: 1024px) 64rem, 100vw"
                      className="h-72 md:h-80"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000f32]/90 via-[#000f32]/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <span className="inline-block bg-gold text-navy font-montserrat font-extrabold text-[10px] tracking-wide px-3 py-1 rounded-full mb-3">
                          FEATURED
                        </span>
                        <h2 className="font-montserrat font-extrabold text-2xl md:text-3xl text-white leading-snug mb-3 max-w-2xl group-hover:text-gold/95 transition-colors">
                          {featured.title}
                        </h2>
                        <div className="flex items-center gap-3 text-white/65 text-xs md:text-sm">
                          <span>{formatDate(featured.date)}</span>
                          <span aria-hidden>·</span>
                          <span>{featured.author}</span>
                          <span aria-hidden>·</span>
                          <span>{featured.readingTime}</span>
                        </div>
                      </div>
                    </PostImage>
                  </Link>
                </AnimatedSection>
              )}

              {/* Secondary grid */}
              {secondary.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
                  {secondary.map((post, i) => (
                    <AnimatedSection key={post.slug} delay={i * 0.08}>
                      <ArticleCard post={post} imgClass="h-44" />
                    </AnimatedSection>
                  ))}
                </div>
              )}

              {/* More articles */}
              {more.length > 0 && (
                <div className="mt-12 pt-10 border-t-2 border-gray-100">
                  <h2 className="font-montserrat font-bold text-xl text-navy mb-6">
                    More Articles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
                    {more.map((post, i) => (
                      <AnimatedSection key={post.slug} delay={i * 0.06}>
                        <ArticleCard post={post} imgClass="h-36" compact />
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Empty state — no posts authored yet */
            <AnimatedSection>
              <div className="text-center max-w-xl mx-auto py-16 px-6">
                <div className="w-16 h-16 bg-sky-blue rounded-2xl flex items-center justify-center mx-auto mb-7">
                  <Newspaper className="w-8 h-8 text-ocean-blue" />
                </div>
                <h2 className="font-montserrat font-bold text-2xl text-navy mb-3">
                  Fresh guides are on the way
                </h2>
                <p className="text-near-black/60 leading-relaxed mb-8">
                  We&apos;re putting together clear, practical guides on importing to
                  The Bahamas — vehicles, duty rates, Click2Clear, exemptions, and
                  more. Check back soon.
                </p>
                <Link href="/contact" className="btn-primary !text-sm !py-2.5">
                  Have a question now? Get in touch
                </Link>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  )
}

function ArticleCard({
  post,
  imgClass,
  compact = false,
}: {
  post: ReturnType<typeof getAllPosts>[number]
  imgClass: string
  compact?: boolean
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full rounded-2xl border-2 border-gray-100 overflow-hidden
                 hover:border-ocean-blue/30 hover:shadow-xl hover:shadow-ocean-blue/5
                 hover:-translate-y-1 transition-all duration-500"
    >
      <PostImage
        src={post.image}
        alt={post.title}
        sizes="(min-width: 768px) 32rem, 100vw"
        className={imgClass}
      />
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 text-mid-grey text-[11px] mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formatDate(post.date)}</span>
          <span aria-hidden className="text-gray-300">
            ·
          </span>
          <span>{post.readingTime}</span>
        </div>
        <h3
          className={`font-montserrat font-bold text-navy leading-snug mb-2 group-hover:text-ocean-blue transition-colors line-clamp-2 ${
            compact ? 'text-[15px]' : 'text-base md:text-lg'
          }`}
        >
          {post.title}
        </h3>
        {!compact && post.description && (
          <p className="text-near-black/60 text-sm leading-relaxed line-clamp-2 mb-4">
            {post.description}
          </p>
        )}
        <span className="mt-auto text-ocean-blue text-xs font-semibold inline-flex items-center gap-1">
          Read more
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  )
}
