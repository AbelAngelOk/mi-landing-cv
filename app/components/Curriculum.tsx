"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaMapMarkerAlt, FaDownload } from "react-icons/fa"
import type { HeroData, AboutMeData, ExperienceData, EducationData, SkillsData, PortfolioData } from "../types"

interface CurriculumData {
  hero: HeroData | null
  aboutMe: AboutMeData | null
  experience: ExperienceData | null
  education: EducationData | null
  skills: SkillsData | null
  portfolio: PortfolioData | null
}

export default function Curriculum() {
  const [data, setData] = useState<CurriculumData>({
    hero: null,
    aboutMe: null,
    experience: null,
    education: null,
    skills: null,
    portfolio: null,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true)

        // Fetch all data in parallel
        const [heroRes, aboutMeRes, experienceRes, educationRes, skillsRes, portfolioRes] = await Promise.all([
          fetch("/api/hero"),
          fetch("/api/about-me"),
          fetch("/api/experience"),
          fetch("/api/education"),
          fetch("/api/skills"),
          fetch("/api/portfolio"),
        ])

        // Check if any request failed
        if (
          !heroRes.ok ||
          !aboutMeRes.ok ||
          !experienceRes.ok ||
          !educationRes.ok ||
          !skillsRes.ok ||
          !portfolioRes.ok
        ) {
          throw new Error("Error al cargar los datos del currículum")
        }

        // Parse all responses
        const [hero, aboutMe, experience, education, skills, portfolio] = await Promise.all([
          heroRes.json(),
          aboutMeRes.json(),
          experienceRes.json(),
          educationRes.json(),
          skillsRes.json(),
          portfolioRes.json(),
        ])

        // Update state with all data
        setData({
          hero,
          aboutMe,
          experience,
          education,
          skills,
          portfolio,
        })
      } catch (err) {
        setError("Error al cargar los datos del currículum. Por favor, recarga la página.")
        console.error("Error fetching curriculum data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllData()
  }, [])

  const handlePrint = () => {
    window.print()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    )
  }

  if (error || !data.hero || !data.aboutMe || !data.experience || !data.education || !data.skills) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error || "Error al cargar los datos del currículum"}</p>
          <button onClick={() => window.location.reload()} className="mt-4 bg-primary text-white px-4 py-2 rounded-md">
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Botón de impresión - solo visible en pantalla, no en impresión */}
      <div className="fixed top-4 right-4 print:hidden z-10">
        <button
          onClick={handlePrint}
          className="bg-primary text-white px-4 py-2 rounded-md flex items-center shadow-md hover:bg-blue-700 transition-colors"
        >
          <FaDownload className="mr-2" /> Imprimir / Guardar PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-8 print:p-6 bg-white shadow-lg print:shadow-none">
        {/* Encabezado / Información personal */}
        <header className="border-b border-slate-200 pb-4 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            {/* Imagen de perfil */}
            <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-slate-200">
              <Image
                src={data.aboutMe.profileImage || "/placeholder.svg"}
                alt={data.aboutMe.name}
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-slate-800">{data.aboutMe.name}</h1>
              <h2 className="text-xl text-primary font-semibold mt-2">QA Engineer</h2>

              {/* Información de contacto */}
              <div className="mt-3 space-y-1 text-slate-600">
                <p className="flex items-center justify-center md:justify-start">
                  <FaEnvelope className="mr-2" /> abel.angel1996@gmail.com
                </p>
                <p className="flex items-center justify-center md:justify-start">
                  <FaPhone className="mr-2" /> +54 9 11 3083-0388
                </p>
                <p className="flex items-center justify-center md:justify-start">
                  <FaLinkedin className="mr-2" /> linkedin.com/in/abelangel96
                </p>
                <p className="flex items-center justify-center md:justify-start">
                  <FaMapMarkerAlt className="mr-2" /> Quilmes, Buenos Aires, Argentina
                </p>
              </div>
            </div>
          </div>

          {/* Perfil profesional */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Perfil Profesional</h3>
            <p className="text-slate-600">{data.aboutMe.bio}</p>
          </div>
        </header>

        {/* Experiencia Laboral */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">Experiencia Laboral</h2>

          <div className="space-y-6">
            {data.experience.experiences.map((job, index) => (
              <div key={index} className="pb-4">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <h3 className="text-xl font-semibold text-primary">
                    {job.role} - {job.company}
                  </h3>
                  <span className="text-slate-500">{job.period}</span>
                </div>
                <p className="text-slate-700 font-medium mt-2">{job.project}</p>
                <ul className="mt-2 list-disc list-inside text-slate-600">
                  {job.description.map((desc, i) => (
                    <li
                      key={i}
                      dangerouslySetInnerHTML={{
                        __html: desc.replace(/<span class='knowledge'>|<span class='tool'>|<\/span>/g, ""),
                      }}
                    ></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Educación */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">Educación</h2>

          <div className="space-y-6">
            {data.education.mainEducation.map((edu, index) => (
              <div key={index} className="pb-4">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <h3 className="text-xl font-semibold text-primary">{edu.degree}</h3>
                  <span className="text-slate-500">{edu.period}</span>
                </div>
                <p className="text-slate-700 mt-1">{edu.institution}</p>
                {edu.description && <p className="text-slate-600 mt-2">{edu.description}</p>}
              </div>
            ))}

            {data.education.otherEducation.map((edu, index) => (
              <div key={index} className="pb-4">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <h3 className="text-xl font-semibold text-slate-700">{edu.degree}</h3>
                  <span className="text-slate-500">{edu.period}</span>
                </div>
                <p className="text-slate-700 mt-1">{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certificaciones - Formato vertical y compacto */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">Certificaciones</h2>

          <div className="space-y-2">
            {data.education.certifications.map((cert, index) => (
              <div key={index} className="pb-2">
                <p className="text-slate-800">
                  <span className="font-semibold">{cert.title}</span> {cert.subtitle} {cert.date}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Habilidades - Formato vertical */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
            Habilidades Técnicas
          </h2>

          <div className="space-y-6">
            {data.skills.skillRoles.map((role, index) => (
              <div key={index} className="pb-4">
                <h3 className="text-xl font-semibold text-primary mb-3">{role.title}</h3>
                <div className="space-y-2">
                  {role.categories.map((category, catIndex) => (
                    <div key={catIndex} className="mb-2">
                      <p className="text-slate-800 font-medium">{category.title}:</p>
                      <p className="text-slate-600 ml-4">{category.skills.join(", ")}.</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Proyectos Destacados - Formato vertical */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
            Proyectos Destacados
          </h2>

          <div className="space-y-4">
            {data.portfolio.projects.slice(0, 4).map((project) => (
              <div key={project.id} className="pb-3">
                <h3 className="text-lg font-semibold text-slate-800">{project.title}</h3>
                <p className="text-slate-600 mt-1">
                  <span className="font-medium">Tipo:</span> {project.type} |
                  <span className="font-medium"> Herramienta:</span> {project.tool} |
                  <span className="font-medium"> Lenguaje:</span> {project.language}
                </p>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary mt-1 hover:underline flex items-center"
                  >
                    <FaGithub className="mr-2" /> Ver en GitHub
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

