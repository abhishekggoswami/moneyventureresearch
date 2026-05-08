import type { Metadata } from 'next'
import { DM_Sans, Libre_Baskerville } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { DisclaimerModal } from '@/components/finora/disclaimer-modal'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700']
});

const libreBaskerville = Libre_Baskerville({ 
  subsets: ["latin"],
  variable: '--font-libre',
  weight: ['400', '700']
});

export const metadata: Metadata = {
  title: 'Money Ventures - SEBI Registered Research Analyst',
  description: 'SEBI registered investment research and advisory services. Expert guidance on IPOs, trading signals, and market analysis for smart wealth creation.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${dmSans.variable} ${libreBaskerville.variable} font-sans antialiased`}>
        <DisclaimerModal />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
