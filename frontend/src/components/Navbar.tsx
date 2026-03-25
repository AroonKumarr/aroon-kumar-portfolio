'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { Menu, X, Sun, Moon, Github, Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-lg border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="flex flex-col items-center text-center leading-tight">
              <motion.span
                className="block text-xl font-bold bg-gradient-to-r from-primary-300 via-primary-400 to-primary-600 bg-clip-text text-transparent"
                animate={{
                  scale: [1, 1.06, 1],
                  opacity: [0.92, 1, 0.92],
                  textShadow: [
                    '0 0 0px rgba(34,211,238,0.0)',
                    '0 0 16px rgba(34,211,238,0.35)',
                    '0 0 0px rgba(34,211,238,0.0)',
                  ],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                AK
              </motion.span>
              <span className="block text-[10px] sm:text-xs font-medium bg-gradient-to-r from-primary-200 via-primary-300 to-primary-400 bg-clip-text text-transparent -mt-0.5">
                Aroon Kumar
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-primary-400'
                    : 'text-dark-300 hover:text-primary-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-dark-300 hover:text-primary-400 hover:bg-dark-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="https://github.com/AroonKumarr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-dark-300 hover:text-primary-400 hover:bg-dark-800 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/aroon-kumar-38507528a/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-dark-300 hover:text-primary-400 hover:bg-dark-800 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-dark-300 hover:text-primary-400 hover:bg-dark-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 top-16 bg-dark-950/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="md:hidden absolute left-0 right-0 bg-dark-900 border-b border-dark-700"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      pathname === link.href
                        ? 'text-primary-400 bg-primary-400/10'
                        : 'text-dark-300 hover:text-primary-400 hover:bg-dark-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center space-x-4 pt-4 border-t border-dark-700">
                  <a
                    href="https://github.com/AroonKumarr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-dark-300 hover:text-primary-400"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aroon-kumar-38507528a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-dark-300 hover:text-primary-400"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}