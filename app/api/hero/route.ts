import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // Leer el archivo JSON
    const filePath = path.join(process.cwd(), "data", "hero.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    const data = JSON.parse(fileContents)

    // Devolver los datos como respuesta JSON
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error al leer los datos del hero:", error)
    return NextResponse.json({ error: "Error al obtener los datos del hero" }, { status: 500 })
  }
}

