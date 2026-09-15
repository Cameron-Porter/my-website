import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { inter, sora, geistSans, geistMono } from './fonts';
import { personalSite, siteMetadata } from '@/lib/config/personal-site';
import { GTM_ID } from '@/lib/config/site';
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
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Script id='theme-init' strategy='beforeInteractive'>
          {themeInitScript}
        </Script>
        <Script id='google-tag-manager' strategy='afterInteractive'>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {children}
        <ThemeToggle />
        <Analytics />
      </body>
    </html>
  );
}
