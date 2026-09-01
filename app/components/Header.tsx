"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { FaBars, FaFileAlt, FaTimes } from "react-icons/fa"

const navItems = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#portafolio", label: "Portafolio" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#educacion", label: "Educación" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#faq", label: "FAQ" },
]

/**
 * Header fijo con dos estados: transparente sobre el hero y sólido con blur al
 * hacer scroll. Es el patrón por defecto de las plantillas de Wix/Hostinger:
 * la navegación nunca se pierde y el cambio de estado da sensación de profundidad.
 *
 * Además resalta la sección visible usando IntersectionObserver, para que el
 * usuario siempre sepa dónde está dentro de una página larga.
 */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(`#${visible.target.id}`)
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Bloquea el scroll del fondo mientras el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const closeMenu = useCallback(() => setIsOpen(false), [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/85 backdrop-blur-md shadow-sm border-b border-border/70"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container flex h-[4.5rem] items-center justify-between" aria-label="Navegación principal">
        <Link
          href="/"
          onClick={closeMenu}
          className={`text-lg font-bold tracking-tight transition-colors ${
            scrolled ? "text-foreground" : "text-white"
          }`}
        >
          Abel Angel
          <span className={`ml-2 text-xs font-medium ${scrolled ? "text-accent" : "text-white/70"}`}>QA Engineer</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.href
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    scrolled
                      ? isActive
                        ? "bg-secondary text-primary"
                        : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                      : isActive
                        ? "bg-white/15 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
          <li className="ml-2">
            <Link
              href="/curriculum"
              className={scrolled ? "btn-primary !px-5 !min-h-[2.5rem] text-sm" : "btn-on-dark !px-5 !min-h-[2.5rem]"}
            >
              <FaFileAlt aria-hidden="true" /> Currículum
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className={`-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors md:hidden ${
            scrolled ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/10"
          }`}
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="menu-movil"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </nav>

      {/* Menú móvil: panel sólido a pantalla completa, targets de 44px */}
      <div
        id="menu-movil"
        hidden={!isOpen}
        className="border-t border-border bg-card px-5 pb-6 pt-2 shadow-lg md:hidden"
      >
        <ul className="flex flex-col">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={closeMenu}
                className="flex min-h-[3rem] items-center rounded-lg px-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <Link href="/curriculum" onClick={closeMenu} className="btn-primary mt-4 w-full">
          <FaFileAlt aria-hidden="true" /> Ver currículum
        </Link>
      </div>
    </header>
  )
}
