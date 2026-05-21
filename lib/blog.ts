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
  category: string
  image?: string
}

export interface BlogPostWithContent extends BlogPost {
  content: string
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))

  if (files.length === 0) return []

  return files
    .map(file => {
      const source = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
      const { data } = matter(source)
      return {
        slug: file.replace('.mdx', ''),
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        author: data.author || 'Atlas Brokerage',
        category: data.category || 'General',
        image: data.image,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPostWithContent | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`)

  if (!fs.existsSync(file)) return null

  const source = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(source)

  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    author: data.author || 'Atlas Brokerage',
    category: data.category || 'General',
    image: data.image,
    content,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''))
}
