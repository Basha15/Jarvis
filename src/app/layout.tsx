import type { Metadata, Viewport } from 'next';
import './globals.css';
import { JarvisProvider } from '@/context/JarvisContext';

export const metadata: Metadata = {
  title: 'JARVIS AI 2.0 — Personal AI Operating System',
  description: 'Production-ready multilingual personal artificial intelligence operating system for life, projects, and work.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0E14',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('SW registration note:', err);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body className="bg-surface-dark0 text-jarvis-textPrimary min-h-screen selection:bg-jarvis-accentBlue/30 selection:text-white">
        <JarvisProvider>
          {children}
        </JarvisProvider>
      </body>
    </html>
  );
}
