import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import { AddressProvider } from "./contexts/AddressContext";
import Index from "./pages/Index";
import Tienda from "./pages/Tienda";
import ProductDetail from "./pages/ProductDetail";
import QuienEsArtra from "./pages/QuienEsArtra";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import GoogleLogin from "./pages/GoogleLogin";
import SelectPaymentMethod from "./pages/SelectPaymentMethod";
import AddCardForm from "./pages/AddCardForm";
import SelectAddress from "./pages/SelectAddress";
import OrderSummary from "./pages/OrderSummary";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";
import TerminosDeUso from "./pages/TerminosDeUso";
import CondicionesEnvio from "./pages/CondicionesEnvio";
import AvisoPrivacidad from "./pages/PoliticasPrivacidad";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <WishlistProvider>
          <PaymentProvider>
            <AddressProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tienda" element={<Tienda />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/quien-es-artra" element={<QuienEsArtra />} />
              <Route path="/favoritos" element={<Wishlist />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/checkout/payment" element={<SelectPaymentMethod />} />
              <Route path="/checkout/add-card" element={<AddCardForm />} />
              <Route path="/checkout/address" element={<SelectAddress />} />
              <Route path="/checkout/summary" element={<OrderSummary />} />
              <Route path="/login" element={<Login />} />
              <Route path="/crear-cuenta" element={<SignUp />} />
              <Route path="/recuperar-contraseña" element={<ForgotPassword />} />
              <Route path="/terminos" element={<TerminosDeUso />} />
              <Route path="/condicionesEnvio" element={<CondicionesEnvio />} />
              <Route path="/privacidad" element={<AvisoPrivacidad />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AddressProvider>
          </PaymentProvider>
        </WishlistProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
