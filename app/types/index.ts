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
export interface PortfolioData {
  projects: Project[]
}

export interface Project {
  id: number
  title: string
  description: string // Agregado campo de descripción
  image: string
  githubUrl: string
  type: "API" | "UI" | "Both"
  tool: "Selenium" | "Other"
  language: string
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

