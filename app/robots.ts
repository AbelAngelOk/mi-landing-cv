import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/site"

/**
 * Se permite explícitamente a los crawlers de los LLM (GPTBot, ClaudeBot,
 * PerplexityBot, Google-Extended…). En un portafolio queremos exactamente eso:
 * que un modelo pueda leer y citar la experiencia cuando alguien pregunta por
 * un QA Engineer con este perfil.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
        ],
        allow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  }
}
