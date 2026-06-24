import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  /** Optional cover image (path under /public). Falls back to a gradient placeholder. */
  image?: string
  /** Human-friendly read time, e.g. "6 min read". Derived from the body. */
  readingTime: string
  /** Approximate word count of the body. */
  wordCount: number
}

export interface BlogPostWithContent extends BlogPost {
  content: string
}

const WORDS_PER_MINUTE = 200

function readingStats(content: string): { readingTime: string; wordCount: number } {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE))
  return { readingTime: `${minutes} min read`, wordCount }
}

function toMeta(slug: string, source: string): BlogPostWithContent {
  const { data, content } = matter(source)
  const { readingTime, wordCount } = readingStats(content)
  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    author: data.author || 'Atlas Brokerage',
    image: data.image,
    readingTime,
    wordCount,
    content,
  }
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
  if (files.length === 0) return []

  return files
    .map(file => {
      const source = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
      // Strip the body — index cards don't need it, but keep derived stats.
      const { content: _content, ...meta } = toMeta(file.replace('.mdx', ''), source)
      return meta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPostWithContent | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null

  return toMeta(slug, fs.readFileSync(file, 'utf8'))
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''))
}
