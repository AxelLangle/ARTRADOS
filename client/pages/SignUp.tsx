import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // No validation - just navigate
    navigate("/");
  };

  const handleGoogleSignUp = () => {
    navigate("/login/google");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-artra-navy hover:text-artra-blue transition-colors mb-8"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-2xl">Volver</span>
        </Link>

        {/* Sign Up Form */}
        <div className="max-w-[480px] mx-auto">
          <h1 className="text-3xl font-bold text-artra-dark-navy text-center mb-8">
            Crea tu cuenta
          </h1>

          <form onSubmit={handleSignUp} className="space-y-6">
            {/* Full Name Input */}
            <div>
              <label className="block text-artra-dark-navy font-medium mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                placeholder="Ingresa tu nombre completo"
                className="w-full h-14 px-4 rounded-lg border border-artra-lighter-blue/30 bg-artra-light-bg text-artra-blue placeholder:text-artra-blue/60 focus:outline-none focus:ring-2 focus:ring-artra-blue"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-artra-dark-navy font-medium mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                className="w-full h-14 px-4 rounded-lg border border-artra-lighter-blue/30 bg-artra-light-bg text-artra-blue placeholder:text-artra-blue/60 focus:outline-none focus:ring-2 focus:ring-artra-blue"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-artra-dark-navy font-medium mb-2">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                className="w-full h-14 px-4 rounded-lg border border-artra-lighter-blue/30 bg-artra-light-bg text-artra-blue placeholder:text-artra-blue/60 focus:outline-none focus:ring-2 focus:ring-artra-blue"
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-artra-dark-navy font-medium mb-2">
                Confirmar contraseña
              </label>
              <input
                type="password"
                placeholder="Confirma tu contraseña"
                className="w-full h-14 px-4 rounded-lg border border-artra-lighter-blue/30 bg-artra-light-bg text-artra-blue placeholder:text-artra-blue/60 focus:outline-none focus:ring-2 focus:ring-artra-blue"
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full h-10 bg-artra-navy hover:bg-artra-blue transition-colors rounded-lg text-white font-bold"
            >
              Crear cuenta
            </button>

            {/* Divider */}
            <div className="text-center">
              <span className="text-sm text-artra-blue">O</span>
            </div>

            {/* Google Sign Up Button */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full h-12 bg-artra-light-bg hover:bg-gray-200 transition-colors rounded-lg flex items-center justify-center gap-2"
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/92aa6cbe1bef5e2860dcf77f434bd82c0801b434?width=48"
                alt="Google"
                className="w-6 h-6"
              />
              <span className="text-artra-dark-navy font-bold">
                Continuar con Google
              </span>
            </button>

            {/* Login Link */}
            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-artra-blue hover:text-artra-navy transition-colors"
              >
                ¿Ya tienes una cuenta? Inicia sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
