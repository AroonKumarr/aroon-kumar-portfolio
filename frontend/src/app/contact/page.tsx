'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const STATUS_HIDE_MS = 7000;

const CONTACT_EMAIL = 'aroonk644@gmail.com';

const buildMailtoLink = (name: string, email: string, message: string) => {
  const subject = `Portfolio Contact from ${name}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    'Message:',
    message,
  ].join('\n');

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const showTemporaryStatus = (nextStatus: FormStatus) => {
    setStatus(nextStatus);
    window.setTimeout(() => {
      setStatus({ type: 'idle', message: '' });
    }, STATUS_HIDE_MS);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }

    setStatus({
      type: 'loading',
      message: 'Sending...'
    });

    try {
       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setFormData({
        name: '',
        email: '',
        message: ''
      });

      showTemporaryStatus({
        type: 'success',
        message: 'Message sent! I\'ll get back to you soon.'
      });
    } catch (error) {
      // Fallback path when backend or database is unavailable.
      const mailtoLink = buildMailtoLink(
        formData.name.trim(),
        formData.email.trim(),
        formData.message.trim()
      );

      window.location.href = mailtoLink;

      showTemporaryStatus({
        type: 'success',
        message: 'Backend is offline. Your email app was opened so you can send the message directly.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <section className="relative py-24 overflow-hidden bg-dark-900 contact-hero-surface">
        <div className="absolute inset-0">
          <div className="absolute inset-0 contact-hero-spotlight bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-dark-900 to-dark-900" />
          <div className="absolute inset-0 contact-hero-grid bg-[url('/grid.svg')] opacity-5" />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[min(92%,1100px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4 contact-hero-title">
            Get In Touch
          </h1>
          <p className="text-dark-400 max-w-2xl mx-auto">
            Feel free to reach out. I typically respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 bg-dark-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="about-section-card rounded-2xl p-8">
            <div className="about-section-inner grid md:grid-cols-3 gap-8 p-8 rounded-xl">
              <a
                href="mailto:aroonk644@gmail.com"
                className="about-highlight-card p-6 rounded-lg transition-colors"
              >
                <div className="text-3xl mb-2">📧</div>
                <h3 className="text-white font-semibold mb-1">Email</h3>
                <p className="text-dark-300 text-sm hover:text-primary-400 transition-colors">
                  aroonk644@gmail.com
                </p>
              </a>

              <a
                href="https://github.com/AroonKumarr"
                target="_blank"
                rel="noopener noreferrer"
                className="about-highlight-card p-6 rounded-lg transition-colors"
              >
                <div className="text-3xl mb-2">🐙</div>
                <h3 className="text-white font-semibold mb-1">GitHub</h3>
                <p className="text-dark-300 text-sm hover:text-primary-400 transition-colors">
                  AroonKumarr
                </p>
              </a>

              <a
                href="https://www.linkedin.com/in/aroon-kumar-38507528a/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-highlight-card p-6 rounded-lg transition-colors"
              >
                <div className="text-3xl mb-2">💼</div>
                <h3 className="text-white font-semibold mb-1">LinkedIn</h3>
                <p className="text-dark-300 text-sm hover:text-primary-400 transition-colors">
                  Aroon Kumar
                </p>
              </a>
            </div>
          </div>

          <div className="contact-form-shell rounded-2xl p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-dark-200 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="contact-form-field w-full px-4 py-2 bg-dark-900 border border-dark-700 text-white placeholder-dark-500 rounded focus:outline-none focus:border-primary-500"
                  disabled={status.type === 'loading'}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark-200 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="contact-form-field w-full px-4 py-2 bg-dark-900 border border-dark-700 text-white placeholder-dark-500 rounded focus:outline-none focus:border-primary-500"
                  disabled={status.type === 'loading'}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark-200 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={5}
                  className="contact-form-field w-full px-4 py-2 bg-dark-900 border border-dark-700 text-white placeholder-dark-500 rounded focus:outline-none focus:border-primary-500 resize-none"
                  disabled={status.type === 'loading'}
                />
              </div>

              {status.type !== 'idle' && (
                <div
                  className={`contact-status p-3 rounded text-sm font-medium ${
                    status.type === 'success'
                      ? 'contact-status-success bg-green-500/20 text-green-300 border border-green-500/30'
                      : status.type === 'error'
                      ? 'contact-status-error bg-red-500/20 text-red-300 border border-red-500/30'
                      : 'contact-status-loading bg-primary-500/20 text-primary-300 border border-primary-500/30'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 disabled:bg-dark-600 text-white font-semibold rounded transition-colors"
              >
                {status.type === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
