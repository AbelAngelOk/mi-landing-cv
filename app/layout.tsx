import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import { siteConfig } from "@/lib/site"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const description =
  "Abel Angel, QA Engineer con 6 años de experiencia en automatización de pruebas UI, API, mobile y performance. " +
  "Selenium, Appium, k6, Postman y Lippia en banca, seguros y e-commerce. Quilmes, Buenos Aires, Argentina."

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.jobTitle} | Automatización y Performance`,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  applicationName: siteConfig.headline,
  authors: [{ name: siteConfig.name, url: siteConfig.profiles.linkedin }],
  creator: siteConfig.name,
  keywords: [
    "QA Engineer",
    "QA Automation",
    "automatización de pruebas",
    "pruebas de performance",
    "Selenium",
    "Appium",
    "k6",
    "Postman",
    "Newman",
    "Cucumber",
    "BrowserStack",
    "testing de software",
    "Argentina",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.headline,
    title: `${siteConfig.name} — ${siteConfig.jobTitle}`,
    description,
    images: [
      {
        url: siteConfig.image,
        width: 400,
        height: 400,
        alt: `Retrato de ${siteConfig.name}, ${siteConfig.jobTitle}`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.name} — ${siteConfig.jobTitle}`,
    description,
    images: [siteConfig.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "technology",
  generator: "Next.js",
}

export const viewport: Viewport = {
  themeColor: "#0b2545",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={siteConfig.lang} className={inter.variable}>
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  )
}
