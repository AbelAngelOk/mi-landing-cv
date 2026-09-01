import { getAllData } from "@/lib/data"
import { getProjects } from "@/lib/github"
import { JsonLd, homeSchema } from "@/lib/schema"
import AboutMe from "./components/AboutMe"
import CvCallout from "./components/CvCallout"
import Education from "./components/Education"
import Experience from "./components/Experience"
import Faq from "./components/Faq"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Portfolio from "./components/Portfolio"
import Skills from "./components/Skills"

/**
 * Server Component: lee los JSON de /data en el servidor y los pasa por props.
 *
 * Antes cada sección se montaba vacía y hacía fetch a /api/* desde el navegador,
 * así que el HTML que recibían Google, Bing y los crawlers de los LLM no tenía
 * contenido. Ahora todo el texto viaja renderizado y además desaparecen los
 * spinners: la página se ve completa desde el primer pintado.
 */
export default async function Home() {
  const data = getAllData()
  // La metadata de GitHub se revalida cada hora; si la API falla, quedan los datos curados
  const projects = await getProjects()

  return (
    <>
      <JsonLd schema={homeSchema(data, projects)} />
      <Header />
      <main id="contenido">
        <Hero hero={data.hero} about={data.aboutMe} />
        <AboutMe about={data.aboutMe} />
        <Portfolio projects={projects} />
        <Experience experience={data.experience} />
        <Education education={data.education} />
        <Skills skills={data.skills} />
        <Faq faq={data.faq} />
        <CvCallout />
      </main>
      <Footer />
    </>
  )
}
