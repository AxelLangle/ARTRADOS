import { Link } from "react-router-dom";
import { Search, Heart, ShoppingCart, User } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full">
      {/* Top Header */}
      <div className="bg-artra-navy border border-black shadow-lg">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/8a47ff86a23b1cb6963be447bad0fd0037bd0307?width=184" 
              alt="ARTRA Logo" 
              className="w-[92px] h-[83px]"
            />
            <div className="flex flex-col">
              <h1 className="text-white text-[40px] font-bold leading-6">ARTRA</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-white text-lg font-semibold">Arte</span>
                <span className="text-white text-[50px] font-semibold leading-6">.</span>
                <span className="text-white text-lg font-semibold">Tradición</span>
              </div>
            </div>
          </div>
          <div className="text-artra-lighter-blue text-base font-semibold">
            Hecho en México
          </div>
        </div>
      </div>

      {/* Bottom Header */}
      <div className="bg-artra-navy border border-black">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Navigation */}
            <nav className="flex items-center gap-4">
              <Link to="/" className="text-white text-xl font-semibold hover:text-artra-lighter-blue transition-colors">
                Inicio
              </Link>
              <Link to="/tienda" className="text-white text-xl font-semibold hover:text-artra-lighter-blue transition-colors">
                Tienda
              </Link>
              <Link to="#" className="text-white text-xl font-semibold hover:text-artra-lighter-blue transition-colors">
                ¿Cómo trabajamos?
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="flex-1 max-w-[694px] mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-800" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full h-[45px] pl-14 pr-4 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-artra-blue"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="w-[50px] h-[50px] flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 transition-colors">
                <Heart className="w-7 h-7 text-artra-navy" />
              </button>
              <button className="w-[50px] h-[50px] flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 transition-colors">
                <ShoppingCart className="w-7 h-7 text-artra-navy" />
              </button>
              <button className="w-[50px] h-[50px] flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 transition-colors">
                <User className="w-7 h-7 text-artra-navy" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
