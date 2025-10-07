import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";

export default function Index() {
  const featuredProducts = [
    {
      id: "1",
      name: "Producto artesanal",
      price: 45,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/f3748033348ff6036cbef09a04d9c6a06d643dd9?width=466"
    },
    {
      id: "2",
      name: "Producto artesanal",
      price: 45,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/d82fcbac2c633e7e48bf44bc3f02e4ae6e08f9f1?width=466"
    },
    {
      id: "3",
      name: "Producto artesanal",
      price: 45,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/d57e70596c6c096c421ff3969286017b98fad44f?width=466"
    }
  ];

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative w-full h-[508px]">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/054ea1a2ab6682e20e427ffd40b75f67afc173e3?width=2200"
          alt="Hero Banner"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-[40px] font-black text-center mb-2 leading-tight">
            Descrube la belleza de lo hecho a mano
          </h1>
          <p className="text-white text-xl font-medium text-center max-w-[800px] mb-8">
            ARTRA es un mercado en linea que conecta a artesanos talentosos con personas que buscan productos únicos y de alta calidad
          </p>
          <button className="px-8 py-4 bg-artra-blue hover:bg-artra-dark-navy transition-colors rounded-2xl">
            <span className="text-white text-base font-semibold">Explorar Productos</span>
          </button>
        </div>
      </section>

      {/* Our History Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-artra-navy text-[28px] font-bold mb-6">Nuestra Historia</h2>
        <p className="text-black text-lg text-justify max-w-[1100px]">
          En ARTRA, creemos en el ooder de la creativad y la habilidad artesanal. Nuestra misión es apoyar a los artesanos de cualquier localidad y ofrecer a los clientes acceso a productos auténticos y hechos con pasión. Cada pieza cuenta una historia y estamos orgullosos de ser parte de ella
        </p>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-artra-navy text-[28px] font-bold mb-12">Productos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-[1100px] mx-auto">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
