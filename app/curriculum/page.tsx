import type { Metadata } from "next"
import { getAllData } from "@/lib/data"
import { getProjects } from "@/lib/github"
import { JsonLd, curriculumSchema } from "@/lib/schema"
import { siteConfig } from "@/lib/site"
import Curriculum from "../components/Curriculum"

export const metadata: Metadata = {
  title: "Currículum",
  description:
    "Currículum completo de Abel Angel, QA Engineer: experiencia en automatización UI, API, mobile y performance, formación, certificaciones y stack técnico. Descargable en PDF.",
  alternates: { canonical: "/curriculum" },
  openGraph: {
    type: "profile",
    url: "/curriculum",
    title: `Currículum de ${siteConfig.name} — ${siteConfig.jobTitle}`,
    description: "Experiencia, formación, certificaciones y stack técnico en una sola página.",
    images: [{ url: siteConfig.image, width: 400, height: 400, alt: `Retrato de ${siteConfig.name}` }],
  },
}

export default async function CurriculumPage() {
  const data = getAllData()
  const projects = await getProjects()

  return (
    <>
      <JsonLd schema={curriculumSchema(data, projects)} />
      <Curriculum data={data} projects={projects} />
    </>
  )
}
