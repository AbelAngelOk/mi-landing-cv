import Link from "next/link"
import type { ReactNode } from "react"
import { FaFileAlt, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import { siteConfig } from "@/lib/site"
import type { AboutMeData, HeroData } from "../types"
import RoleTicker from "./RoleTicker"

const socialIcons: Record<string, ReactNode> = {
  whatsapp: <FaWhatsapp aria-hidden="true" />,
  linkedin: <FaLinkedin aria-hidden="true" />,
}

/**
 * Hero renderizado en el servidor: el h1, la descripción y las métricas viajan
 * en el HTML inicial. Solo el efecto de tipeo es cliente.
 *
 * Fondo azul profundo (confianza, competencia) con acento teal en el rol y en
 * los números: el ojo entra por el nombre, sigue por el rol y aterriza en el CTA.
 */
export default function Hero({ hero, about }: { hero: HeroData; about: AboutMeData }) {
  const externalLinks = hero.socialLinks.filter((link) => link.type !== "cv")

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-surface-deep pt-24 pb-20">
      {/* Capa 1: degradado de marca */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-deep via-primary to-surface-deep" />

      {/* Capa 2: retícula sutil, da textura sin competir con el texto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Capa 3: halos de color que suavizan los bordes */}
      <div aria-hidden="true" className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-primary/40 blur-3xl" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            QA Engineer · {siteConfig.location.city}, {siteConfig.location.countryName}
          </p>

          <h1 className="mt-5 animate-fade-up text-display-lg text-white [animation-delay:80ms]">
            Abel Angel
            <span className="sr-only"> — QA Engineer especializado en automatización de pruebas y performance</span>
          </h1>

          <p className="mt-4 animate-fade-up text-2xl font-semibold text-white/90 sm:text-3xl [animation-delay:160ms]">
            {hero.title} <RoleTicker />
            <span className="sr-only">Analyst, Engineer y Manager</span>
          </p>

          <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-base leading-relaxed text-white/70 sm:text-lg [animation-delay:240ms]">
            {hero.description}
          </p>

          <div className="mt-10 flex animate-fade-up flex-wrap justify-center gap-3 [animation-delay:320ms]">
            {/* Un único CTA primario: el resto queda en segundo nivel */}
            <Link href="/curriculum" className="btn-accent">
              <FaFileAlt aria-hidden="true" /> Ver currículum
            </Link>
            {externalLinks.map((link) => (
              <a
                key={link.type}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-on-dark"
                aria-label={`${link.label} (se abre en una pestaña nueva)`}
              >
                {socialIcons[link.type]}
                {link.label}
              </a>
            ))}
          </div>

          {/* Barra de confianza: las cifras clave, extraíbles por un LLM */}
          <dl className="mx-auto mt-14 grid max-w-2xl animate-fade-up grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/15 bg-white/10 sm:grid-cols-4 [animation-delay:400ms]">
            {about.stats.map((stat) => (
              <div key={stat.label} className="bg-surface-deep/60 px-4 py-5 text-center backdrop-blur-sm">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-2xl font-bold text-accent">{stat.value}</span>
                  <span className="mt-1 block text-xs leading-snug text-white/60">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#sobre-mi"
        aria-label="Ir a la sección Sobre mí"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 text-white/50 transition-colors hover:text-white"
      >
        <svg
          className="h-6 w-6 animate-bounce"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  )
}
