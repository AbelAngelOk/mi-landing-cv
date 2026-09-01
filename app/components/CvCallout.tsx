import Link from "next/link"
import { FaArrowRight, FaFilePdf, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import { siteConfig } from "@/lib/site"
import Reveal from "./Reveal"

/**
 * Banda de cierre: un solo objetivo, llevar al currículum descargable.
 *
 * Fondo azul profundo para separarla del flujo de secciones claras y darle el
 * peso visual de "acción final". El CTA primario va en teal (el único de la
 * página con ese color) para que sea imposible confundirlo con otro botón.
 */
export default function CvCallout() {
  return (
    <section className="section bg-surface-deep scroll-mt-24">
      <div className="container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl text-accent ring-1 ring-inset ring-white/20">
            <FaFilePdf aria-hidden="true" />
          </span>

          <h2 className="mt-6 text-display text-white">Descargá mi currículum</h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
            Versión completa en una sola página, lista para imprimir o guardar como PDF: experiencia, formación,
            certificaciones, stack técnico y proyectos.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/curriculum" className="btn-accent">
              Ver y descargar PDF <FaArrowRight aria-hidden="true" />
            </Link>
            <a
              href={siteConfig.profiles.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-on-dark"
              aria-label="Perfil de LinkedIn (se abre en una pestaña nueva)"
            >
              <FaLinkedin aria-hidden="true" /> LinkedIn
            </a>
            <a
              href={siteConfig.profiles.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-on-dark"
              aria-label="Escribir por WhatsApp (se abre en una pestaña nueva)"
            >
              <FaWhatsapp aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
