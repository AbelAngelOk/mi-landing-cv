import Image from "next/image"
import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa"
import { siteConfig } from "@/lib/site"
import type { AboutMeData } from "../types"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

const highlights = [
  "Automatización UI, API, mobile y performance",
  "Banca, seguros, e-commerce y RRHH",
  "Java, C# y Python sobre frameworks propios",
  "Planificación y estrategia de pruebas end to end",
]

export default function AboutMe({ about }: { about: AboutMeData }) {
  return (
    <section id="sobre-mi" className="section bg-background scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow="Sobre mí"
          title={`Soy ${about.name}, QA Engineer`}
          description="Seis años diseñando, automatizando y midiendo la calidad de productos en producción."
        />

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[20rem]">
              {/* Marco decorativo desplazado: profundidad sin sombras pesadas */}
              <div aria-hidden="true" className="absolute -inset-3 rounded-2xl border-2 border-accent/25" />
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary shadow-lg">
                <Image
                  src={about.profileImage || "/placeholder.svg"}
                  alt={`Retrato de ${about.name}, QA Engineer`}
                  fill
                  sizes="(max-width: 1024px) 20rem, 20rem"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg ring-4 ring-background">
                <span className="text-xl font-bold">QA</span>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                <FaMapMarkerAlt className="text-accent" aria-hidden="true" />
                {siteConfig.location.city}, {siteConfig.location.region}, {siteConfig.location.countryName}
              </p>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{about.bio}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <FaCheckCircle className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.3}>
              <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {about.stats.map((stat) => (
                  <div key={stat.label} className="card p-4 text-center">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block text-2xl font-bold text-primary">{stat.value}</span>
                      <span className="mt-1 block text-xs leading-snug text-muted-foreground">{stat.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
