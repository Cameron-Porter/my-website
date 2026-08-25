import type { Metadata } from 'next';
import Script from 'next/script';
import { inter, sora, geistSans, geistMono } from './fonts';
import { personalSite, siteMetadata } from '@/lib/config/personal-site';
import { themeInitScript } from '@/lib/theme/theme-script';
import ThemeToggle from '@/components/theme/ThemeToggle';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: personalSite.title,
    template: `%s | ${personalSite.name}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  openGraph: {
    type: 'website',
    siteName: personalSite.name,
    locale: 'en_US',
    title: personalSite.title,
    description: siteMetadata.description,
    images: [{ url: siteMetadata.ogImage, width: 1200, height: 630, alt: personalSite.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: personalSite.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>
        <Script id='theme-init' strategy='beforeInteractive'>
          {themeInitScript}
        </Script>
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
