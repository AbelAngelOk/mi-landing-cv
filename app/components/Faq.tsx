import { FaChevronDown, FaQuestionCircle } from "react-icons/fa"
import type { FaqData } from "../types"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

/**
 * Preguntas frecuentes en <details>/<summary> nativo: funciona sin JavaScript,
 * es accesible por defecto y las respuestas están siempre en el HTML.
 *
 * Esta sección existe sobre todo por GEO/LLMO. Los motores generativos citan
 * pares pregunta-respuesta autocontenidos con mucha más frecuencia que prosa
 * corrida, y cada respuesta acá responde en la primera oración, sin rodeos.
 * El JSON-LD FAQPage de la home refleja exactamente este mismo contenido.
 */
export default function Faq({ faq }: { faq: FaqData }) {
  return (
    <section id="faq" className="section bg-secondary/40 scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Lo que suelen preguntarme"
          description="Respuestas directas sobre stack, experiencia y disponibilidad."
          icon={<FaQuestionCircle aria-hidden="true" />}
        />

        <div className="mx-auto max-w-3xl space-y-3">
          {faq.faqs.map((item, index) => (
            <Reveal key={item.question} delay={Math.min(index * 0.05, 0.25)}>
              <details className="group card overflow-hidden [&[open]]:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left font-semibold text-foreground transition-colors hover:bg-secondary/50 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base">{item.question}</h3>
                  <FaChevronDown
                    aria-hidden="true"
                    className="shrink-0 text-accent transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <div className="border-t border-border/70 px-5 py-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
