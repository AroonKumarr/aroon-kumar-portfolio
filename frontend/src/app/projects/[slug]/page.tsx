'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Code2, Layers } from 'lucide-react';
import api from '@/lib/api';
import { Project } from '@/types';
import { LoadingSpinner, ErrorDisplay } from '@/components/ApiStatus';
import { getLocalProjectBySlug } from '@/lib/projectsData';

const buildProjectPlaceholderImage = (title: string, subtitle: string, variant: number) => {
  const palettes = [
    { from: '#0f172a', via: '#1e293b', to: '#0ea5e9' },
    { from: '#111827', via: '#1f2937', to: '#06b6d4' },
  ];
  const palette = palettes[variant % palettes.length];

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" role="img" aria-label="${title} ${subtitle}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.from}"/>
      <stop offset="55%" stop-color="${palette.via}"/>
      <stop offset="100%" stop-color="${palette.to}"/>
    </linearGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#g)"/>
  <g opacity="0.2" stroke="#e2e8f0" stroke-width="1">
    <path d="M0 120 H1280 M0 240 H1280 M0 360 H1280 M0 480 H1280 M0 600 H1280"/>
    <path d="M160 0 V720 M320 0 V720 M480 0 V720 M640 0 V720 M800 0 V720 M960 0 V720 M1120 0 V720"/>
  </g>
  <text x="64" y="560" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="700" fill="#f8fafc">${title}</text>
  <text x="64" y="618" font-family="Inter, Arial, sans-serif" font-size="30" fill="#bae6fd">${subtitle}</text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backendDown, setBackendDown] = useState(false);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (!slug) return;

    const local = getLocalProjectBySlug(slug);
    if (local) {
      setProject(local);
    }

    const mergeProject = (apiProject: Project, localProject?: Project | null): Project => {
      if (!localProject) return apiProject;

      const apiArchitecture = apiProject.architecture || {};
      const localArchitecture = localProject.architecture || {};

      return {
        ...localProject,
        ...apiProject,
        thumbnail: apiProject.thumbnail || localProject.thumbnail,
        images: apiProject.images?.length ? apiProject.images : localProject.images,
        techStack: apiProject.techStack?.length ? apiProject.techStack : localProject.techStack,
        architecture: {
          ...localArchitecture,
          ...apiArchitecture,
          problemsSolved: apiArchitecture.problemsSolved?.length
            ? apiArchitecture.problemsSolved
            : localArchitecture.problemsSolved,
          aiModelsUsed: apiArchitecture.aiModelsUsed?.length
            ? apiArchitecture.aiModelsUsed
            : localArchitecture.aiModelsUsed,
        },
      };
    };

    const fetchProject = async () => {
      try {
        const data = await api.get<Project>(`/projects/${slug}`);
        setProject(mergeProject(data, local));
      } catch (err: any) {
        if (err.backendDown) {
          setBackendDown(true);
          if (!local) {
            setError('Backend is currently not running.');
          }
        } else if (!local) {
          setError(err.message || 'Failed to fetch project details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  const galleryImages = useMemo(() => {
    if (!project) return [];

    const configured = [
      ...(project.images || []),
      ...(project.thumbnail ? [project.thumbnail] : []),
    ];

    const uniqueConfigured = Array.from(new Set(configured.filter(Boolean)));
    if (uniqueConfigured.length > 0) {
      return uniqueConfigured;
    }

    return [buildProjectPlaceholderImage(project.title, 'Project Preview', 0)];
  }, [project]);

  useEffect(() => {
    if (!galleryImages.length) {
      setActiveImage('');
      return;
    }

    if (!activeImage || !galleryImages.includes(activeImage)) {
      setActiveImage(galleryImages[0]);
    }
  }, [galleryImages, activeImage]);

  if (loading && !project) {
    return <LoadingSpinner message="Loading project details..." />;
  }

  if (!project) {
    return (
      <div className="min-h-screen py-24 bg-dark-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorDisplay title="Project not found" message={error || 'This project does not exist.'} />
          <div className="text-center mt-8">
            <Link href="/projects" className="text-primary-400 hover:text-primary-300">
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 bg-dark-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="inline-flex items-center text-dark-300 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden border border-dark-700 bg-dark-900"
        >
          <div className="aspect-video bg-dark-800 overflow-hidden">
            {activeImage ? (
              <img src={activeImage} alt={`${project.title} preview`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Code2 className="w-16 h-16 text-dark-600" />
              </div>
            )}
          </div>

          {galleryImages.length > 1 && (
            <div className="px-6 sm:px-8 pt-4">
              <div className="flex gap-3 overflow-x-auto pb-1">
                {galleryImages.map((img, idx) => {
                  const selected = activeImage === img;
                  return (
                    <button
                      key={`${img.slice(0, 24)}-${idx}`}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`shrink-0 h-16 w-28 rounded-lg overflow-hidden border transition-all ${
                        selected
                          ? 'border-primary-500 ring-1 ring-primary-500/40'
                          : 'border-dark-700 hover:border-primary-500/50'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <img src={img} alt={`${project.title} thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{project.title}</h1>
            <p className="text-dark-300 mb-6">{project.longDescription || project.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-xl border border-dark-700 bg-dark-800/60 p-5">
                <h2 className="text-lg font-semibold text-white mb-3">Project Details</h2>
                {project.architecture?.problemsSolved?.length ? (
                  <ul className="space-y-2">
                    {project.architecture.problemsSolved.map((item) => (
                      <li key={item} className="text-dark-300 text-sm">• {item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-dark-400 text-sm">Detailed notes will be added soon.</p>
                )}
              </div>

              <div className="rounded-xl border border-dark-700 bg-dark-800/60 p-5">
                <h2 className="text-lg font-semibold text-white mb-3">Architecture & Scale</h2>
                <p className="text-dark-300 text-sm mb-3">
                  {project.architecture?.scalability || 'Scalable architecture details coming soon.'}
                </p>
                {project.architecture?.aiModelsUsed?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {project.architecture.aiModelsUsed.map((model) => (
                      <span
                        key={model}
                        className="cursor-default px-3 py-1 text-xs rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary-500/20 hover:border-primary-400/50 hover:text-primary-200 hover:shadow-[0_8px_18px_-10px_rgba(34,211,238,0.8)]"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-wide text-dark-400 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="cursor-default px-3 py-1 text-xs font-medium rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary-500/20 hover:border-primary-400/50 hover:text-primary-200 hover:shadow-[0_8px_18px_-10px_rgba(34,211,238,0.8)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg border border-dark-600 hover:border-primary-500 text-dark-200 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 mr-2" /> Source Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" /> Access App
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
