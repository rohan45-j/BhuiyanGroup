import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
import FloatingContactWidget from "@/components/ui/FloatingContactWidget";
import CorporateBrochureModal from "@/components/ui/CorporateBrochureModal";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0F2557",
};

export const metadata: Metadata = {
  title: "Bhuiyan Group | Industrial Power, Renewables & Infrastructure EPC",
  description:
    "Bhuiyan Group (BG) is a premier diversified engineering conglomerate in Bangladesh delivering utility-scale turnkey EPC power projects, high-voltage substations, industrial water pumping grids, and commercial rooftop solar EPC.",
  keywords: [
    "Bhuiyan Group",
    "Generex Power",
    "Radial Renewable Technology Bangladesh",
    "Glory Energy Engineering",
    "Radial Power & Engineering",
    "Infant Zone",
    "Industrial Diesel Generators Bangladesh",
    "Rooftop Solar EPC Dhaka",
    "Water Pump Systems",
    "Substation Engineering 33kV 11kV",
    "BPDB Enlisted Contractor",
    "BREB Approved Substation Vendor",
  ],
  authors: [{ name: "Bhuiyan Group Corporate Communications" }],
  openGraph: {
    title: "Bhuiyan Group | Industrial Power & Infrastructure Engineering",
    description:
      "25+ years of turnkey engineering excellence in Bangladesh across power generation, utility solar, substations, and industrial pumps.",
    url: "https://bhuiyangroup.com.bd",
    siteName: "Bhuiyan Group",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhuiyan Group | Industrial Power & Engineering Excellence",
    description: "Premier EPC and infrastructure solutions conglomerate in Dhaka, Bangladesh.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    name: "Bhuiyan Group",
    alternateName: "BG Bangladesh",
    url: "https://bhuiyangroup.com.bd",
    logo: "https://bhuiyangroup.com.bd/bhuiyan-group-logo.png",
    foundingDate: "1998",
    founder: {
      "@type": "Person",
      name: "Engr. M. A. Bhuiyan",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "House 14, Road 4, Sector 3, Uttara",
      addressLocality: "Dhaka",
      postalCode: "1230",
      addressCountry: "BD",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+880-1819-214436",
        contactType: "customer service",
        areaServed: "BD",
        availableLanguage: ["English", "Bengali"],
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/bhuiyan-group",
      "https://www.facebook.com/bhuiyangroupbd",
    ],
  };

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-[#F37021] selection:text-white"
        suppressHydrationWarning
      >
        <SiteConfigProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Global Interactive Utilities */}
          <FloatingContactWidget />
          <CorporateBrochureModal />
        </SiteConfigProvider>
      </body>
    </html>
  );
}
