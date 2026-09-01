import { getPortfolio } from "@/lib/data"
import type { CuratedProject, Project } from "@/app/types"

export const GITHUB_USER = "AbelAngelOk"
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USER}`

/** Subconjunto de la respuesta de la API que realmente usamos. */
interface GitHubRepo {
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  pushed_at: string
  fork: boolean
  archived: boolean
}

/**
 * Trae los repositorios públicos de la cuenta.
 *
 * Sin token la API permite 60 pedidos por hora y por IP; con `revalidate: 3600`
 * hacemos como mucho uno por hora, así que alcanza de sobra. Si existe la
 * variable GITHUB_TOKEN (un personal access token de solo lectura) el límite
 * sube a 5000/hora, útil si el build corre muchas veces.
 *
 * Cualquier fallo —red caída, rate limit, respuesta rara— se traga a propósito:
 * la sección se arma igual con los datos curados de data/portfolio.json y solo
 * pierde la metadata viva. El portafolio nunca depende de que GitHub responda.
 */
async function fetchRepos(): Promise<Map<string, GitHubRepo>> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`, {
      headers,
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      console.warn(`[github] La API respondió ${response.status}; se usan solo los datos locales.`)
      return new Map()
    }

    const repos = (await response.json()) as GitHubRepo[]
    return new Map(repos.map((repo) => [repo.name.toLowerCase(), repo]))
  } catch (error) {
    console.warn("[github] No se pudo consultar la API; se usan solo los datos locales.", error)
    return new Map()
  }
}

/**
 * Combina la lista curada con la metadata de GitHub.
 *
 * La curaduría manda: qué proyectos se muestran, en qué orden y con qué texto
 * sale de data/portfolio.json. GitHub solo aporta lo que cambia con el tiempo
 * (lenguaje detectado, estrellas, forks, última actividad).
 */
export async function getProjects(): Promise<Project[]> {
  const curated = getPortfolio().projects
  const repos = await fetchRepos()

  return curated.map((project: CuratedProject) => {
    const repo = project.repo ? repos.get(project.repo.toLowerCase()) : undefined

    return {
      ...project,
      // Aunque la API falle, el enlace se puede construir con el nombre del repo
      url: project.repo ? (repo?.html_url ?? `${GITHUB_PROFILE_URL}/${project.repo}`) : undefined,
      // GitHub devuelve language: null en repos sin código detectable; ahí vale el dato curado
      language: repo?.language ?? project.language,
      stars: repo?.stargazers_count,
      forks: repo?.forks_count,
      isFork: repo?.fork ?? false,
      isArchived: repo?.archived ?? false,
      lastActivity: repo?.pushed_at,
      hasLiveMetadata: Boolean(repo),
    }
  })
}
