import localFont from "next/font/local";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/08_Footer/footer";
import NavigationBar from "@/components/00_NavigationBar/navigationBar";
import FinalBar from "@/components/09_FinalBar/finalBar";


// Lokale Fonts (Roel)
const roel = localFont({
  src: "./fonts/RoelRegular.woff", 
  variable: "--font-roel", 
  weight: "400 500",            
});


// Google Fonts (Inter und Open Sans)
const inter = Inter({
  weight: ["600", "700"], // Semibold und bold werden geladen
  subsets: ["latin"], // Nur lateinische Zeichen werden geladen
  variable: "--font-inter", // CSS-Variable
  display: "swap", // Für bessere Ladezeiten
});

const openSans = Open_Sans({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});


// Metadata
export const metadata = {
  title: "Kopfbrand - Deine Kreativagentur",
  description: "Willkommen bei Kopfbrand, deiner Agentur für Webdesign. Hier findest du unsere Dienstleistungen und Informationen.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={`${inter.variable} ${openSans.variable} ${roel.variable}`}>
        {children}
      </body>
    </html>
  );
}
