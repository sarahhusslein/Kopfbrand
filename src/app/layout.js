import localFont from "next/font/local";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";


// Lokale Fonts (Roel)
const roel = localFont({
  src: "./fonts/RoelRegular.woff", 
  variable: "--font-roel", 
  weight: "400 500",            
});


// Google Fonts (Inter und Open Sans)
const inter = Inter({
  weight: ["600", "700"],
  subsets: ["latin"], 
  variable: "--font-inter", 
  display: "swap", 
});

const openSans = Open_Sans({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});


// Metadata & SEO
export const metadata = {
  title: "Kopfbrand - Deine Kreativagentur",
  description: "Die inhabergeführte Agentur KOPFBRAND ist eine der erfolgreichsten, unabhängigen Kreativagenturen in München.",
  keywords: "Kopfbrand, Kreativagentur, München, Agentur, Webdesign, Digital Content Design, Kreativagentur München",
  author: "Kopfbrand",
  robots: "index, follow",
  appleMobileWebAppTitle: "Kopfbrand",
  themeColor: "#1D1E22",
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    canonical: "https://www.kopfbrand.com",
  },
  openGraph: {
    title: "Kopfbrand - Deine Kreativagentur",
    description: "Die inhabergeführte Agentur KOPFBRAND ist eine der erfolgreichsten, unabhängigen Kreativagenturen in München.",
    url: "https://kopfbrand.com",
    siteName: "Kopfbrand",
    type: "website",
    locale: "de_DE",
  },
  icons: {
    icon: "/favicon.ico",
    svg: "/icon.svg",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {


  return (
    <html lang="de">
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.kopfbrand.com" />

        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="icon" type="image/png" sizes="32x32 16x16" href="/icon.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon-96x96.png" />

        {/* Meta Tags für SEO & Mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-title" content="Kopfbrand" />
        <meta name="theme-color" content="#1D1E22" />

      </head>
      <body className={`${inter.variable} ${openSans.variable} ${roel.variable}`}>
        {children}
      </body>
    </html>
  );
}
