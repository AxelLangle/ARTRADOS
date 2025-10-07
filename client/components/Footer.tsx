import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-artra-navy border border-black shadow-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-6">
          <p className="text-white text-base font-semibold">
            © 2025 ARTRA. Todos los derechos reservados
          </p>
          <div className="flex items-center gap-8">
            <Link
              to="/terminos"
              className="text-artra-lighter-blue text-base font-semibold hover:text-white transition-colors"
            >
              Términos de uso
            </Link>
            <Link
              to="/privacidad"
              className="text-artra-lighter-blue text-base font-semibold hover:text-white transition-colors"
            >
              Políticas de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
