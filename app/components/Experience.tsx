import { FaBriefcase } from "react-icons/fa"
import type { ExperienceData } from "../types"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

/** Un puesto se considera vigente si el período no tiene año de cierre. */
const isCurrent = (period: string) => /actualidad|presente|actualmente/i.test(period)

export default function Experience({ experience }: { experience: ExperienceData }) {
  return (
    <section id="experiencia" className="section bg-background scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow="Trayectoria"
          title="Experiencia profesional"
          description="Ocho proyectos en banca, seguros, e-commerce, recursos humanos y marketplace."
          icon={<FaBriefcase aria-hidden="true" />}
        />

        {/* Línea de tiempo: el eje vertical ordena la lectura de arriba hacia abajo */}
        <ol className="relative mx-auto max-w-4xl border-l border-border pl-6 sm:pl-10">
          {experience.experiences.map((job, index) => (
            <Reveal
              as="li"
              key={`${job.company}-${job.project}`}
              delay={Math.min(index * 0.05, 0.3)}
              className="relative pb-12 last:pb-0"
            >
              {/* Nodo del eje */}
              <span
                aria-hidden="true"
                className={`absolute -left-[1.6rem] top-1.5 flex h-3 w-3 items-center justify-center rounded-full ring-4 ring-background sm:-left-[2.85rem] ${
                  isCurrent(job.period) ? "bg-accent" : "bg-border"
                }`}
              />

              <div className="card-interactive p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{job.project}</h3>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {job.role} · {job.company}
                    </p>
                  </div>
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                      isCurrent(job.period)
                        ? "bg-accent/10 text-accent ring-1 ring-inset ring-accent/20"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {job.period}
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {job.description.map((desc, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span dangerouslySetInnerHTML={{ __html: desc }} />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
