"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FaCode, FaWhatsapp, FaLinkedin, FaFileAlt } from "react-icons/fa"
import { useTextAnimation } from "../hooks/useTextAnimation"
import type { HeroData } from "../types"

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const animatedText = useTextAnimation()

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch("/api/hero")
        if (!response.ok) {
          throw new Error("Error al cargar los datos del hero")
        }
        const data = await response.json()
        setHeroData(data)
      } catch (err) {
        setError("Error al cargar los datos. Por favor, recarga la página.")
        console.error("Error fetching hero data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHeroData()
  }, [])

  if (isLoading) {
    return (
      <section className="relative py-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-600">Cargando...</p>
        </div>
      </section>
    )
  }

  if (error || !heroData) {
    return (
      <section className="relative py-20 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error || "Error al cargar los datos"}</p>
          <button onClick={() => window.location.reload()} className="mt-4 bg-primary text-white px-4 py-2 rounded-md">
            Reintentar
          </button>
        </div>
      </section>
    )
  }

  const getSocialIcon = (type: string) => {
    switch (type) {
      case "whatsapp":
        return <FaWhatsapp className="mr-2" />
      case "linkedin":
        return <FaLinkedin className="mr-2" />
      case "cv":
        return <FaFileAlt className="mr-2" />
      default:
        return null
    }
  }

  const getSocialButtonColor = (type: string) => {
    switch (type) {
      case "whatsapp":
        return "bg-green-600 hover:bg-green-700"
      case "linkedin":
      case "cv":
        return "bg-blue-600 hover:bg-blue-700"
      default:
        return "bg-slate-600 hover:bg-slate-700"
    }
  }

  return (
    <section className="relative py-20 min-h-screen flex items-center overflow-hidden">
      {/* Fondo con gradiente de Tailwind */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 z-0"></div>

      {/* Elementos visuales minimalistas */}
      <div className="absolute inset-0 z-10 opacity-10">
        {/* Círculos decorativos */}
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full border-4 border-white"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full border-2 border-white"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-white opacity-10"></div>

        {/* Patrones de puntos */}
        <div className="absolute top-40 right-40 grid grid-cols-5 gap-4">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-white"></div>
          ))}
        </div>
        <div className="absolute bottom-40 left-40 grid grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-white"></div>
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container text-center relative z-20">
        {/* Contenedor de imagen comentado para posible uso futuro
        <div className="mb-8 flex justify-center">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary shadow-lg relative group">
            <Image
              src={heroData.profileImage || "/placeholder.svg"}
              alt="Abel Angel"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0"
              title="Imagen de prueba, uso temporal"
            /> 
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
              <p className="text-white text-xs px-2 text-center">Imagen de prueba, uso temporal</p>
            </div>
          </div>
        </div>
        */}
        <FaCode className="mx-auto text-5xl mb-6 text-white" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          {heroData.title} <span className="inline-block min-w-[180px]">{animatedText}</span>
        </h1>
        <p className="text-xl mb-8 text-white max-w-2xl mx-auto">{heroData.description}</p>
        <div className="flex flex-wrap justify-center gap-4">
          {heroData.socialLinks.map((link, index) => {
            // Si es el enlace del CV, cambiarlo para que redireccione a /curriculum
            if (link.type === "cv") {
              return (
                <Link
                  key={index}
                  href="/curriculum"
                  className={`${getSocialButtonColor(link.type)} text-white font-semibold py-2 px-6 rounded-full transition duration-300 flex items-center shadow-md`}
                >
                  <FaFileAlt className="mr-2" /> Ver Currículum
                </Link>
              )
            }

            // Para otros enlaces, mantener el comportamiento original
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${getSocialButtonColor(link.type)} text-white font-semibold py-2 px-6 rounded-full transition duration-300 flex items-center shadow-md`}
              >
                {getSocialIcon(link.type)}
                {link.label}
              </a>
            )
          })}
        </div>
      </div>

      {/* Formas geométricas adicionales con animación */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  )
}

