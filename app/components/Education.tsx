"use client"

import { useEffect, useState } from "react"
import { FaGraduationCap } from "react-icons/fa"
import type { EducationData } from "../types"

export default function Education() {
  const [educationData, setEducationData] = useState<EducationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await fetch("/api/education")
        if (!response.ok) {
          throw new Error("Error al cargar los datos de educación")
        }
        const data = await response.json()
        setEducationData(data)
      } catch (err) {
        setError("Error al cargar los datos. Por favor, recarga la página.")
        console.error("Error fetching education data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEducationData()
  }, [])

  if (isLoading) {
    return (
      <section id="education" className="py-20 bg-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </section>
    )
  }

  if (error || !educationData) {
    return (
      <section id="education" className="py-20 bg-white">
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
    <section id="education" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-2">
            <FaGraduationCap className="text-4xl text-primary" />
            <h2 className="text-4xl font-bold">Educación</h2>
          </div>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Columna izquierda: Educación Principal y Adicional */}
          <div className="lg:col-span-2 space-y-12">
            {/* Educación Principal */}
            <div>
              <h3 className="text-2xl font-semibold mb-8">Educación Principal</h3>
              <div className="space-y-8">
                {educationData.mainEducation.map((edu, index) => (
                  <div key={index} className={`${edu.highlight ? "bg-slate-50 p-6 rounded-lg shadow-sm" : ""}`}>
                    <h4 className={`text-xl ${edu.highlight ? "text-primary font-semibold" : "font-medium"}`}>
                      {edu.degree}
                    </h4>
                    <p className="text-slate-600 mt-1">{edu.institution}</p>
                    <p className="text-slate-500 text-sm mt-1">{edu.period}</p>
                    {edu.highlight && edu.description && (
                      <p className="text-slate-600 mt-4 text-sm leading-relaxed">{edu.description}</p>
                    )}
                    {edu.skills && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-slate-600">Skills:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {edu.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="bg-slate-200 text-slate-700 px-2 py-1 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Educación Adicional */}
            <div>
              <h3 className="text-2xl font-semibold mb-8">Educación Adicional</h3>
              <div className="space-y-6">
                {educationData.otherEducation.map((edu, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-lg font-medium">{edu.degree}</h4>
                    <p className="text-slate-600 mt-1">{edu.institution}</p>
                    <p className="text-slate-500 text-sm mt-1">{edu.period}</p>
                    {edu.description && <p className="text-slate-700 mt-2">{edu.description}</p>}
                    {edu.skills && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-slate-600">Skills:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {edu.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="bg-slate-200 text-slate-700 px-2 py-1 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha: Certificaciones */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h3 className="text-2xl font-semibold mb-8">Certificaciones</h3>
              <div className="space-y-6">
                {educationData.certifications.map((cert, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium">{cert.title}</h4>
                    <p className="text-slate-600 mt-1">{cert.subtitle}</p>
                    <p className="text-slate-500 text-sm mt-1">{cert.date}</p>
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

