"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { FaBars, FaTimes } from "react-icons/fa"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { href: "#about-me", label: "Sobre Mí" },
    { href: "#portfolio", label: "Portafolio" },
    { href: "#experience", label: "Experiencia" },
    { href: "#education", label: "Educación" },
    { href: "#skills", label: "Habilidades" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)

    const targetId = href.replace("#", "")
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Ajuste para compensar la altura del header
      const headerHeight = 80 // Altura aproximada del header en píxeles
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container py-4">
        <div className="flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${scrolled ? "text-slate-800" : "text-white"}`}>Abel Angel</h1>
          <div className="flex items-center">
            <button
              className={`md:hidden ${scrolled ? "text-slate-600 hover:text-slate-800" : "text-white hover:text-slate-200"}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`transition duration-300 cursor-pointer ${
                    scrolled ? "text-slate-600 hover:text-primary" : "text-white hover:text-slate-200"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {isOpen && (
          <ul className={`mt-4 space-y-2 md:hidden ${scrolled ? "bg-white" : "bg-black bg-opacity-70"} p-4 rounded-lg`}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block transition duration-300 cursor-pointer ${
                    scrolled ? "text-slate-600 hover:text-primary" : "text-white hover:text-slate-200"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/curriculum"
                className={`block transition duration-300 cursor-pointer ${
                  scrolled ? "text-slate-600 hover:text-primary" : "text-white hover:text-slate-200"
                }`}
              >
                Currículum
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}

