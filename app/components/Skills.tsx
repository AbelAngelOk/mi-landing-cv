"use client"

import { useEffect, useState } from "react"
import { FaCogs, FaCode, FaDatabase, FaCloud } from "react-icons/fa"
import type { SkillsData, SkillRole } from "../types"

export default function Skills() {
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeRole, setActiveRole] = useState<SkillRole | null>(null)

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const response = await fetch("/api/skills")
        if (!response.ok) {
          throw new Error("Error al cargar los datos de habilidades")
        }
        const data = await response.json()
        setSkillsData(data)
        if (data.skillRoles && data.skillRoles.length > 0) {
          setActiveRole(data.skillRoles[0])
        }
      } catch (err) {
        setError("Error al cargar los datos. Por favor, recarga la página.")
        console.error("Error fetching skills data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSkillsData()
  }, [])

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "cogs":
        return <FaCogs />
      case "code":
        return <FaCode />
      case "database":
        return <FaDatabase />
      case "cloud":
        return <FaCloud />
      default:
        return <FaCode />
    }
  }

  if (isLoading) {
    return (
      <section id="skills" className="py-20 bg-slate-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </section>
    )
  }

  if (error || !skillsData || !activeRole) {
    return (
      <section id="skills" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center text-red-500">
          <p>{error || "Error al cargar los datos"}</p>
          <button onClick={() => window.location.reload()} className="mt-4 bg-primary text-white px-4 py-2 rounded-md">
            Reintentar
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-2">Habilidades</h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Menú vertical */}
          <div className="md:w-64 mb-6 md:mb-0">
            <ul className="space-y-2">
              {skillsData.skillRoles.map((role, index) => (
                <li key={index}>
                  <button
                    onClick={() => setActiveRole(role)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeRole.title === role.title ? "bg-primary text-white" : "bg-white hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{getIconComponent(role.icon)}</span>
                      <span className="font-medium">{role.title}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contenedor de información */}
          <div className="md:w-3/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">{activeRole.title}</h3>
              <div className="grid grid-cols-1 gap-4">
                {activeRole.categories.map((category, catIndex) => (
                  <div key={catIndex} className="bg-slate-50 p-4 rounded-md border border-slate-200">
                    <h4 className="text-lg font-medium text-gray-700 mb-2">{category.title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="bg-primary text-white px-3 py-1 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

