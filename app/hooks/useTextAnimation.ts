"use client"

import { useState, useEffect } from "react"

const roles = ["Analyst", "Engineer", "Manager"]
const typingSpeed = 120 // Velocidad de escritura
const deletingSpeed = 60 // Velocidad de borrado
const pauseBeforeDelete = 3600 // Pausa antes de borrar
const pauseBeforeNextWord = 1000 // Pausa antes de escribir la siguiente palabra

export function useTextAnimation() {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = roles[currentIndex]
    let timer: NodeJS.Timeout

    if (!isDeleting) {
      // Escribiendo
      if (displayedText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1))
        }, typingSpeed)
      } else {
        // Pausa antes de borrar
        timer = setTimeout(() => setIsDeleting(true), pauseBeforeDelete)
      }
    } else {
      // Borrando
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, deletingSpeed)
      } else {
        // Pasar al siguiente índice después de borrar completamente
        timer = setTimeout(() => {
          setIsDeleting(false)
          setCurrentIndex((currentIndex + 1) % roles.length)
        }, pauseBeforeNextWord)
      }
    }

    return () => clearTimeout(timer)
  }, [displayedText, isDeleting, currentIndex])

  return displayedText
}

