// client/components/Header.tsx
import { useState } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingCart } from "lucide-react";
import UserMenu from "./UserMenu";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import {
  NAV_LINK,
  ICON_BUTTON,
  BADGE_COUNT,
  ICON_NAVY_24,
  INLINE_ROW_TIGHT,
  SMALL_WHITE_LABEL,
} from "@/components/styles/headerClasses";

export default function Header() {
	  const { items: cartItems } = useCart();
	  const { defaultList } = useWishlist();
	  const wishlistCount = defaultList?.items.length || 0;
	  const [searchQuery, setSearchQuery] = useState(''); // Añadir estado para la búsqueda
	
	  // Función de búsqueda simulada (solo para evitar errores, la funcionalidad real
	  // se implementaría con React Router o un contexto de búsqueda)
	  const handleSearch = (e: React.FormEvent) => {
	    e.preventDefault();
	    console.log('Búsqueda enviada:', searchQuery);
	    // Aquí se podría redirigir a la página de tienda con el query param
	    // navigate(`/tienda?search=${searchQuery}`);
	  };
	
	  return (
    // Añadido sticky, top-0, z-50. Reducido py-4
    <header className="Header">
      <div className="Logo">
        {/* Logo y Nombre */}
        <div className="Logo_div"> {/* Reducido gap */}
          <Link to="/" className="flex items-center gap-3"> {/* Link en logo/nombre */}
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/8a47ff86a23b1cb6963be447bad0fd0037bd0307?width=184"
              alt="ARTRA Logo"
              // Reducido tamaño del logo ligeramente
              className="Logo_imagen"
            />
            <div className="Artra_Texto">
              <h1 className="text-white text-[26px] font-bold leading-tight -mb-1"> {/* Reducido tamaño y ajustado leading */}
                ARTRA
              </h1>
              <div className={INLINE_ROW_TIGHT}> {/* Reducido gap y mt */}
                <span className={SMALL_WHITE_LABEL}>Arte</span> {/* Reducido tamaño */}
                <span className="text-white inline-flex items-center text-[24px] font-semibold leading-none transform -translate-y-1.5"> {/* Ajustado */}
                  .
                </span>
                <span className={SMALL_WHITE_LABEL}> {/* Reducido tamaño */}
                  Tradición
                </span>
              </div>
              <div className={INLINE_ROW_TIGHT}> {/* Reducido gap y mt */}
                <span className="text-cyan-400 text-[8px] font-semibold"> {/* Reducido tamaño */}
                  Hecho en México
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Navegación (movida cerca del logo o integrada) */}
        <nav className="hidden md:flex items-center gap-4 ml-8"> {/* Añadido margen */}
          <Link
            to="/"
            className={NAV_LINK} // Reducido tamaño
          >
            Inicio
          </Link>
          <Link
            to="/tienda"
            className={NAV_LINK} // Reducido tamaño
          >
            Tienda
          </Link>
          <Link
            to="/quien-es-artra"
            className={NAV_LINK} // Reducido tamaño
          >
            ¿Quién es ARTRA?
          </Link>
        </nav>

	        {/* Search Bar e Iconos (agrupados a la derecha) */}
		        <div className="flex items-center gap-2 md:gap-4 flex-1 justify-center ml-8"> {/* Flex-1 y justify-center. Añadido ml-8 para separar de la navegación. */}
	          {/* Search Bar */}
	          <form onSubmit={handleSearch} className="hidden sm:flex flex-1">
	            <div className="relative w-full"> {/* Añadido w-full */}
	              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
	              <input
	                type="text"
	                placeholder="Buscar productos..."
	                value={searchQuery}
	                onChange={(e) => setSearchQuery(e.target.value)}
	                // Reducida altura y padding
	                className="w-full h-[40px] pl-10 pr-4 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-artra-blue text-sm"
	              />
	            </div>
	          </form>
	
	          {/* Icons */}
          <div className="flex items-center gap-1 md:gap-2"> {/* Reducido gap */}
            {/* Reducido tamaño de botones/iconos */}
	            <Link to="/favoritos" className={ICON_BUTTON}>
	              <Heart className={ICON_NAVY_24} />
	              {wishlistCount > 0 && (
	                <span className={BADGE_COUNT}>
	                  {wishlistCount}
	                </span>
	              )}
	            </Link>
            <Link to="/carrito" className={ICON_BUTTON}>
              <ShoppingCart className={ICON_NAVY_24} />
              {cartItems.length > 0 && (
                <span className={BADGE_COUNT}>
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
