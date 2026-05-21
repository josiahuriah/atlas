import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import WaveDivider from '@/components/WaveDivider'
import AnimatedSection from '@/components/AnimatedSection'

export const metadata: Metadata = {
  title: 'Customs & Import Guides — Blog',
  description:
    'Guides, tips, and updates on Bahamian customs clearance, vehicle imports, duty rates, Click2Clear, and more. Expert insights from Atlas Brokerage.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy py-24 md:py-32 section-padding overflow-hidden noise-overlay">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold font-montserrat font-semibold text-sm tracking-[0.2em] uppercase">
                Insights & Guides
              </span>
            </div>
            <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              The Atlas <span className="text-gold">Blog</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl">
              Expert guides on importing to The Bahamas, customs clearance
              processes, duty rates, and everything you need to know about
              Click2Clear.
            </p>
          </AnimatedSection>
        </div>
        <WaveDivider fill="#ffffff" variant="layered" className="absolute bottom-0 left-0 right-0" />
      </section>

      {/* Blog Content */}
      <section className="bg-white py-16 md:py-24 section-padding">
        <div className="max-w-7xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <AnimatedSection key={post.slug} delay={i * 0.08}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block bg-white rounded-2xl border-2 border-gray-100 overflow-hidden
                               hover:border-ocean-blue/30 hover:shadow-xl hover:shadow-ocean-blue/5
                               hover:-translate-y-1 transition-all duration-500"
                  >
                    {/* Image placeholder */}
                    <div className="h-48 bg-gradient-to-br from-navy to-ocean-blue relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-white/20" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-gold text-navy text-xs font-semibold px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-mid-grey text-xs mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {post.author}
                        </span>
                      </div>
                      <h2 className="font-montserrat font-bold text-lg text-navy mb-2 group-hover:text-ocean-blue transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-near-black/60 text-sm leading-relaxed line-clamp-3 mb-4">
                        {post.description}
                      </p>
                      <span className="text-ocean-blue text-sm font-semibold flex items-center gap-1">
                        Read more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            /* Empty state */
            <AnimatedSection>
              <div className="text-center py-20 px-6">
                <div className="w-20 h-20 bg-sky-blue rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <BookOpen className="w-10 h-10 text-ocean-blue" />
                </div>
                <h2 className="font-montserrat font-bold text-2xl text-navy mb-4">
                  Coming Soon
                </h2>
                <p className="text-near-black/60 max-w-lg mx-auto mb-8 leading-relaxed">
                  We&apos;re preparing expert guides on importing to The Bahamas,
                  understanding duty rates, navigating Click2Clear, and much more.
                  Check back soon for helpful content.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    'Vehicle Import Guides',
                    'Duty Rate Breakdowns',
                    'Click2Clear Tips',
                    'Exemption Explainers',
                  ].map(tag => (
                    <span
                      key={tag}
                      className="bg-sky-blue text-ocean-blue text-sm px-4 py-2 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  )
}
