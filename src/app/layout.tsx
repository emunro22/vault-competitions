import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'ScotComps — Scotland\'s Premier Prize Competitions',
    template: '%s | ScotComps',
  },
  description:
    'Win incredible prizes from dream cars to life-changing cash. Scotland\'s most trusted competition platform with verified draws and real winners. Tickets from just £0.49.',
  keywords: [
    'competitions Scotland',
    'win prizes Scotland',
    'Scottish competitions',
    'prize draws Scotland',
    'win a car Scotland',
    'cash prizes UK',
    'online competitions UK',
    'ScotComps',
  ],
  openGraph: {
    title: 'ScotComps — Scotland\'s Premier Prize Competitions',
    description: 'Win incredible prizes from dream cars to life-changing cash. Tickets from just £0.49.',
    siteName: 'ScotComps',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
