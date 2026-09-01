import Link from "next/link"
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import { siteConfig } from "@/lib/site"

const navLinks = [
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#portafolio", label: "Portafolio" },
  { href: "/#experiencia", label: "Experiencia" },
  { href: "/#educacion", label: "Educación" },
  { href: "/#habilidades", label: "Habilidades" },
  { href: "/#faq", label: "FAQ" },
  { href: "/curriculum", label: "Currículum" },
]

const social = [
  { href: siteConfig.profiles.linkedin, label: "LinkedIn", icon: <FaLinkedin aria-hidden="true" /> },
  { href: siteConfig.profiles.github, label: "GitHub", icon: <FaGithub aria-hidden="true" /> },
  { href: siteConfig.profiles.whatsapp, label: "WhatsApp", icon: <FaWhatsapp aria-hidden="true" /> },
  { href: `mailto:${siteConfig.email}`, label: "Correo", icon: <FaEnvelope aria-hidden="true" /> },
]

export default function Footer() {
  // Año calculado en el servidor: no queda un "2023" viejo hardcodeado
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold tracking-tight text-foreground">{siteConfig.name}</p>
            <p className="mt-1 text-sm text-accent">{siteConfig.jobTitle}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Automatización de pruebas UI, API, mobile y performance desde {siteConfig.location.city},{" "}
              {siteConfig.location.countryName}.
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <h2 className="eyebrow">Secciones</h2>
            <ul className="mt-4 grid grid-cols-2 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow">Contacto</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.profiles.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  +54 9 11 3083-0388
                </a>
              </li>
            </ul>

            <ul className="mt-5 flex gap-2">
              {social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {item.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
