import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from '@/components/providers/Providers';
import PageDataAttribute from '@/components/PageDataAttribute';
import MetaMaskErrorHandler from '@/components/MetaMaskErrorHandler';
import HydrationFix from '@/components/HydrationFix';



const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ultimate E-Commerce - Premium Shopping Experience',
  description: 'Discover the future of shopping with our curated collection of premium products, cutting-edge technology, and unparalleled customer service.',
  keywords: 'e-commerce, shopping, premium products, technology, fashion, electronics',
  authors: [{ name: 'Ultimate E-Commerce Team' }],
  openGraph: {
    title: 'Ultimate E-Commerce - Premium Shopping Experience',
    description: 'Discover the future of shopping with our curated collection of premium products.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ultimate E-Commerce - Premium Shopping Experience',
    description: 'Discover the future of shopping with our curated collection of premium products.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Providers>
          <MetaMaskErrorHandler />
          <HydrationFix />
          <PageDataAttribute />

          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
