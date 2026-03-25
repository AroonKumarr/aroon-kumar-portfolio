'use client';

import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Download, Sparkles, Code, Mic, Cog, Github, Linkedin, X, ExternalLink } from 'lucide-react';

const skills = [
  {
    icon: Sparkles,
    label: 'AI Systems & LLM Platforms',
    description: 'LangChain, RAG pipelines, multi-agent AI, LLaMA and GPT orchestration',
  },
  {
    icon: Mic,
    label: 'Real-Time Voice & Conversational AI',
    description: 'Speech-to-Speech systems and STT -> LLM -> TTS pipelines for live interactions',
  },
  {
    icon: Cog,
    label: 'Intelligent Automation',
    description: 'WhatsApp and Telegram AI bots, workflow automation, and multi-city CRM pipelines',
  },
  {
    icon: Code,
    label: 'Full-Stack Web Engineering',
    description: 'Next.js and React.js frontends, Node.js backends, REST APIs, and database-driven applications',
  },
];

const featuredProjects = [
  {
    title: 'AQI Predictor Islamabad',
    description: 'End-to-end air quality prediction system with automated ML pipelines, SHAP explainability, and Streamlit dashboard',
    highlights: [
      'Automated feature updates and model retraining pipelines',
      'Forecast insights with SHAP-based explainability',
      'Interactive dashboard for real-time and future AQI trends',
    ],
    tech: ['Python', 'Scikit-learn', 'XGBoost', 'SHAP', 'GitHub Actions', 'Streamlit'],
    slug: 'air-quality-ml-mlops',
    href: 'https://air-quality-ml-mlops.streamlit.app/',
    githubUrl: 'https://github.com/AroonKumarr/air-quality-ml-mlops',
    image: '/project-covers/aqi-mlops.svg',
  },
  {
    title: 'AigilityX AI Platform',
    description: 'Full-stack AI/ML platform with RAG, STT/TTS services, agent modules, gateway orchestration, and Supabase integration.',
    highlights: [
      'Agentic workflow with gateway and service modules',
      'Speech pipeline from STT to LLM to TTS output',
      'Supabase-backed full-stack product architecture',
    ],
    tech: ['RAG', 'STT', 'TTS', 'Agent Orchestration', 'Supabase', 'React', 'Vite'],
    slug: 'aigilityx-ai-platform',
    href: 'https://aigilityx.com/',
    githubUrl: 'https://github.com/AroonKumarr/cyberx',
    image: '/project-covers/aigilityx.svg',
  }

];

export default function Home() {
  const [activeProject, setActiveProject] = useState<(typeof featuredProjects)[number] | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] py-14 sm:py-0 flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-dark-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-dark-950 to-dark-950" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 text-xs sm:text-sm font-medium mb-5 sm:mb-6">
                Let's build something intelligent.
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl leading-tight sm:text-6xl lg:text-7xl font-bold mb-5 sm:mb-6"
          >
            <span className="bg-gradient-to-r from-white via-dark-100 to-dark-300 bg-clip-text text-transparent">
              AI Systems Engineer | Full-Stack Developer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl text-dark-400 max-w-2xl mx-auto mb-7 sm:mb-8"
          >
            I build intelligent, scalable AI systems that solve real-world problems — from Agentic AI and LLM platforms to real-time voice and automation systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href="/projects"
              className="inline-flex w-full sm:w-auto justify-center items-center px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
            >
              View My Work
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <a
              href="/Aroon_Kumar_Resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto justify-center items-center px-6 py-3 rounded-lg border border-dark-700 hover:border-primary-500 text-dark-300 hover:text-white font-medium transition-colors"
            >
              <Download className="mr-2 w-4 h-4" />
              Download Resume
            </a>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-8 max-w-md mx-auto text-dark-500"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10+</div>
              <div className="text-sm">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1+</div>
              <div className="text-sm">Years Exp</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5+</div>
              <div className="text-sm">Live Apps</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-dark-600 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-primary-500 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="py-16 sm:py-24 bg-dark-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">What I Build</h2>
            <p className="text-dark-400 max-w-xl mx-auto">
              I engineer production-grade AI systems and real-time automation pipelines that solve complex problems and scale efficiently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-dark-800/50 border border-dark-700 hover:border-primary-500/50 transition-colors"
              >
                <skill.icon className="w-10 h-10 text-primary-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{skill.label}</h3>
                <p className="text-dark-400 text-sm">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 sm:py-24 bg-dark-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-dark-400 max-w-xl mx-auto">
              A glimpse into my recent work in AI, automation, and full-stack development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-xl overflow-hidden bg-dark-800 border border-dark-700 hover:border-primary-500/50 transition-colors"
              >
                <div className="aspect-video bg-dark-700 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} cover`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Code className="w-16 h-16 text-dark-600" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-dark-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-primary-500/10 text-primary-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-dark-400 hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </Link>
                    )}
                    {project.href && (
                      <Link
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-dark-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Demo
                      </Link>
                    )}
                    <button
                      onClick={() => setActiveProject(project)}
                      className="inline-flex items-center text-sm text-primary-400 hover:text-primary-300 font-medium ml-auto"
                    >
                      View Details <ArrowRight className="ml-1 w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Link
              href="/projects"
              className="inline-flex w-full sm:w-auto justify-center items-center px-6 py-3 rounded-lg border border-dark-700 hover:border-primary-500 text-dark-300 hover:text-white font-medium transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-dark-700 bg-dark-900 shadow-2xl"
            >
              <div className="relative h-52 overflow-hidden">
                {activeProject.image ? (
                  <img
                    src={activeProject.image}
                    alt={`${activeProject.title} cover`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-dark-800">
                    <Code className="w-16 h-16 text-dark-600" />
                  </div>
                )}
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-dark-900/70 text-dark-200 hover:text-white hover:bg-dark-900"
                  aria-label="Close project details"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{activeProject.title}</h3>
                <p className="text-dark-300 mb-5">{activeProject.description}</p>

                <div className="mb-5 p-4 rounded-xl border border-primary-500/20 bg-primary-500/5">
                  <h4 className="text-sm font-semibold text-primary-300 mb-3">Project Details</h4>
                  <ul className="space-y-2">
                    {activeProject.highlights?.map((item, idx) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="text-sm sm:text-base text-dark-200"
                      >
                        • {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {activeProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary-500/10 text-primary-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {activeProject.href && (
                    <Link
                      href={activeProject.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition-colors"
                    >
                      Access App
                    </Link>
                  )}
                  <button
                    onClick={() => setActiveProject(null)}
                    className="inline-flex items-center px-4 py-2 rounded-lg border border-dark-600 hover:border-primary-500 text-dark-200 hover:text-white text-sm font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-dark-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Let's Work Together
            </h2>
            <p className="text-dark-400 mb-8">
              Have a project in mind? I'd love to hear about it. Let's discuss how I can help bring your ideas to life.
            </p>
            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto justify-center items-center px-8 py-4 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
            >
              Get In Touch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-dark-950 border-t border-dark-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-dark-500 text-sm">
              © 2026 Aroon Kumar. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="https://github.com/AroonKumarr" target="_blank" rel="noopener noreferrer" className="text-dark-500 hover:text-primary-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/aroon-kumar-38507528a/" target="_blank" rel="noopener noreferrer" className="text-dark-500 hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}