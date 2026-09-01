"use client"

import { useState } from "react"
import { FaCloud, FaCode, FaCogs, FaDatabase, FaLayerGroup } from "react-icons/fa"
import type { SkillsData } from "../types"
import SectionHeading from "./SectionHeading"

const icons: Record<string, React.ReactNode> = {
  cogs: <FaCogs aria-hidden="true" />,
  code: <FaCode aria-hidden="true" />,
  database: <FaDatabase aria-hidden="true" />,
  cloud: <FaCloud aria-hidden="true" />,
}

/**
 * Habilidades como tabs accesibles (role="tablist" + navegación con flechas).
 *
 * Todas las categorías se renderizan en el HTML y las inactivas se ocultan con
 * el atributo `hidden`: el contenido sigue siendo indexable y legible por un LLM
 * aunque el usuario nunca haga clic en la pestaña.
 */
export default function Skills({ skills }: { skills: SkillsData }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = skills.skillRoles.length - 1
    let next: number | null = null

    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === lastIndex ? 0 : index + 1
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index === 0 ? lastIndex : index - 1
    if (event.key === "Home") next = 0
    if (event.key === "End") next = lastIndex

    if (next !== null) {
      event.preventDefault()
      setActiveIndex(next)
      document.getElementById(`skill-tab-${next}`)?.focus()
    }
  }

  return (
    <section id="habilidades" className="section bg-background scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow="Stack"
          title="Habilidades técnicas"
          description="Herramientas y prácticas que uso a diario, agrupadas por rol."
          icon={<FaLayerGroup aria-hidden="true" />}
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div
              role="tablist"
              aria-label="Áreas de habilidades"
              aria-orientation="vertical"
              className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {skills.skillRoles.map((role, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={role.title}
                    id={`skill-tab-${index}`}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls={`skill-panel-${index}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`flex min-h-[3rem] shrink-0 items-center gap-3 rounded-xl px-4 text-left text-sm font-semibold transition-all duration-200 lg:w-full ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-card text-muted-foreground ring-1 ring-inset ring-border hover:text-foreground hover:ring-primary/30"
                    }`}
                  >
                    <span className={`text-lg ${isActive ? "text-accent" : "text-primary/60"}`}>
                      {icons[role.icon] ?? icons.code}
                    </span>
                    <span className="whitespace-nowrap lg:whitespace-normal">{role.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-8">
            {skills.skillRoles.map((role, index) => (
              <div
                key={role.title}
                id={`skill-panel-${index}`}
                role="tabpanel"
                aria-labelledby={`skill-tab-${index}`}
                hidden={index !== activeIndex}
                tabIndex={0}
                className="card p-6 sm:p-8"
              >
                <h3 className="text-xl font-semibold text-foreground">{role.title}</h3>

                <div className="mt-6 space-y-6">
                  {role.categories.map((category) => (
                    <div key={category.title}>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        {category.title}
                      </h4>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <li
                            key={skill}
                            className="rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground ring-1 ring-inset ring-border transition-colors hover:bg-primary hover:text-primary-foreground"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
