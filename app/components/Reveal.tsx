"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  /** Retraso en segundos, para escalonar elementos hermanos. */
  delay?: number
  className?: string
  as?: "div" | "li" | "article" | "section"
}

/**
 * Aparición al hacer scroll: fade + 16px de desplazamiento, una sola vez.
 *
 * Es el patrón que usan las plantillas de Wix y Hostinger para que la página
 * "respire" al bajar. Se mantiene corto (0.5s) y sutil a propósito: los movimientos
 * largos o con rebote leen como amateur y penalizan la percepción de velocidad.
 * Con prefers-reduced-motion activo no anima nada.
 */
export default function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const MotionTag = motion[as]

  if (shouldReduceMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
