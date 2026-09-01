import type { ReactNode } from "react"
import Reveal from "./Reveal"

interface SectionHeadingProps {
  /** Etiqueta corta en mayúsculas sobre el título. */
  eyebrow: string
  title: string
  description?: string
  align?: "center" | "left"
  icon?: ReactNode
}

/**
 * Encabezado único para todas las secciones: eyebrow → título → bajada.
 * Tener una sola pieza garantiza el mismo ritmo y la misma jerarquía en toda
 * la página, que es lo que hace que un sitio se lea como "hecho por un estudio"
 * y no como secciones pegadas.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  icon,
}: SectionHeadingProps) {
  const isCentered = align === "center"

  return (
    <Reveal className={`max-w-2xl ${isCentered ? "mx-auto text-center" : ""} mb-12 sm:mb-16`}>
      <p className={`eyebrow flex items-center gap-2 ${isCentered ? "justify-center" : ""}`}>
        {icon}
        {eyebrow}
      </p>
      <h2 className="section-title mt-3">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>}
      <div className={`mt-6 h-1 w-16 rounded-full bg-accent ${isCentered ? "mx-auto" : ""}`} />
    </Reveal>
  )
}
