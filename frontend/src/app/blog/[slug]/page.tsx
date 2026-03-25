'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock3, Eye, Tag } from 'lucide-react';
import api from '@/lib/api';
import { Blog } from '@/types';
import { ErrorDisplay, LoadingSpinner } from '@/components/ApiStatus';
import { getLocalBlogBySlug, localBlogs } from '@/lib/blogData';

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backendDown, setBackendDown] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const local = getLocalBlogBySlug(slug);
    if (local) {
      setBlog(local);
    }

    const fetchBlog = async () => {
      try {
        const data = await api.get<Partial<Blog>>(`/blog/${slug}`);

        if (!data || !data.slug) {
          throw new Error('Blog not found');
        }

        const merged: Blog = {
          _id: data._id || local?._id || slug,
          title: data.title || local?.title || 'Untitled',
          slug: data.slug || slug,
          excerpt: data.excerpt || local?.excerpt || '',
          content: data.content || local?.content || 'Full article content will be added soon.',
          category: data.category || local?.category,
          tags: data.tags || local?.tags || [],
          author: data.author || local?.author || 'Aroon Kumar',
          coverImage: data.coverImage || local?.coverImage,
          featured: data.featured ?? local?.featured ?? false,
          published: data.published ?? local?.published ?? true,
          views: data.views ?? local?.views ?? 0,
          readTime: data.readTime ?? local?.readTime ?? 5,
          createdAt: data.createdAt || local?.createdAt,
          updatedAt: data.updatedAt || local?.updatedAt,
        };

        setBlog(merged);
      } catch (err: any) {
        if (err.backendDown) {
          setBackendDown(true);
          if (!local) {
            setError('Backend is currently not running.');
          }
        } else if (!local) {
          setError(err.message || 'Failed to load this article.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const relatedBlogs = useMemo(() => {
    if (!blog?.category) return [];
    return localBlogs
      .filter((item) => item.slug !== blog.slug && item.category === blog.category)
      .slice(0, 2);
  }, [blog]);

  if (loading && !blog) {
    return <LoadingSpinner message="Loading article..." />;
  }

  if (!blog) {
    return (
      <div className="min-h-screen py-24 bg-dark-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorDisplay title="Article not found" message={error || 'The requested article does not exist.'} />
          <div className="mt-8 text-center">
            <Link href="/blog" className="text-primary-400 hover:text-primary-300">
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const paragraphs = blog.content.split('\n\n').filter(Boolean);

  const sectionHeadings = new Set([
    'The Problem and the Motivation',
    'What AigilityX Does',
    'Technical Architecture',
    'Tech Stack and Why Each Piece Was Chosen',
    'Key Features and How They Were Built',
    'Challenges Faced',
    'Performance and Optimization',
    'Lessons Learned',
    'Future Improvements',
    'Conclusion',
    'The Problem Worth Solving',
    'What the System Does',
    'Key Features and Implementation',
    'Why Camouflaged Object Detection Is Different',
    'What This Project Builds',
    'Technical Architecture: How SINet Thinks',
    'The Dataset: COD10K',
    'Tech Stack and Implementation Choices',
    'Evaluation Metrics and Why They Were Chosen',
    'Challenges in Implementation',
    'What Problem This Actually Solves',
    'How the System Is Architected',
    'Tech Stack and Why Each Piece Earned Its Place',
    'Key Engineering Decisions in Implementation',
    'Challenges and How They Were Worked Through',
    'Performance and Optimization Considerations',
    'What Building This Taught Me',
    'What Comes Next',
    'Closing Thoughts',
  ]);

  const normalizeHeading = (value: string) => value.replace(/[:.]$/, '').trim();

  return (
    <div className="min-h-screen py-24 bg-dark-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="blog-detail-back-link inline-flex items-center px-2 py-1 rounded-md text-dark-300 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-dark-700 bg-dark-900/70 p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-center gap-3 text-xs text-dark-400 mb-4">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="w-3.5 h-3.5" />
              {blog.readTime} min read
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              {blog.views} views
            </span>
            {blog.category && <span>{blog.category}</span>}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{blog.title}</h1>
          <p className="text-dark-300 mb-6">{blog.excerpt}</p>

          {blog.tags?.length ? (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="home-tech-pill inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-primary-500/10 text-primary-300 border border-primary-500/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary-500/20 hover:border-primary-400/50 hover:text-primary-300"
                >
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="space-y-5 text-dark-200 leading-relaxed">
            {paragraphs.map((paragraph, index) => {
              const text = paragraph.trim();
              const normalized = normalizeHeading(text);
              const isHeading = sectionHeadings.has(normalized);

              if (isHeading) {
                return (
                  <h2
                    key={`${blog.slug}-h-${index}`}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-400 via-primary-300 to-primary-400 bg-clip-text text-transparent mt-8 mb-3 border-l-4 border-primary-500 pl-4 pb-2"
                  >
                    {normalized}
                  </h2>
                );
              }

              return (
                <p key={`${blog.slug}-p-${index}`} className="text-[15px] sm:text-base">
                  {text}
                </p>
              );
            })}
          </div>
        </motion.article>

        {relatedBlogs.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-white mb-4">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedBlogs.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="blog-related-card group rounded-xl border border-dark-700 bg-dark-900/60 p-4 transition-all duration-200 hover:border-primary-500/40 hover:-translate-y-0.5"
                >
                  <p className="text-xs text-dark-400 mb-1">{item.readTime} min read</p>
                  <h3 className="text-white font-semibold mb-1 line-clamp-2 group-hover:text-primary-400 transition-colors">{item.title}</h3>
                  <p className="text-dark-300 text-sm line-clamp-2">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
