import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from '../contexts/AuthContext';
import { Product } from "@/types";

export default function ListaDeseos() {
  const { addToCart } = useCart();
  const { isLogged } = useAuth();
  const { defaultList, isLoading, removeFromWishlist } = useWishlist();

  // Usamos el estado del contexto para renderizar
  const items = defaultList?.items || [];

  const handleRemoveItem = async (productId: number) => {
    if (!defaultList) return;
    
    try {
      // Usamos la función del contexto, que ya llama a loadWishlists()
      await removeFromWishlist(productId, defaultList.id);
    } catch (error) {
      console.error('Error al eliminar item:', error);
    }
  };

  const handleAddToCart = (item: Product) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  };

  if (!isLogged) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <Heart className="w-16 h-16 text-artra-navy/30 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-artra-navy mb-4">Inicia sesión para ver tus favoritos</h2>
          <Link to="/login" className="px-6 py-3 bg-artra-blue text-white rounded-lg hover:bg-artra-dark-navy transition-colors inline-block">
            Iniciar Sesión
          </Link>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-artra-navy border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

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

        {/* Products Grid */}
        {items.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-artra-navy/30 mx-auto mb-4" />
            <p className="text-xl text-artra-navy/60">No tienes productos en tu lista de favoritos</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden group border border-artra-lighter-blue">
                <div className="relative">
                  <Link to={`/producto/${item.id}`}>
                    <img
                      src={item.image || 'https://via.placeholder.com/300'}
                      alt={item.name}
                      className="w-full h-64 object-cover"
                    />
                  </Link>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <Link to={`/producto/${item.id}`}>
                    <h3 className="font-semibold text-artra-navy mb-2 hover:text-artra-blue transition-colors">{item.name}</h3>
                  </Link>
                  <p className="text-xl font-bold text-artra-navy mb-4">${item.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full py-2 bg-artra-blue text-white rounded-lg hover:bg-artra-dark-navy transition-colors font-semibold"
                  >
                    Agregar al carrito
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
