import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UltimateEcommerce - Next Generation Shopping Experience",
  description: "Experience cutting-edge ecommerce with AI-powered recommendations, immersive 3D product visualization, and seamless checkout.",
  keywords: "ecommerce, online shopping, AI recommendations, 3D visualization, modern shopping",
  authors: [{ name: "UltimateEcommerce Team" }],
  creator: "UltimateEcommerce",
  publisher: "UltimateEcommerce",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ultimateecommerce.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "UltimateEcommerce - Next Generation Shopping Experience",
    description: "Experience cutting-edge ecommerce with AI-powered recommendations, immersive 3D product visualization, and seamless checkout.",
    url: "https://ultimateecommerce.com",
    siteName: "UltimateEcommerce",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "UltimateEcommerce - Next Generation Shopping Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UltimateEcommerce - Next Generation Shopping Experience",
    description: "Experience cutting-edge ecommerce with AI-powered recommendations, immersive 3D product visualization, and seamless checkout.",
    images: ["/og-image.jpg"],
    creator: "@ultimateecommerce",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#22c55e" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <WishlistProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              {children}
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
