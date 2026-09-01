/**
 * Configuración única del sitio: identidad, URLs canónicas y datos de contacto.
 * Todo lo que consumen metadata, sitemap, robots y los JSON-LD sale de acá,
 * para que no haya dos fuentes de verdad sobre "quién es este sitio".
 *
 * NEXT_PUBLIC_SITE_URL debe definirse en el entorno de deploy (Amplify).
 * Sin esa variable el canonical y el sitemap apuntan a localhost.
 */
export const siteConfig = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  name: "Abel Angel",
  jobTitle: "QA Engineer",
  headline: "Abel Angel — QA Engineer",
  locale: "es_AR",
  lang: "es",
  email: "abel.angel1996@gmail.com",
  phone: "+5491130830388",
  location: {
    city: "Quilmes",
    region: "Buenos Aires",
    country: "AR",
    countryName: "Argentina",
  },
  profiles: {
    linkedin: "https://www.linkedin.com/in/abelangel96",
    github: "https://github.com/AbelAngelOk",
    whatsapp: "https://wa.me/5491130830388",
  },
  image: "/profile1.jpg",
} as const

export const absoluteUrl = (path = "/") => `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`
