// client/components/Header.tsx
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingCart } from "lucide-react";
import UserMenu from "./UserMenu";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

export default function Header() {
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    // Añadido sticky, top-0, z-50. Reducido py-4
    <header className="w-full bg-artra-navy sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo y Nombre */}
        <div className="flex items-center gap-4"> {/* Reducido gap */}
          <Link to="/" className="flex items-center gap-3"> {/* Link en logo/nombre */}
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/8a47ff86a23b1cb6963be447bad0fd0037bd0307?width=184"
              alt="ARTRA Logo"
              // Reducido tamaño del logo ligeramente
              className="w-[70px] h-[64px]"
            />
            <div className="flex flex-col">
              <h1 className="text-white text-[26px] font-bold leading-tight -mb-1"> {/* Reducido tamaño y ajustado leading */}
                ARTRA
              </h1>
              <div className="flex items-center gap-1 mt-0"> {/* Reducido gap y mt */}
                <span className="text-white text-[12px] font-semibold">Arte</span> {/* Reducido tamaño */}
                <span className="text-white inline-flex items-center text-[24px] font-semibold leading-none transform -translate-y-1.5"> {/* Ajustado */}
                  .
                </span>
                <span className="text-white text-[12px] font-semibold"> {/* Reducido tamaño */}
                  Tradición
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0"> {/* Reducido gap y mt */}
                <span className="text-cyan-400 text-[8px] font-semibold"> {/* Reducido tamaño */}
                  Hecho en México
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Navegación (movida cerca del logo o integrada) */}
        <nav className="flex items-center gap-4 ml-8"> {/* Añadido margen */}
          <Link
            to="/"
            className="text-white text-base font-semibold hover:text-artra-lighter-blue transition-colors" // Reducido tamaño
          >
            Inicio
          </Link>
          <Link
            to="/tienda"
            className="text-white text-base font-semibold hover:text-artra-lighter-blue transition-colors" // Reducido tamaño
          >
            Tienda
          </Link>
          <Link
            to="/quien-es-artra"
            className="text-white text-base font-semibold hover:text-artra-lighter-blue transition-colors" // Reducido tamaño
          >
            ¿Quién es ARTRA?
          </Link>
        </nav>

        {/* Search Bar e Iconos (agrupados a la derecha) */}
        <div className="flex items-center gap-4 flex-1 justify-center"> {/* Flex-1 y justify-center */}
          {/* Search Bar */}
          <div className="flex-1 max-w-[700px]"> {/* Reducido max-w */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" /> {/* Ajustado icono */}
              <input
                type="text"
                placeholder="Buscar productos..."
                // Reducida altura y padding
                className="w-full h-[40px] pl-10 pr-4 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-artra-blue text-sm"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2"> {/* Reducido gap */}
            {/* Reducido tamaño de botones/iconos */}
            <Link to="/favoritos" className="p-2 flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 transition-colors relative">
              <Heart className="w-6 h-6 text-artra-navy" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link to="/carrito" className="p-2 flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 transition-colors relative">
              <ShoppingCart className="w-6 h-6 text-artra-navy" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <UserMenu /> {/* El tamaño del botón UserMenu se define dentro del componente */}
          </div>
           {/* "Hecho en México" - opcional, quizás mejor en footer */}
           {/* <div className="text-artra-lighter-blue text-xs font-semibold ml-4 hidden md:block">
             Hecho en México
           </div> */}
        </div>
      </div>
    </header>
  );
}
