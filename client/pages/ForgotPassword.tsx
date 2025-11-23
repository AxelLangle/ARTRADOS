import { ArrowLeft, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/Layout";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mostrar modal de éxito en lugar de alerta
    setShowSuccessModal(true);
    // Redirigir después de 2 segundos
    setTimeout(() => {
      navigate("/iniciar-sesion");
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/iniciar-sesion"
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
                to="/iniciar-sesion"
                className="text-sm text-artra-blue hover:text-artra-navy transition-colors"
              >
                Volver al inicio de sesión
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-artra-navy">¡Éxito!</h2>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-artra-blue mb-6">
              Se ha enviado un enlace de recuperación a tu correo electrónico. Por favor, revisa tu bandeja de entrada.
            </p>
            <button
              onClick={() => navigate("/iniciar-sesion")}
              className="w-full bg-artra-navy hover:bg-artra-blue text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Volver al inicio de sesión
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
