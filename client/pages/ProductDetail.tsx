import Layout from "@/components/Layout";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

  const thumbnails = [
    "https://api.builder.io/api/v1/image/assets/TEMP/b668d415af8ff8dd6ed258861ae45eb7cee8bc9e?width=280",
    "https://api.builder.io/api/v1/image/assets/TEMP/b668d415af8ff8dd6ed258861ae45eb7cee8bc9e?width=280",
    "https://api.builder.io/api/v1/image/assets/TEMP/b668d415af8ff8dd6ed258861ae45eb7cee8bc9e?width=280",
    "https://api.builder.io/api/v1/image/assets/TEMP/b668d415af8ff8dd6ed258861ae45eb7cee8bc9e?width=280"
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/tienda" className="inline-flex items-center gap-2 text-black hover:text-artra-navy mb-6">
          <ArrowLeft className="w-6 h-6" />
          <span className="text-base">Atrás</span>
        </Link>

        {/* Product Container */}
        <div className="bg-artra-light-blue rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Images */}
            <div>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/fe525e5a2981d3c9c1b9c5b0a1e1bb38aa173db8?width=1300"
                alt="Arból Artesanal"
                className="w-full h-[464px] object-cover rounded-xl mb-4"
              />
              <div className="grid grid-cols-4 gap-4">
                {thumbnails.map((thumb, idx) => (
                  <img 
                    key={idx}
                    src={thumb}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-[100px] object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div>
              <h1 className="text-artra-navy text-[32px] font-black mb-6">Arból Artesanal</h1>
              
              <div className="mb-6">
                <h2 className="text-artra-navy text-xl font-semibold mb-3">Descripción de la pieza:</h2>
                <p className="text-black text-base leading-8 text-justify">
                  Este conjunto es una exquisita representación de la talavera poblana, una técnica cerámica con denominación de origen que combina influencias indígenas, moriscas y españolas. Cada pieza está meticulosamente decorada a mano con patrones florales vibrantes y geométricos, utilizando los característicos colores azul cobalto, amarillo, naranja, verde, negro y blanco, que son sellos distintivos de esta tradición. La composición presenta una armonía entre utilidad y arte, ideal para embellecer cualquier espacio o para el uso diario en la mesa. Las banderillas de papel picado al fondo y el cráneo de azúcar complementan la escena, evocando la alegría y la rica cultura mexicana.
                </p>
              </div>

              <div className="mb-6">
                <p className="text-artra-navy text-[28px] font-semibold mb-4">$45</p>
                
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-artra-navy text-base font-semibold">Cantidad:</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-full bg-artra-blue flex items-center justify-center text-white hover:bg-artra-dark-navy transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="w-11 h-6 border border-artra-navy rounded bg-white flex items-center justify-center">
                      <span className="text-black text-base">{quantity}</span>
                    </div>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 rounded-full bg-artra-blue flex items-center justify-center text-white hover:bg-artra-dark-navy transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button className="w-full max-w-[459px] h-[54px] bg-artra-dark-navy hover:bg-artra-navy transition-colors rounded-2xl flex items-center justify-center gap-3">
                  <ShoppingCart className="w-10 h-10 text-white" />
                  <span className="text-white text-2xl font-semibold">Añadir al carrito</span>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            {/* Características */}
            <div>
              <h3 className="text-artra-navy text-xl font-semibold mb-4">Características del producto</h3>
              <div className="text-black text-base leading-8 text-justify space-y-2">
                <p><strong>Técnica:</strong> Cerámica de alta temperatura, esmaltada y decorada a mano, siguiendo la tradición de la Talavera de Puebla.</p>
                <p><strong>Colores:</strong> Predominan los azules intensos, amarillos vibrantes, naranjas cálidos, verdes profundos y toques de blanco y negro, todos obtenidos de pigmentos naturales.</p>
                <p><strong>Diseño:</strong> Motivos florales y orgánicos intrincados, con simetrías y detalles finos que reflejan la maestría del artesano. También se aprecian elementos geométricos que enmarcan y realzan los diseños florales.</p>
                <p><strong>Piezas:</strong> El conjunto incluye platos de diversos tamaños, jarras o cántaros, tazones y pequeños posavasos, todos coordinados en diseño.</p>
                <p><strong>Acabado:</strong> Superficie lisa y brillante, resultado de un esmaltado de alta calidad que protege la pieza y le otorga durabilidad.</p>
              </div>
            </div>

            {/* QR Code */}
            <div>
              <h3 className="text-artra-navy text-xl font-semibold mb-4">¿Cómo se elaboró?</h3>
              <p className="text-black text-base leading-8 text-justify mb-6">
                Escanea este código QR y descubre más sobre el proceso de elaboración de esta pieza y también del artesano que la creó.
              </p>
              <div className="w-[250px] h-[250px] bg-white rounded-2xl p-4">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/a61599f7b05aab2230d0a03c4ec63e63f29e7189?width=500"
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
