"use client"

import { FaRegCheckCircle, FaClipboardList, FaBug, FaBullhorn, FaHandshake, FaBullseye } from "react-icons/fa"
import { useRef, useEffect } from "react"

export default function Profile() {
  const qualities = [
    { icon: <FaClipboardList className="text-3xl text-blue-500" />, title: "Estimación de Pruebas" },
    { icon: <FaBullseye className="text-3xl text-yellow-500" />, title: "Priorización de Pruebas" },
    { icon: <FaBug className="text-3xl text-red-500" />, title: "Gestión de Defectos" },
    { icon: <FaRegCheckCircle className="text-3xl text-green-500" />, title: "Atención al Detalle" },
    { icon: <FaBullhorn className="text-3xl text-purple-500" />, title: "Comunicación Efectiva" },
    { icon: <FaHandshake className="text-3xl text-teal-500" />, title: "Colaboración en Equipo" },
  ]

  const carouselRef = useRef(null)

  useEffect(() => {
    const scrollCarousel = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 1, behavior: "smooth" })

        if (carouselRef.current.scrollLeft + carouselRef.current.clientWidth >= carouselRef.current.scrollWidth - 1) {
          carouselRef.current.scrollTo({ left: 0, behavior: "instant" })
        }
      }
    }

    const interval = setInterval(scrollCarousel, 30) // Movimiento continuo

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="profile" className="py-16 bg-slate-100">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Texto en columna central */}

        {/* Sección de habilidades con carrusel */}
        <div className="relative max-w-3xl mx-auto overflow-hidden">
          {/* Degradados laterales para indicar scroll */}
          <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-slate-100 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-slate-100 to-transparent pointer-events-none"></div>

          <div ref={carouselRef} className="flex space-x-6 overflow-hidden whitespace-nowrap">
            {qualities.concat(qualities).map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md border-2 border-slate-300 min-w-[200px] max-w-[220px] overflow-hidden"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg text-wrap text-slate-800 text-center break-words">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

