import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllSlugs } from '@/lib/blog'
import { formatDate } from '@/lib/format'
import AnimatedSection from '@/components/AnimatedSection'
import PostImage from '@/components/blog/PostImage'
import { mdxComponents } from '@/components/mdx'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  return (
    <article>
      {/* Hero — navy header with full-bleed cover image */}
      <section className="bg-navy relative overflow-hidden noise-overlay">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative z-10 section-padding pt-14 md:pt-16 pb-10 md:pb-12">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/55 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <div className="flex items-center gap-3 text-white/55 text-xs md:text-sm mb-5">
              <span>{formatDate(post.date, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="font-montserrat font-extrabold text-3xl md:text-4xl text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Full-bleed cover image bleeding out of the navy header */}
        <PostImage
          src={post.image}
          alt={post.title}
          priority
          className="h-56 md:h-72 lg:h-80"
        />
      </section>

      {/* Article body */}
      <section className="bg-white py-12 md:py-16 section-padding">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            {/* Author / meta card */}
            <div className="flex items-center gap-4 pb-5 mb-7 border-b-2 border-gray-100">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-navy to-ocean-blue shrink-0 flex items-center justify-center font-montserrat font-bold text-white text-lg">
                  {post.author[0]}
                </div>
              <div className="flex-1">
                <div className="font-montserrat font-bold text-sm text-navy">{post.author}</div>
                <div className="font-inter text-[11px] text-mid-grey">
                  Licensed Customs Broker · Nassau, Bahamas
                </div>
              </div>
              <div className="text-right">
                <div className="font-inter text-xs text-mid-grey">{post.readingTime}</div>
              </div>
            </div>

            {/* Lead / standfirst */}
            {post.description && (
              <p className="font-inter text-[15px] md:text-base leading-[1.85] text-near-black/85 mb-6">
                {post.description}
              </p>
            )}

            {/* Body */}
            <div
              className="prose prose-lg max-w-none
                         prose-headings:font-montserrat prose-headings:text-navy prose-headings:font-bold
                         prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
                         prose-p:text-near-black/75 prose-p:leading-[1.8]
                         prose-a:text-ocean-blue prose-a:no-underline hover:prose-a:underline
                         prose-strong:text-navy prose-li:text-near-black/75
                         prose-img:rounded-xl prose-img:shadow-md prose-img:w-full
                         prose-table:text-sm prose-th:font-montserrat prose-th:text-navy"
            >
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>
          </AnimatedSection>

          {/* Closing CTA */}
          <div className="bg-sky-blue rounded-xl px-6 py-5 mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-montserrat font-bold text-sm text-navy mb-1">
                Ready to clear customs the easy way?
              </div>
              <div className="font-inter text-xs text-near-black/60">
                Get a custom duty estimate and full guidance from our team.
              </div>
            </div>
            <Link
              href="/contact"
              className="bg-gold text-navy font-montserrat font-bold text-xs px-5 py-2.5 rounded-md
                         tracking-wide whitespace-nowrap shrink-0 transition-colors hover:bg-deep-gold"
            >
              Get a Quote
            </Link>
          </div>

          {/* Back link */}
          <div className="mt-8 pt-6 border-t-2 border-gray-100">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-ocean-blue hover:text-navy font-semibold text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all posts
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
