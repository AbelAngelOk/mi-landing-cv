"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import type { AboutMeData } from "../types"

export default function AboutMe() {
  const [aboutData, setAboutData] = useState<AboutMeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/api/about-me")
        if (!response.ok) {
          throw new Error("Error al cargar los datos de about-me")
        }
        const data = await response.json()
        setAboutData(data)
      } catch (err) {
        setError("Error al cargar los datos. Por favor, recarga la página.")
        console.error("Error fetching about-me data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  if (isLoading) {
    return (
      <section id="about-me" className="py-20 bg-gradient-to-b from-slate-50 to-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </section>
    )
  }

  if (error || !aboutData) {
    return (
      <section id="about-me" className="py-20 bg-gradient-to-b from-slate-50 to-white">
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
    <section id="about-me" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Contenedor de imagen */}
          <div className="lg:w-1/3">
            <div className="relative w-64 h-64 mx-auto lg:mx-0 group">
              <Image
                src={aboutData.profileImage || "/placeholder.svg"}
                alt={aboutData.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full shadow-2xl"
                title="Imagen de prueba, uso temporal"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 rounded-full">
                <p className="text-white text-xs px-4 text-center">Imagen de prueba, uso temporal</p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">QA</span>
              </div>
            </div>
          </div>

          {/* Contenido de texto */}
          <div className="lg:w-2/3 text-center lg:text-left">
            <h2 className="text-4xl font-bold mb-6">
              Soy <span className="text-blue-800">{aboutData.name}</span>
            </h2>

            <p className="text-slate-600 mb-8 leading-relaxed">{aboutData.bio}</p>

            {/* Estadísticas o highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {aboutData.stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-slate-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <h4 className="font-bold text-2xl text-primary">{stat.value}</h4>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

