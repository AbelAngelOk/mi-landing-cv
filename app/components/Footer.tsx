import { FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 py-8">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <p className="mb-4 md:mb-0">&copy; 2023 Abel Angel. Todos los derechos reservados.</p>
        <div className="flex space-x-6">
          <a
            href="https://www.linkedin.com/in/abelangel96"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition duration-300"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://wa.me/5491130830388"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition duration-300"
          >
            <FaWhatsapp size={24} />
          </a>
          <a href="mailto:abel.angel1996@gmail.com" className="hover:text-primary transition duration-300">
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

