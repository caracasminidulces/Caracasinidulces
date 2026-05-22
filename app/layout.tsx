import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransitionProvider from "../components/PageTransitionProvider";
import "./globals.css";

// Fuente elegante para títulos (simetría inspirada en caligrafía romana)
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Fuente legible y geométrica para textos de cuerpo
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Caracas Mini Dulces | Alta Repostería de Lujo y Arte Comestible",
  description: "Boutique de repostería fina de alta gama en Caracas. Arte comestible, diseño de simetría geométrica y sabores gourmet exclusivos.",
  keywords: [
    "Caracas Mini Dulces",
    "alta repostería",
    "repostería de lujo",
    "mini dulces Caracas",
    "pastelería fina",
    "catering de postres",
    "arte comestible"
  ],
  authors: [{ name: "Caracas Mini Dulces", url: "https://caracasminidulces.com" }],
  creator: "Caracas Mini Dulces",
  publisher: "Caracas Mini Dulces",
  metadataBase: new URL("https://caracasminidulces.com"),
  openGraph: {
    title: "Caracas Mini Dulces | Alta Repostería",
    description: "Exclusiva boutique de arte dulce y simetría geométrica comestible en Caracas.",
    url: "https://caracasminidulces.com",
    siteName: "Caracas Mini Dulces",
    locale: "es_VE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="es" 
      className={`${cinzel.variable} ${montserrat.variable} scroll-smooth`}
    >
      <body className="font-body bg-brand-bg text-brand-cream antialiased min-h-screen selection:bg-brand-gold selection:text-brand-bg overflow-x-hidden pt-[72px]">
        {/* Barra de navegación global */}
        <Navbar />

        {/* Envoltura de animación de página */}
        <PageTransitionProvider>
          {children}
        </PageTransitionProvider>

        {/* Pie de página global */}
        <Footer />
      </body>
    </html>
  );
}
