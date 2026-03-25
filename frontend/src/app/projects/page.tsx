'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Github, ExternalLink, Code } from 'lucide-react';
import api from '@/lib/api';
import { Project } from '@/types';
import { LoadingSpinner, ErrorDisplay } from '@/components/ApiStatus';
import { localProjects } from '@/lib/projectsData';

const HIDDEN_PROJECT_SLUGS = ['whatsapp-ai-bot', 'ai-voice-assistant'];

const PROJECT_DOMAINS = [
  {
    id: 'computer-vision',
    label: 'Computer Vision',
    keywords: ['computer vision', 'opencv', 'yolo', 'image', 'vision', 'detection', 'segmentation'],
  },
  {
    id: 'machine-learning',
    label: 'Machine Learning',
    keywords: ['machine learning', 'ml', 'xgboost', 'scikit', 'model', 'training', 'prediction', 'neural network'],
  },
  {
    id: 'ai',
    label: 'AI',
    keywords: ['ai', 'llm', 'rag', 'langchain', 'openai', 'agent', 'generative', 'whisper', 'stt', 'tts'],
  },
  {
    id: 'data-science',
    label: 'Data Science',
    keywords: ['data science', 'analytics', 'eda', 'shap', 'lime', 'dashboard', 'forecast', 'statistics'],
  },
  {
    id: 'full-stack',
    label: 'Full Stack',
    keywords: ['full-stack', 'next.js', 'react', 'node', 'express', 'mongodb', 'supabase', 'api', 'vite'],
  },
  {
    id: 'e-commerce',
    label: 'E-Commerce',
    keywords: ['e-commerce', 'bookstore', 'cart', 'checkout', 'payment', 'easypaisa', 'orders', 'shop'],
  }
];

const PROJECT_DOMAIN_OVERRIDES: Record<string, string> = {
  'air-quality-ml-mlops': 'data-science',
  'pakistani-online-bookstore': 'e-commerce',
};

const PROJECT_MULTI_DOMAIN_OVERRIDES: Record<string, string[]> = {
  'aigilityx-ai-platform': ['full-stack', 'machine-learning'],
};

const getProjectDomainIds = (project: Project) => {
  const multiOverriddenDomains = PROJECT_MULTI_DOMAIN_OVERRIDES[project.slug];
  if (multiOverriddenDomains?.length) {
    return multiOverriddenDomains;
  }

  const overriddenDomain = PROJECT_DOMAIN_OVERRIDES[project.slug];
  if (overriddenDomain) {
    return [overriddenDomain];
  }

  const text = `${project.title} ${project.description} ${project.techStack.join(' ')}`.toLowerCase();

  const matched = PROJECT_DOMAINS.find(
    (domain) => domain.id !== 'other' && domain.keywords.some((keyword) => text.includes(keyword))
  );

  return [matched?.id || 'other'];
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(() =>
    localProjects.filter((project) => !HIDDEN_PROJECT_SLUGS.includes(project.slug))
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backendDown, setBackendDown] = useState(false);

  useEffect(() => {
    const mergeProjects = (apiProjects: Project[]) => {
      const bySlug = new Map<string, Project>();
      apiProjects.forEach((project) => {
        if (!HIDDEN_PROJECT_SLUGS.includes(project.slug)) {
          bySlug.set(project.slug, project);
        }
      });
      localProjects.forEach((project) => {
        if (!HIDDEN_PROJECT_SLUGS.includes(project.slug)) {
          bySlug.set(project.slug, project);
        }
      });
      return Array.from(bySlug.values());
    };

    const fetchProjects = async () => {
      try {
        const data = await api.get<Project[]>('/projects');
        setProjects(mergeProjects(data));
      } catch (err: any) {
        if (err.backendDown) {
          setBackendDown(true);
          setProjects(localProjects.filter((project) => !HIDDEN_PROJECT_SLUGS.includes(project.slug)));
          setError('Backend is currently not running. Showing curated project highlights.');
        } else {
          setProjects(localProjects.filter((project) => !HIDDEN_PROJECT_SLUGS.includes(project.slug)));
          setError(err.message || 'Failed to fetch projects. Showing curated project highlights.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading && projects.length === 0) {
    return <LoadingSpinner message="Loading projects..." />;
  }

  const projectsByDomain = PROJECT_DOMAINS.map((domain) => ({
    ...domain,
    projects: projects.filter((project) => getProjectDomainIds(project).includes(domain.id)),
  }));

  const hasAnyCategorizedProject = projectsByDomain.some((section) => section.projects.length > 0);

  return (
    <div className="min-h-screen bg-dark-950">
      <section className="relative py-24 overflow-hidden bg-dark-900 project-hero-surface">
        <div className="absolute inset-0">
          <div className="absolute inset-0 project-hero-spotlight bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-dark-900 to-dark-900" />
          <div className="absolute inset-0 project-hero-grid bg-[url('/grid.svg')] opacity-5" />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[min(92%,1100px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4 project-hero-title">Projects</h1>
          <p className="text-dark-400 max-w-2xl mx-auto">
            A collection of my work in AI, full-stack development, and robotics. 
            Each project represents a unique challenge and solution.
          </p>
        </motion.div>
      </div>
      </section>

      <section className="py-16 bg-dark-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {error && !backendDown && <ErrorDisplay message={error} />}

        {hasAnyCategorizedProject && (
          <div className="space-y-10">
            {projectsByDomain.map((section, sectionIndex) => (
              <section
                key={section.id}
                className="about-section-card rounded-2xl p-6 sm:p-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.06 }}
                  className="mb-6"
                >
                  <h2 className="text-2xl font-semibold text-white mb-1">{section.label}</h2>
                  <p className="text-dark-400 text-sm">
                    {section.projects.length
                      ? `${section.projects.length} project${section.projects.length > 1 ? 's' : ''}`
                      : 'No projects added in this section yet.'}
                  </p>
                </motion.div>

                {section.projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {section.projects.map((project, index) => {
                      const cardImage = project.thumbnail || project.images?.[0];

                      return (
                        <motion.div
                          key={`${section.id}-${project._id}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.08 }}
                          className="about-highlight-card group relative h-full rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10 flex flex-col"
                        >
                          <div className="aspect-video bg-dark-700 flex items-center justify-center relative overflow-hidden">
                            {cardImage ? (
                              <img
                                src={cardImage}
                                alt={`${project.title} cover`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <Code className="w-16 h-16 text-dark-600 group-hover:scale-110 transition-transform" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-800/80 via-transparent to-transparent" />
                          </div>

                          <div className="p-6 flex flex-1 flex-col">
                            <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-dark-400 mb-4 line-clamp-2">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4 min-h-[72px]">
                              {project.techStack.slice(0, 4).map((tech) => (
                                <span
                                  key={tech}
                                  className="home-tech-pill cursor-default px-3 py-1 text-xs font-medium rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary-500/20 hover:border-primary-400/50 hover:text-primary-300"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.techStack.length > 4 && (
                                <span className="cursor-default px-3 py-1 text-xs font-medium rounded-full bg-dark-700 text-dark-400 border border-dark-600 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-dark-600 hover:text-dark-200 hover:border-primary-500/40">
                                  +{project.techStack.length - 4}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-4 mt-auto">
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="home-project-link inline-flex items-center px-2 py-1 rounded-md text-sm text-dark-400 hover:text-white transition-colors"
                                >
                                  <Github className="w-4 h-4 mr-1" />
                                  Code
                                </a>
                              )}
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="home-project-link inline-flex items-center px-2 py-1 rounded-md text-sm text-dark-400 hover:text-white transition-colors"
                                >
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  Demo
                                </a>
                              )}
                              <Link
                                href={`/projects/${project.slug}`}
                                className="inline-flex items-center text-sm text-primary-400 hover:text-primary-300 font-medium ml-auto"
                              >
                                Details <ArrowRight className="ml-1 w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-dark-700 bg-dark-900/40 p-6 text-dark-400 text-sm">
                    Add projects in this domain and they will appear here.
                  </div>
                )}
              </section>
            ))}
          </div>
        )}

        {!hasAnyCategorizedProject && projects.length === 0 && !backendDown && (
          <div className="text-center py-12">
            <p className="text-dark-400">No projects found.</p>
          </div>
        )}
      </div>
      </section>
    </div>
  );
}