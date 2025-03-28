"use client"

import { Suspense } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import AboutMe from "./components/AboutMe"
import Footer from "./components/Footer"
import Portfolio from "./components/Portfolio"
import Experience from "./components/Experience"
import Education from "./components/Education"
import Skills from "./components/Skills"

// Componentes de carga para Suspense
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
  </div>
)

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Suspense fallback={<LoadingFallback />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <AboutMe />
        </Suspense>
        <main>
          <Suspense fallback={<LoadingFallback />}>
            <Portfolio />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Education />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Skills />
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  )
}

