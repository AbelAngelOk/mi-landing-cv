"use client"

import { useTextAnimation } from "../hooks/useTextAnimation"

/**
 * Máquina de escribir con los tres roles.
 *
 * El texto animado es decorativo: el h1 y el sr-only de al lado ya contienen el
 * rol completo, así que un crawler sin JavaScript o un lector de pantalla nunca
 * dependen de esta animación para entender la página.
 */
export default function RoleTicker() {
  const animatedText = useTextAnimation()

  return (
    <span aria-hidden="true" className="text-accent">
      {animatedText}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.1em] bg-accent/80 animate-caret-blink" />
    </span>
  )
}
