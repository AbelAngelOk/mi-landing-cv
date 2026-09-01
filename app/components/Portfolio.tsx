"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { FaArrowRight, FaCodeBranch, FaGithub, FaLock, FaRegStar } from "react-icons/fa"
import type { Project } from "../types"
import SectionHeading from "./SectionHeading"

/**
 * Portafolio como lista de repositorios.
 *
 * Se eligió lista y no grilla de tarjetas porque los proyectos no tienen imagen
 * propia: los iconos genéricos que había antes (logos de Flaticon) ocupaban la
 * mitad de cada tarjeta sin aportar información. En filas, lo que se ve primero
 * es el título y qué se prueba, que es lo que a un reclutador le importa.
 */

/** Colores oficiales de GitHub Linguist para el punto de lenguaje. */
const languageColors: Record<string, string> = {
  Java: "#b07219",
  "C#": "#178600",
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Go: "#00ADD8",
  HTML: "#e34c26",
  Shell: "#89e051",
}

function formatLastActivity(iso?: string) {
  if (!iso) return null
  return new Intl.DateTimeFormat("es-AR", { month: "short", year: "numeric" }).format(new Date(iso))
}

function ProjectRow({ project }: { project: Project }) {
  const lastActivity = formatLastActivity(project.lastActivity)
  const isLinked = Boolean(project.url)

  const content = (
    <>
      {/* Fila superior: identificador del repo y metadata de GitHub */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {project.repo ? (
          <span className="font-mono text-xs text-muted-foreground">
            {project.repo}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <FaLock aria-hidden="true" className="h-3 w-3" />
            Código no publicado
          </span>
        )}

        {project.isFork && (
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[0.6875rem] font-medium text-muted-foreground">
            <FaCodeBranch aria-hidden="true" className="h-2.5 w-2.5" />
            Fork
          </span>
        )}

        {/* Una sola estrella es ruido; solo vale la pena mostrarlo si hay tracción real */}
        {typeof project.stars === "number" && project.stars > 1 && (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <FaRegStar aria-hidden="true" className="h-3 w-3" />
            {project.stars}
          </span>
        )}

        {lastActivity && (
          <span className="text-xs text-muted-foreground">
            <span className="sr-only">Última actividad: </span>
            {lastActivity}
          </span>
        )}
      </div>

      <h3 className="mt-2 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
        {project.title}
      </h3>

      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{project.description}</p>

      {/* Fila inferior: lenguaje + stack */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-foreground">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full ring-1 ring-inset ring-black/10"
            style={{ backgroundColor: languageColors[project.language] ?? "hsl(var(--muted-foreground))" }}
          />
          {project.language}
        </span>

        <ul className="flex flex-wrap gap-1.5">
          <li className="knowledge">{project.type}</li>
          <li className="tool">{project.tool}</li>
          {project.tags?.map((tag) => (
            <li key={tag} className="tool">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </>
  )

  const shared =
    "group relative block rounded-xl border border-border/70 bg-card p-6 transition-all duration-300 sm:p-7"

  if (!isLinked) {
    return <div className={shared}>{content}</div>
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — ver repositorio en GitHub (se abre en una pestaña nueva)`}
      className={`${shared} hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg`}
    >
      {content}
      <span
        aria-hidden="true"
        className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
      >
        <FaArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </a>
  )
}

export default function Portfolio({ projects }: { projects: Project[] }) {
  const [typeFilter, setTypeFilter] = useState("All")
  const [languageFilter, setLanguageFilter] = useState("All")
  const shouldReduceMotion = useReducedMotion()

  const languages = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.language))).sort()],
    [projects],
  )

  const types = useMemo(() => {
    const present = new Set(projects.map((p) => p.type))
    return ["All", ...["UI", "API", "Both"].filter((t) => present.has(t as Project["type"]))]
  }, [projects])

  const filtered = useMemo(
    () =>
      projects.filter(
        (project) =>
          (typeFilter === "All" || project.type === typeFilter) &&
          (languageFilter === "All" || project.language === languageFilter),
      ),
    [projects, typeFilter, languageFilter],
  )

  const chipClass = (isActive: boolean) =>
    `min-h-[2.25rem] rounded-full px-4 text-sm font-medium transition-colors ${
      isActive
        ? "bg-primary text-primary-foreground shadow-sm"
        : "bg-card text-muted-foreground ring-1 ring-inset ring-border hover:text-foreground hover:ring-primary/30"
    }`

  return (
    <section id="portafolio" className="section bg-secondary/40 scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow="Portafolio"
          title="Proyectos en GitHub"
          description="Frameworks de automatización de UI y API. La metadata se sincroniza con la API de GitHub."
          icon={<FaGithub aria-hidden="true" />}
        />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo de prueba">
            {types.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTypeFilter(type)}
                aria-pressed={typeFilter === type}
                className={chipClass(typeFilter === type)}
              >
                {type === "All" ? "Todos" : type}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por lenguaje">
            {languages.map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => setLanguageFilter(language)}
                aria-pressed={languageFilter === language}
                className={chipClass(languageFilter === language)}
              >
                {language === "All" ? "Todos los lenguajes" : language}
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {filtered.length} proyectos visibles
        </p>

        <motion.ul layout={!shouldReduceMotion} className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.li
                key={project.repo ?? project.title}
                layout={!shouldReduceMotion}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectRow project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">
            No hay proyectos con esa combinación de filtros. Probá quitando alguno.
          </p>
        )}

        <div className="mt-10 text-center">
          <a
            href="https://github.com/AbelAngelOk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            aria-label="Ver todos los repositorios en GitHub (se abre en una pestaña nueva)"
          >
            <FaGithub aria-hidden="true" /> Ver todos los repositorios
          </a>
        </div>
      </div>
    </section>
  )
}
