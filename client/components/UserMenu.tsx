import { useState, useRef, useEffect } from "react";
import { User, Settings, ShoppingBag, HelpCircle, LogOut, LogIn } from "lucide-react";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change this based on auth state
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[50px] h-[50px] flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 transition-colors"
      >
        <User className="w-7 h-7 text-artra-navy" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[60px] z-50">
          {/* Arrow */}
          <div className="absolute -top-3 right-4 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-artra-blue"></div>
          
          <div className="w-[268px] bg-white border-2 border-artra-blue rounded-2xl shadow-lg overflow-hidden">
            {isLoggedIn ? (
              // Logged In Menu
              <div>
                <button className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/20">
                    <User className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Ver cuenta
                  </span>
                </button>

                <button className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/20">
                    <Settings className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Configuraciones
                  </span>
                </button>

                <button className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/20">
                    <ShoppingBag className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Mis compras
                  </span>
                </button>

                <button className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/20">
                    <HelpCircle className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Ayuda
                  </span>
                </button>

                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/35">
                    <LogOut className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Cerrar sesión
                  </span>
                </button>
              </div>
            ) : (
              // Logged Out Menu
              <div>
                <button className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/20">
                    <HelpCircle className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Ayuda
                  </span>
                </button>

                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/35">
                    <LogIn className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Iniciar sesión
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
