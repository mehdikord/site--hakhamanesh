import type { Metadata, Viewport } from 'next';
import { SiteProvider } from '@/components/shared/SiteProvider';
import { SiteEffects } from '@/components/shared/SiteEffects';
import { TopBar } from '@/components/layout/TopBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { siteUrl } from '@/lib/metadata';
import './globals.css';

// Render full HTML on the Node server, including every detail route.
// This application must be deployed with next start, not a static export.
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'املاک هخامنش | مرجع املاک لوکس تهران', template: '%s | املاک هخامنش' },
  description:
    'املاک هخامنش — خرید، فروش، رهن و اجاره آپارتمان، ویلا، زمین و املاک تجاری لوکس در تهران',
  applicationName: 'املاک هخامنش',
  alternates: { canonical: '/' },
  icons: { icon: '/icon.svg' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#07111F' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/vazirmatn-arabic-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <noscript>
          <style>
            {
              '#preloader{display:none!important}.reveal{opacity:1!important;transform:none!important}'
            }
          </style>
        </noscript>
      </head>
      <body className="grain font-vazir">
        <SiteProvider>
          <div id="site-content">
            <a href="#main" className="skip gold-btn px-4 py-2 rounded-xl text-sm">
              پرش به محتوای اصلی
            </a>
            <TopBar />
            <Header />
            <main id="main" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <SiteEffects />
          </div>
        </SiteProvider>
      </body>
    </html>
  );
}
