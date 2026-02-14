import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-artra-navy border border-black shadow-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-6">
          <p className="text-white text-base font-semibold">
            © 2025 ARTRA. Todos los derechos reservados
          </p>
          <div className="flex items-center gap-8 flex-wrap justify-center">
            <Link
              to="/ayuda"
              className="text-artra-lighter-blue text-base font-semibold hover:text-white transition-colors"
            >
              Ayuda
            </Link>
            <Link
              to="/contactanos"
              className="text-artra-lighter-blue text-base font-semibold hover:text-white transition-colors"
            >
              Contáctanos
            </Link>
            <Link
              to="/terminos"
              className="text-artra-lighter-blue text-base font-semibold hover:text-white transition-colors"
            >
              Términos de uso
            </Link>
            <Link
              to="/condicionesEnvio"
              className="text-artra-lighter-blue text-base font-semibold hover:text-white transition-colors"
            >
              Politicas de Envio y Condiciones
            </Link>
            <Link
              to="/privacidad"
              className="text-artra-lighter-blue text-base font-semibold hover:text-white transition-colors"
            >
              Aviso de privacidad
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <a
              href="https://www.instagram.com/artra_mex?igsh=cmYzZHN5bXFieDV5&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-artra-lighter-blue hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.tiktok.com/@artra_mex?_r=1&_t=ZS-93IZk7NmpLZ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-artra-lighter-blue hover:text-white transition-colors"
              aria-label="TikTok"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61587130073975&mibextid=rS40aB7S9Ucbxw6v"
              target="_blank"
              rel="noopener noreferrer"
              className="text-artra-lighter-blue hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="mailto:artramexx@gmail.com"
              className="text-artra-lighter-blue hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=19.714522,-98.978876"
              target="_blank"
              rel="noopener noreferrer"
              className="text-artra-lighter-blue hover:text-white transition-colors"
              aria-label="Ubicación"
              title="Ver ubicación en Google Maps"
            >
              <MapPin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
