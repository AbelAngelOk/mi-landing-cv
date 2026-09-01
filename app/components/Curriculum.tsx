import Image from "next/image"
import type { ReactNode } from "react"
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone } from "react-icons/fa"
import { stripHighlights, type AllData } from "@/lib/data"
import type { Project } from "../types"
import { siteConfig } from "@/lib/site"
import CurriculumToolbar from "./CurriculumToolbar"

/**
 * Currículum en formato "hoja": una sola tarjeta blanca centrada sobre fondo
 * gris tenue, con títulos de sección en versalitas flanqueados por reglas
 * degradadas y entradas separadas por líneas finas.
 *
 * La estructura sigue la página de referencia
 * (palevioletred-hyena-375469.hostingersite.com): misma grilla 1/3 + 2/3 en el
 * encabezado, misma jerarquía tipográfica y el mismo criterio de separadores.
 * Los colores son los del sistema del portafolio, no los del template original,
 * para que ambas páginas se lean como el mismo producto.
 *
 * Renderiza en el servidor: el CV completo está en el HTML y es indexable.
 */

function SheetHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <div aria-hidden="true" className="rule-fade-r" />
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">{children}</h2>
      <div aria-hidden="true" className="rule-fade-l" />
    </div>
  )
}

function EntryHeader({
  title,
  subtitle,
  meta,
  period,
}: {
  title: string
  subtitle?: string
  meta?: string
  period: string
}) {
  return (
    <div className="mb-3 flex flex-wrap items-start justify-between gap-x-6 gap-y-1">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        {meta && <p className="text-sm text-muted-foreground">{meta}</p>}
      </div>
      <span className="whitespace-nowrap text-sm text-muted-foreground">{period}</span>
    </div>
  )
}

export default function Curriculum({ data, projects }: { data: AllData; projects: Project[] }) {
  const { aboutMe, experience, education, skills } = data
  // En papel solo entran los proyectos con repositorio público: un enlace es lo único accionable desde un PDF
  const printableProjects = projects.filter((project) => project.url).slice(0, 4)

  const contactItems = [
    {
      icon: <FaPhone aria-hidden="true" className="h-4 w-4" />,
      label: "+54 9 11 3083-0388",
      href: siteConfig.profiles.whatsapp,
    },
    {
      icon: <FaEnvelope aria-hidden="true" className="h-4 w-4" />,
      label: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: <FaLinkedin aria-hidden="true" className="h-4 w-4" />,
      label: "linkedin.com/in/abelangel96",
      href: siteConfig.profiles.linkedin,
    },
    {
      icon: <FaGithub aria-hidden="true" className="h-4 w-4" />,
      label: "github.com/AbelAngelOk",
      href: siteConfig.profiles.github,
    },
  ]

  return (
    <div className="min-h-screen bg-secondary/40 print:bg-white">
      <CurriculumToolbar />

      <main className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8 print:p-0">
        <article className="rounded-xl border border-border/60 bg-card p-8 shadow-sm sm:p-12 print:rounded-none print:border-0 print:p-0 print:shadow-none">
          {/* Encabezado: foto + identidad + contacto */}
          <header className="grid items-start gap-x-12 gap-y-8 md:grid-cols-3">
            <div className="mx-auto w-40 md:mx-0 md:w-full">
              <div className="relative aspect-square overflow-hidden rounded-full border-4 border-card shadow-lg">
                <Image
                  src={aboutMe.profileImage || "/placeholder.svg"}
                  alt={`Retrato de ${aboutMe.name}`}
                  fill
                  sizes="(max-width: 768px) 10rem, 14rem"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="flex h-full flex-col justify-center md:col-span-2">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{aboutMe.name}</h1>
              <p className="mt-2 text-lg text-muted-foreground">{siteConfig.jobTitle}</p>

              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{aboutMe.bio}</p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-border/60 pt-6 text-sm">
                {contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
                <span className="flex items-center gap-2 text-muted-foreground">
                  <FaMapMarkerAlt aria-hidden="true" className="h-4 w-4" />
                  {siteConfig.location.city}, {siteConfig.location.region}, {siteConfig.location.countryName}
                </span>
              </div>
            </div>
          </header>

          <div className="mt-8 space-y-8">
            <section className="py-12">
              <SheetHeading>Experiencia profesional</SheetHeading>
              {experience.experiences.map((job) => (
                <div
                  key={`${job.company}-${job.project}`}
                  className="mb-8 border-b border-border/60 pb-8 last:mb-0 last:border-0 last:pb-0"
                >
                  <EntryHeader title={job.project} subtitle={`${job.role} · ${job.company}`} period={job.period} />
                  <ul className="space-y-2">
                    {job.description.map((desc, i) => (
                      <li key={i} className="flex items-start text-sm text-muted-foreground">
                        <span aria-hidden="true" className="mr-2">
                          ·
                        </span>
                        <span>{stripHighlights(desc)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section className="py-12">
              <SheetHeading>Educación</SheetHeading>
              {[...education.mainEducation, ...education.otherEducation].map((edu) => (
                <div key={`${edu.institution}-${edu.degree}`} className="mb-6 last:mb-0">
                  <EntryHeader title={edu.degree} subtitle={edu.institution} meta={edu.status} period={edu.period} />
                </div>
              ))}
            </section>

            <section className="py-12">
              <SheetHeading>Certificaciones</SheetHeading>
              <ul className="space-y-3">
                {education.certifications.map((cert) => (
                  <li key={cert.title} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <span className="text-sm text-foreground">
                      <span className="font-semibold">{cert.title}</span> — {cert.subtitle}
                    </span>
                    <span className="whitespace-nowrap text-sm text-muted-foreground">{cert.date}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="py-12">
              <SheetHeading>Habilidades técnicas</SheetHeading>
              <div className="space-y-6">
                {skills.skillRoles.map((role) => (
                  <div key={role.title}>
                    <h3 className="mb-3 text-base font-semibold text-foreground">{role.title}</h3>
                    <dl className="space-y-1.5">
                      {role.categories.map((category) => (
                        <div key={category.title} className="text-sm">
                          <dt className="inline font-medium text-foreground">{category.title}: </dt>
                          <dd className="inline text-muted-foreground">{category.skills.join(", ")}.</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </section>

            <section className="py-12">
              <SheetHeading>Proyectos destacados</SheetHeading>
              <div className="space-y-5">
                {printableProjects.map((project) => (
                  <div key={project.repo ?? project.title}>
                    <h3 className="text-base font-semibold text-foreground">{project.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.type} · {project.tool} · {project.language}
                    </p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm text-primary/80 hover:underline"
                    >
                      {project.url?.replace("https://", "")}
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <footer className="mt-16 border-t border-border/60 pt-8 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {aboutMe.name} · {siteConfig.jobTitle}
            </p>
          </footer>
        </article>
      </main>
    </div>
  )
}
