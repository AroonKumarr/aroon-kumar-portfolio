import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import BackendStatusIndicator from '@/components/BackendStatusIndicator';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aroon Kumar | Full-Stack Developer & AI Engineer',
  description: 'Portfolio of Aroon Kumar - Full-Stack Developer specializing in AI/ML, Robotics, and modern web technologies.',
  keywords: ['portfolio', 'developer', 'AI', 'machine learning', 'full-stack', 'Next.js'],
  authors: [{ name: 'Aroon Kumar' }],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Aroon Kumar | Full-Stack Developer & AI Engineer',
    description: 'Portfolio of Aroon Kumar - Full-Stack Developer specializing in AI/ML, Robotics, and modern web technologies.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen pt-16">
            <PageTransition>{children}</PageTransition>
          </main>
          <BackendStatusIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}