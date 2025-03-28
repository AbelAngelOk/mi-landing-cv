"use client"

import { useEffect, useState } from "react"
import type { ExperienceData } from "../types"

export default function Experience() {
  const [experienceData, setExperienceData] = useState<ExperienceData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const response = await fetch("/api/experience")
        if (!response.ok) {
          throw new Error("Error al cargar los datos de experiencia")
        }
        const data = await response.json()
        setExperienceData(data)
      } catch (err) {
        setError("Error al cargar los datos. Por favor, recarga la página.")
        console.error("Error fetching experience data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchExperienceData()
  }, [])

  if (isLoading) {
    return (
      <section id="experience" className="py-20 bg-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </section>
    )
  }

  if (error || !experienceData) {
    return (
      <section id="experience" className="py-20 bg-white">
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
    <section id="experience" className="py-20 bg-white">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-2">Experiencia</h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-16"></div>

        <div className="space-y-12">
          {experienceData.experiences.map((job, index) => (
            <div key={index} className="grid grid-cols-12 gap-8">
              <div className="col-span-3">
                <h3 className="text-xl font-semibold text-slate-800">{job.company}</h3>
                <p className="text-slate-600 mt-1">{job.role}</p>
                <p className="text-slate-500 mt-1">{job.period}</p>
              </div>

              <div className="col-span-9">
                <h4 className="text-lg font-medium text-primary">{job.project}</h4>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  {job.description.map((desc, descIndex) => (
                    <li key={descIndex} className="text-slate-600" dangerouslySetInnerHTML={{ __html: desc }}></li>
                  ))}
                </ul>
              </div>

              {index < experienceData.experiences.length - 1 && (
                <div className="col-span-12">
                  <hr className="border-slate-200 my-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

