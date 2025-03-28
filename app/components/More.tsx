export default function More() {
  return (
    <section id="more" className="mb-12">
      <h2 className="text-3xl font-bold mb-4">Más</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">Certificaciones</h3>
          <ul className="list-disc list-inside mt-2">
            <li>AWS Academy | Cloud Foundations</li>
            <li>Administración de Proyectos en JIRA | UTN FRRE</li>
            <li>Tester | CESSI</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Habilidades</h3>
          <ul className="list-disc list-inside mt-2">
            <li>Automatización de pruebas (UI y API)</li>
            <li>Gestión de proyectos con metodologías ágiles</li>
            <li>Comunicación efectiva en equipos multidisciplinarios</li>
            <li>Dominio de herramientas como Jira, Selenium, Cucumber</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

