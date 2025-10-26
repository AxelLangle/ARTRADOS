import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { Clock, Star, ChevronDown } from "lucide-react";
import { useState } from "react";

type FilterType = "material" | "region" | "tecnica" | "uso" | null;

export default function Tienda() {
  const [openFilter, setOpenFilter] = useState<FilterType>(null);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string[];
  }>({
    material: [],
    region: [],
    tecnica: [],
    uso: [],
  });

  const products = [
    {
      id: "1",
      name: "Producto artesanal",
      price: 45,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/f3748033348ff6036cbef09a04d9c6a06d643dd9?width=466",
    },
    {
      id: "2",
      name: "Producto artesanal",
      price: 45,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/d82fcbac2c633e7e48bf44bc3f02e4ae6e08f9f1?width=466",
    },
    {
      id: "3",
      name: "Producto artesanal",
      price: 45,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/d57e70596c6c096c421ff3969286017b98fad44f?width=466",
    },
    {
      id: "4",
      name: "Producto artesanal",
      price: 45,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/f3748033348ff6036cbef09a04d9c6a06d643dd9?width=466",
    },
    {
      id: "5",
      name: "Producto artesanal",
      price: 45,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/d82fcbac2c633e7e48bf44bc3f02e4ae6e08f9f1?width=466",
    },
    {
      id: "6",
      name: "Producto artesanal",
      price: 45,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/d57e70596c6c096c421ff3969286017b98fad44f?width=466",
    },
  ];

  const filterOptions = {
    material: [
      "Alfarería y Cerámica",
      "Textiles",
      "Madera",
      "Metales",
      "Fibras Vegetales",
      "Vidrio",
      "Piedra",
      "Papel",
      "Otros Materiales",
    ],
    region: [
      "Norte",
      "Centro",
      "Sur",
      "Occidente",
      "Oriente",
    ],
    tecnica: [
      "Tejido",
      "Tallado",
      "Moldeado",
      "Pintura",
      "Bordado",
    ],
    uso: [
      "Decoración",
      "Uso Diario",
      "Ceremonial",
      "Vestimenta",
      "Joyería",
    ],
  };

  const toggleFilter = (filter: FilterType) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const toggleOption = (filterType: string, option: string) => {
    setSelectedOptions((prev) => {
      const current = prev[filterType] || [];
      if (current.includes(option)) {
        return {
          ...prev,
          [filterType]: current.filter((item) => item !== option),
        };
      }
      return {
        ...prev,
        [filterType]: [...current, option],
      };
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-artra-navy text-[40px] font-bold mb-8">Tienda</h1>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-[321px] flex-shrink-0">
            <div className="border border-artra-navy bg-white rounded-lg p-6">
              <h2 className="text-artra-navy text-2xl font-bold mb-6">
                Filtrar por
              </h2>

              {/* Material Principal Filter */}
              <div className="mb-4">
                <button
                  className={`w-full h-10 rounded-lg px-3 flex items-center justify-between text-black text-base font-medium transition-colors ${
                    openFilter === "material"
                      ? "bg-artra-lighter-blue"
                      : "bg-white border border-artra-lighter-blue hover:bg-artra-lighter-blue/30"
                  }`}
                  onClick={() => toggleFilter("material")}
                >
                  Por Material Principal
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openFilter === "material" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFilter === "material" && (
                  <div className="mt-3 space-y-2 pl-7">
                    {filterOptions.material.map((material) => (
                      <button
                        key={material}
                        onClick={() => toggleOption("material", material)}
                        className={`block w-full text-left text-artra-navy text-sm font-medium py-1 px-2 rounded transition-colors ${
                          selectedOptions.material?.includes(material)
                            ? "bg-artra-blue text-white"
                            : "hover:bg-artra-blue/10"
                        }`}
                      >
                        {material}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Region Filter */}
              <div className="mb-4">
                <button
                  className={`w-full h-10 rounded-lg px-3 flex items-center justify-between text-black text-base font-medium transition-colors ${
                    openFilter === "region"
                      ? "bg-artra-lighter-blue"
                      : "bg-white border border-artra-lighter-blue hover:bg-artra-lighter-blue/30"
                  }`}
                  onClick={() => toggleFilter("region")}
                >
                  Por Región Geográfica
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openFilter === "region" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFilter === "region" && (
                  <div className="mt-3 space-y-2 pl-7">
                    {filterOptions.region.map((region) => (
                      <button
                        key={region}
                        onClick={() => toggleOption("region", region)}
                        className={`block w-full text-left text-artra-navy text-sm font-medium py-1 px-2 rounded transition-colors ${
                          selectedOptions.region?.includes(region)
                            ? "bg-artra-blue text-white"
                            : "hover:bg-artra-blue/10"
                        }`}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tecnica Filter */}
              <div className="mb-4">
                <button
                  className={`w-full h-10 rounded-lg px-3 flex items-center justify-between text-black text-base font-medium transition-colors ${
                    openFilter === "tecnica"
                      ? "bg-artra-lighter-blue"
                      : "bg-white border border-artra-lighter-blue hover:bg-artra-lighter-blue/30"
                  }`}
                  onClick={() => toggleFilter("tecnica")}
                >
                  Por Técnica de Elaboración
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openFilter === "tecnica" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFilter === "tecnica" && (
                  <div className="mt-3 space-y-2 pl-7">
                    {filterOptions.tecnica.map((tecnica) => (
                      <button
                        key={tecnica}
                        onClick={() => toggleOption("tecnica", tecnica)}
                        className={`block w-full text-left text-artra-navy text-sm font-medium py-1 px-2 rounded transition-colors ${
                          selectedOptions.tecnica?.includes(tecnica)
                            ? "bg-artra-blue text-white"
                            : "hover:bg-artra-blue/10"
                        }`}
                      >
                        {tecnica}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Uso Filter */}
              <div className="mb-6">
                <button
                  className={`w-full h-10 rounded-lg px-3 flex items-center justify-between text-black text-base font-medium transition-colors ${
                    openFilter === "uso"
                      ? "bg-artra-lighter-blue"
                      : "bg-white border border-artra-lighter-blue hover:bg-artra-lighter-blue/30"
                  }`}
                  onClick={() => toggleFilter("uso")}
                >
                  Por Uso o Función
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openFilter === "uso" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFilter === "uso" && (
                  <div className="mt-3 space-y-2 pl-7">
                    {filterOptions.uso.map((uso) => (
                      <button
                        key={uso}
                        onClick={() => toggleOption("uso", uso)}
                        className={`block w-full text-left text-artra-navy text-sm font-medium py-1 px-2 rounded transition-colors ${
                          selectedOptions.uso?.includes(uso)
                            ? "bg-artra-blue text-white"
                            : "hover:bg-artra-blue/10"
                        }`}
                      >
                        {uso}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Newsletter */}
              <div className="mt-12">
                <h3 className="text-artra-navy text-2xl font-bold mb-4">
                  Únete a nosotros
                </h3>
                <div className="mb-4">
                  <label className="text-black text-base font-light block mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full h-10 border border-artra-navy rounded-2xl px-3 text-sm"
                  />
                </div>
                <button className="w-full h-10 bg-artra-blue hover:bg-artra-dark-navy transition-colors rounded-2xl text-white text-base font-semibold">
                  Suscribirse
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Recently Viewed */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-9 h-9 text-artra-navy" />
                <h2 className="text-artra-navy text-[28px] font-bold">
                  Visto recientemente
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 3).map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </section>

            {/* Recommendations */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-9 h-9 text-artra-navy fill-artra-navy" />
                <h2 className="text-artra-navy text-[28px] font-bold">
                  Recomendaciones para ti
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 3).map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </section>

            {/* All Products */}
            <section>
              <h2 className="text-artra-navy text-[28px] font-bold mb-6">
                Todos los productos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
