# Criterios de aceptación — UX/UI, SEO, GEO y LLMO

Documento de referencia del rediseño del portafolio. Los criterios salen de tres fuentes:

1. **Patrones de Wix y Hostinger**: lo que hacen sus plantillas y su editor para que un sitio
   se vea "hecho por un estudio" (sistema de diseño cerrado, ritmo vertical fijo, jerarquía
   tipográfica, animaciones sutiles al hacer scroll, un CTA por vista).
2. **Página de referencia del CV**: `palevioletred-hyena-375469.hostingersite.com`, generada con
   Hostinger Horizons. Se analizó su bundle para extraer estructura y clases reales.
3. **Prácticas de SEO tradicional + GEO/LLMO** (optimización para motores generativos).

Formato: `Dado / Cuando / Entonces` donde aporta, criterio verificable siempre.
Estado: ✅ implementado · ⚠️ implementado con dependencia externa.

---

## 1. Sistema de diseño

| # | Criterio | Estado |
|---|----------|--------|
| 1.1 | Todos los colores salen de tokens CSS (`--primary`, `--accent`, `--muted`…). No hay hex sueltos ni `blue-600`/`green-600`/`purple-100` dispersos en los componentes. | ✅ |
| 1.2 | Existe una única escala tipográfica. Los títulos usan `tracking-tight` y `text-balance`; el cuerpo, `leading-relaxed`. | ✅ |
| 1.3 | Todas las secciones comparten el mismo ritmo vertical (`.section` = `py-20 sm:py-24 lg:py-28`) y el mismo contenedor (`max-w-6xl`). | ✅ |
| 1.4 | Los encabezados de sección son un solo componente reutilizable: eyebrow → título → bajada → regla de acento. | ✅ |
| 1.5 | Los botones tienen jerarquía explícita: `.btn-primary`, `.btn-accent`, `.btn-secondary`, `.btn-ghost`, `.btn-on-dark`. Nunca dos primarios compitiendo en la misma vista. | ✅ |
| 1.6 | Los radios de borde y las sombras salen de dos variantes (`.card`, `.card-interactive`), no se definen caso por caso. | ✅ |

## 2. Psicología del color

Reparto **60/30/10**: 60% neutros fríos, 30% azul, 10% teal.

| # | Criterio | Estado |
|---|----------|--------|
| 2.1 | **Azul profundo** (`--primary`, `hsl(219 84% 30%)`) es el color dominante de marca: confianza, rigor y competencia técnica. Ocupa header sólido, hero, CTAs y títulos de jerarquía alta. | ✅ |
| 2.2 | **Teal** (`--accent`, `hsl(189 94% 26%)`) funciona como color de verificación —la idea de "check", de calidad comprobada— y se reserva para el CTA final, los eyebrows y los datos numéricos. Al aparecer poco, marca dirección. | ✅ |
| 2.3 | **Neutros slate fríos** sostienen fondos y texto secundario para que el ojo descanse y el azul destaque. | ✅ |
| 2.4 | Verde, ámbar y rojo quedan reservados **solo** para significado de estado (pass / warning / fail), el idioma nativo de QA. No se usan como decoración. | ✅ |
| 2.5 | Todo par texto/fondo cumple contraste **AA** (≥ 4.5:1 en texto normal, ≥ 3:1 en texto grande). | ✅ |
| 2.6 | El fondo oscuro (`--surface-deep`) se usa exactamente dos veces —hero y banda de cierre— para abrir y cerrar la página con el mismo peso visual. | ✅ |

## 3. Movimiento e interacción

| # | Criterio | Estado |
|---|----------|--------|
| 3.1 | Dado que el usuario baja por la página, cuando una sección entra en viewport, entonces aparece con fade + 16px de desplazamiento, **una sola vez**, en 0.5s con curva de salida. | ✅ |
| 3.2 | Los elementos hermanos escalonan su entrada (stagger ≤ 0.08s, tope 0.3s) para que no aparezcan todos de golpe. | ✅ |
| 3.3 | Dado un usuario con `prefers-reduced-motion: reduce`, cuando carga la página, entonces no hay animaciones, ni scroll suave, ni transiciones. | ✅ |
| 3.4 | El hover de tarjetas eleva la sombra y desplaza -4px en ≤ 300ms. Ningún hover cambia el tamaño del contenido (nada de `scale-105`, que desenfoca el texto). | ✅ |
| 3.5 | Las transiciones de color duran 200ms; ninguna animación supera 500ms. | ✅ |

## 4. Navegación

| # | Criterio | Estado |
|---|----------|--------|
| 4.1 | Dado que el usuario está en el hero, el header es transparente. Cuando scrollea más de 24px, entonces pasa a sólido con `backdrop-blur` y borde inferior. | ✅ |
| 4.2 | Dado que una sección ocupa el centro del viewport, entonces su ítem de menú queda resaltado (`IntersectionObserver` + `aria-current`). | ✅ |
| 4.3 | Al navegar a un ancla, el header fijo no tapa el título: `scroll-padding-top` + `scroll-mt-24` en cada sección. | ✅ |
| 4.4 | El menú móvil es un panel sólido, bloquea el scroll del fondo y se cierra al elegir un destino. | ✅ |
| 4.5 | Existe un enlace "Saltar al contenido" visible solo con teclado. | ✅ |

## 5. Accesibilidad

| # | Criterio | Estado |
|---|----------|--------|
| 5.1 | Un solo `<h1>` por página; el resto en orden jerárquico sin saltos. | ✅ |
| 5.2 | Todo elemento interactivo tiene un área táctil mínima de 44×44px. | ✅ |
| 5.3 | Foco visible y consistente (`ring-2`) en todo lo enfocable. | ✅ |
| 5.4 | Las pestañas de habilidades implementan el patrón ARIA tabs, con navegación por flechas, Home y End. | ✅ |
| 5.5 | Los iconos decorativos llevan `aria-hidden`; los enlaces que abren pestaña nueva lo declaran en su `aria-label`. | ✅ |
| 5.6 | El filtrado del portafolio anuncia la cantidad de resultados con `aria-live="polite"`. | ✅ |
| 5.7 | El FAQ usa `<details>/<summary>` nativo: accesible y funcional sin JavaScript. | ✅ |

## 6. Rendimiento y percepción de velocidad

| # | Criterio | Estado |
|---|----------|--------|
| 6.1 | Dado un visitante nuevo, cuando carga la página, entonces ve el contenido real de inmediato: **cero spinners**. Todo el texto viene renderizado del servidor. | ✅ |
| 6.2 | `/` y `/curriculum` se prerenderizan como estáticas en el build. | ✅ |
| 6.3 | Toda imagen tiene contenedor de proporción fija (`aspect-square`) para no provocar saltos de layout (CLS). El portafolio directamente no usa imágenes. | ✅ |
| 6.4 | La fuente carga con `display: swap` y variable CSS: no hay texto invisible durante la carga. | ✅ |
| 6.5 | El JS de cliente se limita a lo que necesita interacción: header, filtros, pestañas, tipeo y botón de imprimir. El resto son Server Components. | ✅ |

## 7. Sección de descarga del PDF (`/curriculum`)

Criterios derivados del análisis de la página de referencia.

| # | Criterio | Estado |
|---|----------|--------|
| 7.1 | El CV se presenta como una **hoja**: tarjeta blanca `max-w-4xl` con `rounded-xl`, borde `border/60` y sombra suave, centrada sobre fondo gris tenue (`bg-secondary/40`). | ✅ |
| 7.2 | El encabezado usa grilla `md:grid-cols-3`: foto circular con borde de 4px y sombra en una columna, identidad y contacto en las dos restantes. | ✅ |
| 7.3 | El nombre va en `text-4xl sm:text-5xl font-bold tracking-tight`; el rol debajo en `text-lg text-muted-foreground`. | ✅ |
| 7.4 | Los datos de contacto van en una fila que envuelve, separada por un borde superior, con icono de 16px + texto en `text-sm`. | ✅ |
| 7.5 | Cada título de sección va en versalitas (`text-sm uppercase tracking-[0.18em]`) flanqueado por dos reglas degradadas que se desvanecen hacia los extremos. | ✅ |
| 7.6 | Las entradas se separan con `border-b border-border/60`, sin borde en la última. Título a la izquierda, período alineado a la derecha con `whitespace-nowrap`. | ✅ |
| 7.7 | Existe una barra de acciones sticky, oculta al imprimir, con "Descargar PDF" como único CTA primario y "Volver al portafolio" en secundario. | ✅ |
| 7.8 | Dado que el usuario pulsa "Descargar PDF", cuando se abre el diálogo de impresión, entonces la hoja sale sin sombras, sin bordes, en A4, con tipografía en puntos y sin cortes a mitad de una entrada. | ✅ |
| 7.9 | Los chips `<span class='tool'>` del portafolio se eliminan del texto en la versión imprimible. | ✅ |

## 8. SEO

| # | Criterio | Estado |
|---|----------|--------|
| 8.1 | Dado un crawler que **no ejecuta JavaScript**, cuando pide `/`, entonces recibe todo el contenido en el HTML. *(Antes no: cada sección hacía `fetch` a `/api/*` desde el navegador y el HTML llegaba vacío. Este era el problema de SEO más grave del sitio.)* | ✅ |
| 8.2 | `title` con plantilla por página y `description` única de 150-160 caracteres. | ✅ |
| 8.3 | `canonical` en ambas páginas. | ⚠️ requiere `NEXT_PUBLIC_SITE_URL` |
| 8.4 | Open Graph y Twitter Card completos, con imagen, dimensiones y `alt`. | ✅ |
| 8.5 | `sitemap.xml` y `robots.txt` generados por Next. | ⚠️ requiere `NEXT_PUBLIC_SITE_URL` |
| 8.6 | HTML semántico: `header`, `main`, `section`, `article`, `nav`, `footer`, `ol`/`ul`, `dl` para pares dato-etiqueta. | ✅ |
| 8.7 | `lang="es"` en `<html>` y `og:locale` en `es_AR`. | ✅ |
| 8.8 | Todas las imágenes con `alt` descriptivo; las decorativas con `alt=""`. | ✅ |

## 9. GEO / LLMO

| # | Criterio | Estado |
|---|----------|--------|
| 9.1 | JSON-LD con grafo completo: `WebSite`, `ProfilePage`, `Person`, `FAQPage`, `ItemList` de proyectos, y `BreadcrumbList` en el CV. Un solo `<script>` por página. | ✅ |
| 9.2 | La entidad `Person` declara `jobTitle`, `address`, `sameAs`, `worksFor`, `hasOccupation`, `alumniOf`, `hasCredential` y `knowsAbout` (70 tecnologías derivadas de `skills.json`). El marcado explícito de entidad es lo que más peso tiene para ser citado en respuestas generativas. | ✅ |
| 9.3 | Existe una sección de preguntas frecuentes con respuestas autocontenidas que responden en la primera oración. Los pares pregunta-respuesta son el formato que los motores generativos citan con más frecuencia. | ✅ |
| 9.4 | El JSON-LD `FAQPage` refleja exactamente el texto visible: nada de contenido oculto solo para máquinas. | ✅ |
| 9.5 | `public/llms.txt` resume identidad, especialidades, experiencia y páginas en Markdown plano. | ✅ |
| 9.6 | `robots.txt` permite explícitamente GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended y CCBot. | ✅ |
| 9.7 | Los datos son extraíbles: cifras en `<dl>`, tecnologías en listas, fechas absolutas (nunca "hace tres meses"). | ✅ |
| 9.8 | El nombre de la entidad es idéntico en todas partes: "Abel Angel — QA Engineer". La consistencia de nombre es lo que permite a un modelo resolver la entidad sin ambigüedad. | ✅ |


## 10. Portafolio y sincronización con GitHub

La sección se rehízo como **lista de repositorios**: los proyectos no tienen imagen propia y los
iconos genéricos que había antes ocupaban media tarjeta sin aportar nada. En filas, lo primero que
se lee es el título y qué se prueba.

La fuente es **curaduría + API de GitHub**: `data/portfolio.json` decide qué se muestra, en qué
orden y con qué texto; la API aporta lo que cambia solo.

| # | Criterio | Estado |
|---|----------|--------|
| 10.1 | El orden y los textos salen de `data/portfolio.json`. Agregar un proyecto es agregar un objeto con el nombre del repo. | ✅ |
| 10.2 | Dado un repo listado, cuando se construye la página, entonces el lenguaje, las estrellas, los forks y la fecha del último push se leen de `api.github.com`. | ✅ |
| 10.3 | Dado que la API de GitHub falla (rate limit, red caída, token inválido), entonces la sección se renderiza igual con los datos curados y los enlaces siguen funcionando, construidos a partir del nombre del repo. **Verificado forzando un 401.** | ✅ |
| 10.4 | La consulta se revalida cada hora (`revalidate: 3600`), muy por debajo del límite de 60 pedidos/hora sin autenticar. Con `GITHUB_TOKEN` sube a 5000/hora. | ✅ |
| 10.5 | Las estrellas se muestran solo si son más de una: un `★1` en todos los repos es ruido, no señal. | ✅ |
| 10.6 | Los forks se marcan como tales. No se presenta trabajo ajeno como propio. | ✅ |
| 10.7 | Un proyecto sin repositorio público se muestra sin enlace y marcado como "Código no publicado", en vez de con un enlace roto. | ✅ |
| 10.8 | El punto de color del lenguaje usa la paleta oficial de GitHub Linguist. | ✅ |
| 10.9 | El JSON-LD `SoftwareSourceCode` declara `codeRepository` solo cuando el código es público. | ✅ |
| 10.10 | En el currículum imprimible entran únicamente los proyectos con repositorio: en un PDF, un enlace es lo único accionable. | ✅ |

### Decisiones de contenido

- **`cypress-P2P-demo` quedó fuera**: el repositorio está vacío (0 bytes, sin commits). Enlazarlo
  desde el portafolio mandaría a un reclutador a una página en blanco. Si se le sube el código,
  basta con agregarlo a `data/portfolio.json`.
- **Se ordenó por relevancia de QA, no por fecha.** Los repos más activos de la cuenta son proyectos
  personales (`despertador-alba`, `aoe3de_mod`, `menu-app`, `training-app`); ordenar por `pushed_at`
  dejaría los frameworks de pruebas debajo de todos ellos.
- **Se agregó `DemoAutPy`**, que estaba en GitHub pero no en el sitio.
- **Karate y Postman se conservaron sin enlace**: el contenido es real pero no hay repositorio público.

### Cómo agregar un proyecto

```jsonc
// data/portfolio.json
{
  "repo": "nombre-exacto-del-repo",  // opcional; sin esto se muestra sin enlace
  "title": "Título en español",
  "description": "Qué se prueba y con qué enfoque.",
  "type": "UI",                       // UI | API | Both
  "tool": "Selenium",
  "language": "Java",                 // respaldo; GitHub tiene prioridad
  "tags": ["Page Object Model"]
}
```


---

## Dependencia de deploy

Los criterios 8.3 y 8.5 dependen de una variable de entorno:

```
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

Debe estar definida **en el momento del build** (en Amplify: *App settings → Environment variables*),
no solo en runtime: las variables `NEXT_PUBLIC_*` se incrustan al compilar y ambas páginas se
prerenderizan como estáticas. Sin ella, el canonical, el sitemap y los `@id` del JSON-LD apuntan
a `http://localhost:3000`.

## Cómo verificar

```bash
npm run build && npx next start -p 3000

# 1. Contenido en el HTML sin ejecutar JS (criterio 8.1)
curl -s http://localhost:3000/ | grep -c "Scale Center"

# 2. JSON-LD válido
curl -s http://localhost:3000/ | grep -o '<script type="application/ld+json">.*</script>'

# 3. sitemap y robots
curl -s http://localhost:3000/sitemap.xml
curl -s http://localhost:3000/robots.txt
```

### Variable opcional

```
GITHUB_TOKEN=ghp_...   # token de solo lectura, sube el rate limit de 60 a 5000 pedidos/hora
```

No hace falta para que funcione: sin token, la revalidación horaria queda muy holgada dentro
del límite anónimo.

Validadores externos: [Rich Results Test](https://search.google.com/test/rich-results),
[Schema Markup Validator](https://validator.schema.org/), Lighthouse (pestaña Accessibility y SEO).
