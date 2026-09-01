import type { AllData } from "@/lib/data"
import type { Project } from "@/app/types"
import { absoluteUrl, siteConfig } from "@/lib/site"

/**
 * JSON-LD para SEO tradicional y para GEO/LLMO.
 *
 * Los motores generativos (AI Overviews, Perplexity, ChatGPT Search) citan con
 * mucha más frecuencia entidades con marcado explícito que texto suelto: el
 * schema le dice a la máquina "esto es una Persona, se llama X, sabe hacer Y"
 * en lugar de obligarla a inferirlo del HTML.
 */

const PERSON_ID = absoluteUrl("/#person")

/** Todas las tecnologías nombradas en skills, sin repetir: alimenta knowsAbout. */
function knowsAbout(data: AllData): string[] {
  const fromSkills = data.skills.skillRoles.flatMap((role) => role.categories.flatMap((c) => c.skills))
  return Array.from(new Set(["Quality Assurance", "Automatización de pruebas", "Pruebas de performance", ...fromSkills]))
}

export function personSchema(data: AllData) {
  const current = data.experience.experiences[0]

  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.name,
    jobTitle: siteConfig.jobTitle,
    description: data.aboutMe.bio,
    image: absoluteUrl(siteConfig.image),
    url: absoluteUrl("/"),
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    sameAs: [siteConfig.profiles.linkedin, siteConfig.profiles.github],
    worksFor: current ? { "@type": "Organization", name: current.company } : undefined,
    hasOccupation: {
      "@type": "Occupation",
      name: siteConfig.jobTitle,
      occupationalCategory: "15-1253.00 Software Quality Assurance Analysts and Testers",
    },
    alumniOf: data.education.mainEducation
      .concat(data.education.otherEducation)
      .map((edu) => ({ "@type": "EducationalOrganization", name: edu.institution })),
    hasCredential: data.education.certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: `${cert.title} — ${cert.subtitle}`,
      dateCreated: cert.date,
    })),
    knowsAbout: knowsAbout(data),
    knowsLanguage: ["es", "en"],
  }
}

export function faqSchema(data: AllData) {
  return {
    "@type": "FAQPage",
    "@id": absoluteUrl("/#faq"),
    mainEntity: data.faq.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }
}

export function projectsSchema(projects: Project[]) {
  return {
    "@type": "ItemList",
    "@id": absoluteUrl("/#proyectos"),
    name: "Proyectos de automatización de pruebas",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: project.title,
        description: project.description,
        // Solo se declara el repositorio cuando el código es público
        ...(project.url ? { codeRepository: project.url } : {}),
        programmingLanguage: project.language,
        author: { "@id": PERSON_ID },
      },
    })),
  }
}

/** Grafo único para la home: una sola etiqueta <script> con todas las entidades. */
export function homeSchema(data: AllData, projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: siteConfig.headline,
        inLanguage: siteConfig.lang,
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl("/#webpage"),
        url: absoluteUrl("/"),
        name: siteConfig.headline,
        isPartOf: { "@id": absoluteUrl("/#website") },
        about: { "@id": PERSON_ID },
        inLanguage: siteConfig.lang,
        mainEntity: { "@id": PERSON_ID },
      },
      personSchema(data),
      faqSchema(data),
      projectsSchema(projects),
    ],
  }
}

export function curriculumSchema(data: AllData, projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl("/curriculum#webpage"),
        url: absoluteUrl("/curriculum"),
        name: `Currículum de ${siteConfig.name} — ${siteConfig.jobTitle}`,
        inLanguage: siteConfig.lang,
        about: { "@id": PERSON_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Currículum", item: absoluteUrl("/curriculum") },
        ],
      },
      personSchema(data),
    ],
  }
}

/** <script type="application/ld+json"> listo para insertar en un Server Component. */
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\u003c") }}
    />
  )
}
