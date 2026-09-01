import { FaAward, FaGraduationCap } from "react-icons/fa"
import type { Education as EducationEntry, EducationData } from "../types"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

function EducationCard({ edu, featured = false }: { edu: EducationEntry; featured?: boolean }) {
  return (
    <article className={`card p-6 ${featured ? "border-accent/30 bg-accent/[0.03]" : ""}`}>
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <h4 className={`text-lg font-semibold ${featured ? "text-primary" : "text-foreground"}`}>{edu.degree}</h4>
        <span className="whitespace-nowrap rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {edu.period}
        </span>
      </div>

      <p className="mt-1 text-sm text-muted-foreground">{edu.institution}</p>

      {edu.status && (
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          {edu.status}
        </p>
      )}

      {edu.description && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{edu.description}</p>}

      {edu.skills && edu.skills.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {edu.skills.map((skill) => (
            <li key={skill} className="tool">
              {skill}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default function Education({ education }: { education: EducationData }) {
  return (
    <section id="educacion" className="section bg-secondary/40 scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow="Formación"
          title="Educación y certificaciones"
          description="Formación técnica continua en QA, desarrollo y cloud."
          icon={<FaGraduationCap aria-hidden="true" />}
        />

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="space-y-10 lg:col-span-2">
            <div>
              <h3 className="eyebrow mb-5">Educación principal</h3>
              <div className="grid gap-5">
                {education.mainEducation.map((edu, index) => (
                  <Reveal key={edu.degree} delay={index * 0.08}>
                    <EducationCard edu={edu} featured={edu.highlight} />
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <h3 className="eyebrow mb-5">Formación complementaria</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                {education.otherEducation.map((edu, index) => (
                  <Reveal key={edu.degree} delay={index * 0.08}>
                    <EducationCard edu={edu} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <h3 className="eyebrow mb-5">Certificaciones</h3>
              <ul className="space-y-4">
                {education.certifications.map((cert, index) => (
                  <Reveal as="li" key={cert.title} delay={index * 0.08}>
                    <div className="card flex items-start gap-4 p-5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <FaAward aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="font-semibold leading-snug text-foreground">{cert.title}</h4>
                        <p className="mt-0.5 text-sm text-muted-foreground">{cert.subtitle}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{cert.date}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
