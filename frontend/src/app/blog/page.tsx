'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock3, Tag } from 'lucide-react';
import api from '@/lib/api';
import { Blog } from '@/types';
import { ErrorDisplay, LoadingSpinner } from '@/components/ApiStatus';
import { localBlogs } from '@/lib/blogData';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>(localBlogs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backendDown, setBackendDown] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const mergeBlogs = (apiBlogs: Blog[]) => {
      const bySlug = new Map<string, Blog>();
      apiBlogs.forEach((blog) => bySlug.set(blog.slug, blog));
      localBlogs.forEach((blog) => {
        const existing = bySlug.get(blog.slug);
        bySlug.set(blog.slug, existing ? { ...blog, ...existing } : blog);
      });

      return Array.from(bySlug.values()).filter((blog) => blog.published !== false);
    };

    const fetchBlogs = async () => {
      try {
        const data = await api.get<Blog[]>('/blog');
        setBlogs(mergeBlogs(data));
      } catch (err: any) {
        if (err.backendDown) {
          setBackendDown(true);
          setBlogs(localBlogs);
          setError('Backend is currently not running. Showing curated articles.');
        } else {
          setBlogs(localBlogs);
          setError(err.message || 'Failed to load blog posts. Showing curated articles.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const categories = useMemo(() => {
    const values = Array.from(new Set(blogs.map((blog) => blog.category).filter(Boolean))) as string[];
    return ['All', ...values];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    if (activeCategory === 'All') return blogs;
    return blogs.filter((blog) => blog.category === activeCategory);
  }, [blogs, activeCategory]);

  const featuredBlogs = filteredBlogs.filter((blog) => blog.featured);
  const regularBlogs = filteredBlogs.filter((blog) => !blog.featured);

  if (loading && blogs.length === 0) {
    return <LoadingSpinner message="Loading blog posts..." />;
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <section className="relative py-24 overflow-hidden bg-dark-900 blog-hero-surface">
        <div className="absolute inset-0">
          <div className="absolute inset-0 blog-hero-spotlight bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-dark-900 to-dark-900" />
          <div className="absolute inset-0 blog-hero-grid bg-[url('/grid.svg')] opacity-5" />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[min(92%,1100px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4 blog-hero-title">Blog</h1>
          <p className="text-dark-400 max-w-2xl mx-auto">
            Technical notes from my AI, ML, and full-stack engineering journey.
          </p>
        </motion.div>
        </div>
      </section>

      <section className="py-16 bg-dark-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {error && !backendDown && <ErrorDisplay message={error} />}

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`blog-category-btn px-4 py-2 text-sm rounded-full border transition-all duration-200 ${
                activeCategory === category
                  ? 'blog-category-btn-active bg-primary-500 text-white border-primary-500'
                  : 'bg-dark-900 text-dark-300 border-dark-700 hover:border-primary-500/50 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {featuredBlogs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-5">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredBlogs.map((blog, index) => (
                <motion.article
                  key={blog.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-xl border border-dark-700 bg-dark-900/70 p-6 hover:border-primary-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 text-xs text-dark-400 mb-3">
                    <Clock3 className="w-3.5 h-3.5" />
                    <span>{blog.readTime} min read</span>
                    {blog.category && (
                      <>
                        <span>•</span>
                        <span>{blog.category}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-dark-300 mb-4 line-clamp-3">{blog.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {blog.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="home-tech-pill inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-primary-500/10 text-primary-300 border border-primary-500/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary-500/20 hover:border-primary-400/50 hover:text-primary-300"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-sm text-primary-400 hover:text-primary-300 font-medium"
                  >
                    Read article <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-xl font-semibold text-white mb-5">All Articles</h2>
          {regularBlogs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-dark-700 bg-dark-900/40 p-8 text-center text-dark-400">
              No articles found for this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularBlogs.map((blog, index) => (
                <motion.article
                  key={blog.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-xl border border-dark-700 bg-dark-900/60 p-5 hover:border-primary-500/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 text-xs text-dark-400 mb-3">
                    <Clock3 className="w-3.5 h-3.5" />
                    <span>{blog.readTime} min</span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-dark-300 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-sm text-primary-400 hover:text-primary-300 font-medium"
                  >
                    Read more <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </div>
      </section>
    </div>
  );
}
