'use client';

import { useState } from 'react';

export default function AboutPage() {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);

  const professionalProfile = {
   
    education:
      "Bachelor's in Computer Science at SZABIST (AUG 2023 - JUNE 2027)",
    currentWork: [
      'Part-time AI/ML development work (project-focused, high-impact builds)',
      'Data Science / MLOps Internship at 10Pearls '
    ],
    learningGoals: [
      'Improve raw DSA problem solving without over-relying on AI',
      'Strengthen systems design thinking for large-scale products',
      'Explore Robotics and AI integration',
      'Learn German for global collaboration opportunities',
      'Work deeply on model fine-tuning and integration of open-source deep learning models'
    ],
    careerDirection:
      'Long-term target: secure high-impact engineering roles at FAANG/MANG-level companies and build globally competitive AI systems.'
  };

  const skills = {
    'Generative AI & LLMs': [
      'LLMs', 'RAG Systems', 'Agentic AI', 'Multi-Agent Systems',
      'OpenAI API', 'LangChain', 'Hugging Face', 'Prompt Engineering'
    ],
    'Machine Learning & Data Science': [
      'Python', 'Scikit-learn', 'TensorFlow', 'PyTorch',
      'Random Forest', 'XGBoost', 'LightGBM', 'Neural Networks',
      'NumPy', 'Pandas', 'SHAP', 'LIME'
    ],
    'MLOps & Production': [
      'Streamlit', 'MLOps Pipeline', 'CI/CD', 'Feature Engineering',
      'Model Deployment', 'Data Processing', 'Automated Retraining', 'Explainable AI'
    ],
    'Backend & Infrastructure': [
      'Node.js', 'Express', 'FastAPI', 'API Gateway Design',
      'Redis Caching', 'Data Pipelines', 'System Architecture', 'Production Optimization'
    ],
    'Frontend Development': [
      'React', 'Next.js', 'TypeScript', 'Tailwind CSS',
      'Interactive Dashboards', 'UI/UX'
    ],
    'Voice AI & Speech': [
      'Speech-to-Speech', 'TTS/STT', 'OpenAI Live SDK',
      'Voice Processing', 'Audio ML'
    ],
  };

  const experience = [
    {
      title: 'AI/ML Solutions Executive',
      company: 'Prudential Solutions',
      period: 'Sep 2025 - Jan 2026 (5 mos)',
      description: 'Designed and developed end-to-end AI systems from research through production deployment, focusing on LLM-powered architectures and scalable intelligent solutions.',
      achievements: [
        'Designed and implemented LLM-powered microservices architecture (RAG, Multi-Agent Systems)',
        'Built real-time Speech-to-Speech pipelines using OpenAI Live SDK',
        'Developed agentic AI systems with autonomous reasoning and task execution',
        'Integrated AI APIs (OpenAI, Hugging Face, LangChain) into enterprise applications',
        'Managed scalable data pipelines and backend integrations'
      ]
    },
    {
      title: 'Data Science Intern',
      company: '10Pearls',
      period: 'Dec 2025 - Present (4 mos)',
      description: 'Developed an end-to-end Air Quality Index prediction system for Islamabad with ML/DL models and production-ready MLOps pipeline.',
      achievements: [
        'Built AQI prediction system forecasting 3 days in advance with <10% MAE and R² >0.85',
        'Trained multiple models: Random Forest, Ridge Regression, LightGBM, XGBoost, Neural Networks',
        'Designed CI/CD-enabled MLOps pipeline with hourly feature updates and daily retraining',
        'Developed interactive Streamlit dashboard for real-time AQI monitoring (10,000+ records)',
        'Applied SHAP & LIME for explainable AI, identifying 70%+ feature impact'
      ]
    },
    {
      title: 'AI/ML Intern',
      company: 'Prudential Solutions',
      period: 'Aug 2025 - Oct 2025 (3 mos)',
      description: 'Built production-grade AI/ML solutions including voice chatbots, speech processing, and optimized API infrastructure.',
      achievements: [
        'Voice Chatbot: 95% transcription accuracy, processed 500+ queries',
        'Speech-to-Speech Chatbot (TTS): Generated 300+ voice replies with >90% intelligibility',
        'Universal Downloader: Reduced download time by ~60%, handled 1,000+ files',
        'API Gateway with Redis caching: Supported 200+ concurrent requests, 50% latency reduction',
        'Delivered modular, production-ready solutions with automated CI/CD pipelines'
      ]
    },
  ];



  const achievements = [
    {
      icon: '🤖',
      title: 'Agentic AI Expert',
      description: 'Designed autonomous AI systems with multi-agent architectures and reasoning capabilities'
    },
    {
      icon: '🎙️',
      title: 'Voice AI Pioneer',
      description: 'Built Speech-to-Speech pipelines with 95%+ accuracy using OpenAI Live SDK'
    },
    {
      icon: '📊',
      title: 'MLOps Specialist',
      description: 'Created production-grade ML pipelines with automated retraining and real-time monitoring'
    },
    {
      icon: '🚀',
      title: 'Full Stack Architect',
      description: 'Built scalable systems handling 200+ concurrent requests with 50% latency reduction'
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      <section className="relative py-24 overflow-hidden bg-dark-900 about-hero-surface">
        <div className="absolute inset-0">
          <div className="absolute inset-0 about-hero-spotlight bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-dark-900 to-dark-900" />
          <div className="absolute inset-0 about-hero-grid bg-[url('/grid.svg')] opacity-5" />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[min(92%,1100px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4 about-hero-title">Aroon Kumar</h1>
            <p className="text-dark-400 max-w-2xl mx-auto">
              I'm an AI/ML Engineer passionate about building intelligent, production-grade systems.
              Currently focused on Agentic AI, LLM-powered architectures, and scalable ML solutions.
              I combine deep learning expertise with modern backend development to create end-to-end AI systems that solve real-world problems.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <section className="about-profile-shell about-section-card rounded-2xl p-8">
            <h2 className="about-profile-title text-3xl font-bold mb-8">Professional Profile</h2>
            <div className="about-profile-panel p-6 rounded-xl space-y-6">

              <div className="grid md:grid-cols-2 gap-6">
                <div className="about-profile-card rounded-lg p-4">
                  <p className="about-profile-label text-sm uppercase tracking-wide mb-2">Education</p>
                  <p className="about-profile-text">{professionalProfile.education}</p>
                </div>
                <div className="about-profile-card rounded-lg p-4">
                  <p className="about-profile-label text-sm uppercase tracking-wide mb-2">Career Direction</p>
                  <p className="about-profile-text">{professionalProfile.careerDirection}</p>
                </div>
              </div>

              <div>
                <p className="about-profile-label text-sm uppercase tracking-wide mb-3">Current Work</p>
                <ul className="space-y-2">
                  {professionalProfile.currentWork.map((item, index) => (
                    <li key={index} className="about-profile-text flex gap-2">
                      <span className="about-profile-bullet flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="about-profile-label text-sm uppercase tracking-wide mb-3">Learning & Growth Focus</p>
                <ul className="space-y-2">
                  {professionalProfile.learningGoals.map((goal, index) => (
                    <li key={index} className="about-profile-text flex gap-2">
                      <span className="about-profile-bullet flex-shrink-0">•</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="about-section-card rounded-2xl p-8">
            <div className="about-section-inner grid grid-cols-3 gap-4 p-8 rounded-xl shadow-[0_0_0_1px_rgba(34,211,238,0.06)]">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">11+</div>
                <div className="text-sm text-dark-300">Projects Built</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">1+</div>
                <div className="text-sm text-dark-300">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">20+</div>
                <div className="text-sm text-dark-300">Technologies</div>
              </div>
            </div>
          </section>

          <section className="about-section-card rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-12">Experience</h2>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-primary-700"></div>
              <div className="space-y-8">
                {experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="ml-20 group cursor-pointer"
                    onClick={() => setExpandedExperience(expandedExperience === idx ? null : idx)}
                  >
                    <div className="absolute -left-2.5 mt-2">
                      <div className="w-5 h-5 bg-primary-500 rounded-full border-4 border-dark-900 group-hover:bg-primary-400 group-hover:scale-110 transition-all duration-300"></div>
                    </div>

                    <div className="about-experience-card p-6 rounded-lg transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="about-experience-title text-lg font-bold text-white mb-1">{exp.title}</h3>
                          <p className="about-experience-company text-primary-400 text-sm">{exp.company}</p>
                        </div>
                        <span className="about-experience-toggle text-xl text-dark-300 transition-colors">
                          {expandedExperience === idx ? '−' : '+'}
                        </span>
                      </div>
                      <p className="text-xs text-dark-400">{exp.period}</p>

                      {expandedExperience === idx && (
                        <div className="mt-4 pt-4 border-t border-dark-700/50 space-y-3">
                          <p className="text-dark-200 text-sm">{exp.description}</p>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="text-dark-300 text-sm flex gap-2">
                                <span className="text-primary-400 flex-shrink-0">→</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="about-section-card rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8">Skills & Expertise</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, skillList], idx) => (
                <div
                  key={idx}
                  className="about-skill-card p-6 rounded-lg transition-all duration-300 hover:border-primary-500/40 hover:bg-dark-900 hover:shadow-[0_16px_35px_-20px_rgba(34,211,238,0.45)]"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, i) => (
                      <span
                        key={i}
                        className="home-tech-pill cursor-default px-3 py-1 rounded-full text-sm bg-primary-500/10 text-primary-300 border border-primary-500/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary-500/20 hover:border-primary-400/50 hover:text-primary-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

      

          <section className="about-section-card rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8">Highlights</h2>
            <div className="grid md:grid-cols-2 md:auto-rows-fr gap-6">
              {achievements.map((achievement, idx) => (
                <div key={idx} className="about-highlight-card h-full min-h-[220px] p-6 rounded-lg text-center flex flex-col justify-center hover:border-primary-500/40 transition-all duration-300 hover:shadow-[0_14px_28px_-20px_rgba(34,211,238,0.35)]">
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{achievement.title}</h3>
                  <p className="text-dark-300 text-sm">{achievement.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="about-section-card rounded-2xl p-8 text-center">
            <p className="text-dark-300 mb-6">Want to see my work in detail or discuss a project?</p>
            <div className="flex gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded transition-colors"
              >
                Get In Touch
              </a>
              <a
                href="/Aroon_Kumar_Resume.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="home-resume-btn inline-flex items-center px-6 py-3 rounded-lg border border-dark-700 hover:border-primary-500 text-dark-300 hover:text-white font-medium transition-colors"
              >
                Download Resume
              </a>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
