import { ArrowLeft, Heart, Share2, ShoppingCart, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";

export default function ListaDeseos() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart(item);
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

        {/* Title */}
        <h1 className="text-4xl font-bold text-artra-navy mb-8">Mis favoritos</h1>

        {/* Tabs */}
        <div className="mb-8 border-b border-artra-navy/20">
          <div className="flex gap-6 relative">
            <button className="pb-2 text-xl font-semibold text-artra-navy relative">
              Lista principal
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-artra-navy rounded-t"></div>
            </button>
            <button className="pb-2 text-xl font-medium text-artra-navy/50 hover:text-artra-navy transition-colors">
              Lista 2
            </button>
            <button className="pb-2 text-xl font-medium text-artra-navy/50 hover:text-artra-navy transition-colors">
              Lista 3
            </button>
            <button className="pb-2 text-xl font-medium text-artra-navy/50 hover:text-artra-navy transition-colors">
              Lista 4
            </button>
            <button className="pb-2 ml-2 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
              <Plus className="w-7 h-7 text-artra-navy" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {items.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-artra-navy/30 mx-auto mb-4" />
            <p className="text-xl text-artra-navy/60">No tienes productos en tu lista de favoritos</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="w-full max-w-[260px] bg-artra-light-blue rounded-lg overflow-hidden mx-auto"
              >
                {/* Product Image */}
                <div className="relative h-[220px] p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />

                  {/* Action Buttons */}
                  <div className="absolute bottom-6 right-6 flex items-center gap-1">
                    <button className="w-8 h-8 rounded-full bg-artra-navy flex items-center justify-center hover:bg-artra-blue transition-colors">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect width="20" height="20" fill="transparent" />
                      </svg>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-artra-navy flex items-center justify-center hover:bg-artra-blue transition-colors">
                      <Heart className="w-4 h-4 text-gray-300 fill-gray-300" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-artra-navy flex items-center justify-center hover:bg-artra-blue transition-colors">
                      <Share2 className="w-4 h-4 text-gray-300" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-6 right-6 flex flex-col items-center gap-1 group"
                  >
                    <div className="w-9 h-9 rounded-full bg-artra-navy flex items-center justify-center hover:bg-red-600 transition-colors">
                      <Trash2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs text-artra-navy font-medium">Eliminar</span>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <Link to={`/producto/${item.id}`}>
                    <h3 className="text-artra-navy text-base font-bold mb-2">{item.name}</h3>
                  </Link>
                  <p className="text-artra-navy text-base mb-4">${item.price}</p>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full h-10 bg-artra-blue hover:bg-artra-dark-navy transition-colors rounded-2xl flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5 text-white" />
                    <span className="text-white text-base font-semibold">
                      Añadir al carrito
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
