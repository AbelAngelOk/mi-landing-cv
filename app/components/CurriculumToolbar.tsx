"use client"

import Link from "next/link"
import { FaArrowLeft, FaDownload } from "react-icons/fa"

/**
 * Barra de acciones del currículum. Sticky en pantalla y oculta al imprimir.
 *
 * "Descargar PDF" dispara window.print(): el navegador ofrece "Guardar como PDF"
 * y las reglas @media print de globals.css se encargan de que la hoja salga
 * limpia (sin sombras, sin bordes, tipografía en puntos y saltos de página
 * controlados). No hace falta mantener un PDF estático desactualizado.
 */
export default function CurriculumToolbar() {
  return (
    <div className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md print:hidden">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="btn-ghost !px-3">
          <FaArrowLeft aria-hidden="true" /> Volver al portafolio
        </Link>

        <button type="button" onClick={() => window.print()} className="btn-primary !px-5">
          <FaDownload aria-hidden="true" /> Descargar PDF
        </button>
      </div>
    </div>
  )
}
