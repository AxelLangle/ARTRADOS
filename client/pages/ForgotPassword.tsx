import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No validation - just show a success message and navigate
    alert("Se ha enviado un enlace de recuperación a tu correo electrónico");
    navigate("/login");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-artra-navy hover:text-artra-blue transition-colors mb-8"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-2xl">Volver al inicio de sesión</span>
        </Link>

        {/* Forgot Password Form */}
        <div className="max-w-[480px] mx-auto">
          <h1 className="text-3xl font-bold text-artra-dark-navy text-center mb-4">
            Recuperar contraseña
          </h1>
          <p className="text-center text-artra-blue mb-8">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-artra-dark-navy font-medium mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                className="w-full h-14 px-4 rounded-lg border border-artra-lighter-blue/30 bg-artra-light-bg text-artra-blue placeholder:text-artra-blue/60 focus:outline-none focus:ring-2 focus:ring-artra-blue"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 bg-artra-navy hover:bg-artra-blue transition-colors rounded-lg text-white font-bold"
            >
              Enviar enlace de recuperación
            </button>

            {/* Back to Login Link */}
            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-artra-blue hover:text-artra-navy transition-colors"
              >
                Volver al inicio de sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
