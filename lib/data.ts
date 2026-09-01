import fs from "fs"
import path from "path"
import type {
  AboutMeData,
  EducationData,
  ExperienceData,
  FaqData,
  HeroData,
  PortfolioData,
  SkillsData,
} from "@/app/types"

/**
 * Lectura de los JSON de /data en el servidor.
 *
 * Antes cada sección hacía fetch a /api/* desde el cliente con useEffect: el HTML
 * que recibían Google y los crawlers de los LLM llegaba vacío. Leer en el servidor
 * hace que todo el contenido viaje ya renderizado en el HTML.
 */
function readJson<T>(fileName: string): T {
  const filePath = path.join(process.cwd(), "data", fileName)
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T
}

export const getHero = () => readJson<HeroData>("hero.json")
export const getAboutMe = () => readJson<AboutMeData>("aboutMe.json")
export const getExperience = () => readJson<ExperienceData>("experience.json")
export const getEducation = () => readJson<EducationData>("education.json")
export const getSkills = () => readJson<SkillsData>("skills.json")
export const getPortfolio = () => readJson<PortfolioData>("portfolio.json")
export const getFaq = () => readJson<FaqData>("faq.json")

export function getAllData() {
  return {
    hero: getHero(),
    aboutMe: getAboutMe(),
    experience: getExperience(),
    education: getEducation(),
    skills: getSkills(),
    faq: getFaq(),
  }
}

export type AllData = ReturnType<typeof getAllData>

/** Quita el marcado <span class='tool'>…</span> que se usa para resaltar en pantalla. */
export const stripHighlights = (html: string) => html.replace(/<\/?span[^>]*>/g, "")
