import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllSlugs } from '@/lib/blog'
import AnimatedSection from '@/components/AnimatedSection'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map(slug => ({ slug }))
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
    <>
      {/* Hero */}
      <section className="bg-navy py-24 md:py-32 section-padding relative overflow-hidden noise-overlay">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <AnimatedSection>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <div className="flex items-center gap-4 text-white/50 text-sm mb-6">
              <span className="bg-gold/20 text-gold text-xs font-semibold px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
            </div>
            <h1 className="font-montserrat font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              {post.title}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white py-16 md:py-20 section-padding">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <article className="prose prose-lg max-w-none prose-headings:font-montserrat prose-headings:text-navy prose-a:text-ocean-blue prose-strong:text-navy">
              <MDXRemote source={post.content} />
            </article>
          </AnimatedSection>

          {/* Post footer */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-ocean-blue hover:text-navy font-semibold text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all posts
              </Link>
              <Link href="/contact" className="btn-primary !text-sm !py-2.5">
                Need help with customs? Get a quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
