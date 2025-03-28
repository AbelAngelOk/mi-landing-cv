"use client"

import { useEffect, useState } from "react"
import { FaCode } from "react-icons/fa"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import type { PortfolioData, Project } from "../types"

export default function Portfolio() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [typeFilter, setTypeFilter] = useState("All")
  const [toolFilter, setToolFilter] = useState("All")
  const [languageFilter, setLanguageFilter] = useState("All")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch("/api/portfolio")
        if (!response.ok) {
          throw new Error("Error al cargar los datos del portfolio")
        }
        const data = await response.json()
        setPortfolioData(data)
        setFilteredProjects(data.projects)
      } catch (err) {
        setError("Error al cargar los datos. Por favor, recarga la página.")
        console.error("Error fetching portfolio data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPortfolioData()
  }, [])

  useEffect(() => {
    if (portfolioData) {
      const filtered = portfolioData.projects.filter(
        (project) =>
          (typeFilter === "All" || project.type === typeFilter || (typeFilter === "Both" && project.type === "Both")) &&
          (toolFilter === "All" || project.tool === toolFilter) &&
          (languageFilter === "All" || project.language === languageFilter),
      )
      setFilteredProjects(filtered)
    }
  }, [typeFilter, toolFilter, languageFilter, portfolioData])

  if (isLoading) {
    return (
      <section id="portfolio" className="py-16 bg-slate-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </section>
    )
  }

  if (error || !portfolioData) {
    return (
      <section id="portfolio" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 text-center text-red-500">
          <p>{error || "Error al cargar los datos"}</p>
          <button onClick={() => window.location.reload()} className="mt-4 bg-primary text-white px-4 py-2 rounded-md">
            Reintentar
          </button>
        </div>
      </section>
    )
  }

  const languages = ["All", ...new Set(portfolioData.projects.map((p) => p.language))]

  return (
    <section id="portfolio" className="py-16 bg-slate-50">
      <div className="container">
        <div className="flex flex-col items-center mb-10">
          <FaCode className="text-3xl text-primary mb-3" />
          <h2 className="text-3xl font-bold text-center mb-6">Portafolio</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {["All", "API", "UI"].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                typeFilter === type ? "bg-primary text-white shadow-md" : "bg-slate-200 hover:bg-slate-300"
              }`}
            >
              {type === "All" ? "Todos" : type}
            </button>
          ))}
          <select
            onChange={(e) => setToolFilter(e.target.value)}
            className="px-4 py-2 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors duration-300 cursor-pointer"
          >
            <option value="All">Todas las herramientas</option>
            <option value="Selenium">Selenium</option>
            <option value="Other">Otros</option>
          </select>
          <select
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="px-4 py-2 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors duration-300 cursor-pointer"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang === "All" ? "Todos los lenguajes" : lang}
              </option>
            ))}
          </select>
        </div>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="card flex flex-col bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="h-32 relative p-4 flex items-center justify-center bg-slate-100">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    layout="fill"
                    objectFit="contain"
                    className="p-2"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold mb-2 text-gray-800 line-clamp-2">{project.title}</h3>
                    <p className="text-xs text-slate-600 mb-3 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{project.type}</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{project.tool}</span>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                        {project.language}
                      </span>
                    </div>
                  </div>
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white text-xs font-semibold py-2 px-3 rounded-full hover:bg-primary-dark transition duration-300 text-center mt-2"
                    >
                      Ver en GitHub
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

