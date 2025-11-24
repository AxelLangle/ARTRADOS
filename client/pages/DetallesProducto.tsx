import Layout from "@/components/Layout";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { productsAPI } from "../services/api";
import { Product } from "../types";
import { QRCodeCanvas as QRCode } from "qrcode.react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        const productId = parseInt(id);
        const data = await productsAPI.getById(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">Cargando producto...</div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">Producto no encontrado.</div>
      </Layout>
    );
  }

  // Simular thumbnails con la imagen principal (ya que la API simulada solo tiene una)
  const thumbnails = [product.image, product.image, product.image, product.image];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/tienda"
          className="inline-flex items-center gap-2 text-black hover:text-artra-navy mb-6"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-base">Atrás</span>
        </Link>

        {/* Product Container */}
        <div className="bg-artra-light-blue rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Images */}
	            <div>
	              <img
	                src={product.image}
	                alt={product.name}
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
	              <h1 className="text-artra-navy text-[32px] font-black mb-6">
	                {product.name}
	              </h1>
	
	              <div className="mb-6">
	                <h2 className="text-artra-navy text-xl font-semibold mb-3">
	                  Descripción de la pieza:
	                </h2>
	                <p className="text-black text-base leading-8 text-justify">
	                  {product.description}
	                </p>
	              </div>
	
	              <div className="mb-6">
	                <p className="text-artra-navy text-[28px] font-semibold mb-4">
	                  ${product.price.toFixed(2)}
	                </p>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-artra-navy text-base font-semibold">
                    Cantidad:
                  </span>
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
                  <span className="text-white text-2xl font-semibold">
                    Añadir al carrito
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            {/* Características */}
	            <div>
	              <h3 className="text-artra-navy text-xl font-semibold mb-4">
	                Características del producto
	              </h3>
	              <div className="text-black text-base leading-8 text-justify space-y-2">
	                <p>
	                  <strong>Stock disponible:</strong> {product.stock} unidades
	                </p>
	                <p>
	                  <strong>Categoría:</strong> {product.category_id} (ID de categoría)
	                </p>
	                <p>
	                  <strong>Video URL:</strong> {product.video_url ? 'Sí' : 'No'}
	                </p>
	                <p>
	                  <strong>Destacado:</strong> {product.featured ? 'Sí' : 'No'}
	                </p>
	                {/* Se podría agregar más información si estuviera disponible en el mock */}
	              </div>
	            </div>

            {/* QR Code */}
            <div>
              <h3 className="text-artra-navy text-xl font-semibold mb-4">
                ¿Cómo se elaboró?
              </h3>
              <p className="text-black text-base leading-8 text-justify mb-6">
                Escanea este código QR y descubre más sobre el proceso de
                elaboración de esta pieza y también del artesano que la creó.
              </p>
	              <div className="w-[250px] h-[250px] bg-white rounded-2xl p-4 flex items-center justify-center">
	                {product.video_url ? (
	                  <QRCode 
	                    value={product.video_url} 
	                    size={200} 
	                    level="H" 
	                    includeMargin={true}
	                  />
	                ) : (
	                  <p className="text-gray-500 text-center">No hay video asociado para generar QR.</p>
	                )}
	              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
