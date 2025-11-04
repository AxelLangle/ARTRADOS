import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

export default function GoogleLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate Google login process
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-[480px] mx-auto text-center">
          <div className="mb-8">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/92aa6cbe1bef5e2860dcf77f434bd82c0801b434?width=48"
              alt="Google"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-artra-dark-navy mb-4">
              Iniciando sesión con Google
            </h1>
            <p className="text-artra-blue">
              Estamos procesando tu inicio de sesión con Google. Por favor espera...
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-artra-navy"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
