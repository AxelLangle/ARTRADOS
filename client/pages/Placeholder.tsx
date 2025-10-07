import Layout from "@/components/Layout";

interface PlaceholderProps {
  title: string;
  message?: string;
}

export default function Placeholder({ title, message }: PlaceholderProps) {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-artra-navy text-4xl font-bold mb-6">{title}</h1>
          <p className="text-gray-600 text-lg mb-8">
            {message ||
              "Esta página está en construcción. Por favor, continúa explorando nuestra tienda."}
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/"
              className="px-8 py-3 bg-artra-blue hover:bg-artra-dark-navy transition-colors rounded-2xl text-white font-semibold"
            >
              Ir al Inicio
            </a>
            <a
              href="/tienda"
              className="px-8 py-3 border-2 border-artra-blue text-artra-navy hover:bg-artra-light-blue transition-colors rounded-2xl font-semibold"
            >
              Ver Tienda
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
