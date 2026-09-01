// Hero Types
export interface HeroData {
  title: string
  roles: string[]
  description: string
  profileImage: string
  socialLinks: SocialLink[]
}

export interface SocialLink {
  type: string
  url: string
  label: string
}

// About Me Types
export interface AboutMeData {
  name: string
  profileImage: string
  bio: string
  stats: Stat[]
}

export interface Stat {
  value: string
  label: string
}

// Portfolio Types

/** Lo que se escribe a mano en data/portfolio.json. */
export interface CuratedProject {
  /** Nombre exacto del repositorio en GitHub. Si falta, el proyecto se muestra sin enlace. */
  repo?: string
  title: string
  description: string
  type: "API" | "UI" | "Both"
  /** Herramienta principal: Selenium, Cypress, Karate, Postman, Lippia… */
  tool: string
  /** Lenguaje de respaldo; si GitHub detecta uno, gana el de GitHub. */
  language: string
  tags?: string[]
}

export interface PortfolioData {
  projects: CuratedProject[]
}

/** Proyecto curado + metadata viva de la API de GitHub. */
export interface Project extends CuratedProject {
  url?: string
  stars?: number
  forks?: number
  isFork?: boolean
  isArchived?: boolean
  /** Fecha ISO del último push. */
  lastActivity?: string
  /** false cuando la API de GitHub no respondió y solo hay datos locales. */
  hasLiveMetadata: boolean
}

// Experience Types
export interface ExperienceData {
  experiences: Experience[]
}

export interface Experience {
  company: string
  role: string
  period: string
  project: string
  description: string[]
}

// Education Types
export interface EducationData {
  mainEducation: Education[]
  otherEducation: Education[]
  certifications: Certification[]
}

export interface Education {
  institution: string
  degree: string
  period: string
  status: string
  highlight?: boolean
  description?: string
  skills?: string[]
}

export interface Certification {
  title: string
  subtitle: string
  date: string
}

// Skills Types
export interface SkillsData {
  skillRoles: SkillRole[]
}

export interface SkillRole {
  title: string
  icon: string
  categories: SkillCategory[]
}

export interface SkillCategory {
  title: string
  skills: string[]
}


// FAQ Types (usados también para el JSON-LD FAQPage que leen los buscadores y LLM)
export interface Faq {
  question: string
  answer: string
}

export interface FaqData {
  faqs: Faq[]
}
