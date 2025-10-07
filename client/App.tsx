import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tienda from "./pages/Tienda";
import ProductDetail from "./pages/ProductDetail";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route
            path="/terminos"
            element={
              <Placeholder
                title="Términos y Condiciones de Uso - ARTRA"
                message="Consulta nuestros términos y condiciones para conocer más sobre cómo funciona ARTRA."
              />
            }
          />
          <Route
            path="/privacidad"
            element={
              <Placeholder
                title="Políticas de Privacidad"
                message="Tu privacidad es importante para nosotros. Conoce cómo protegemos tu información."
              />
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
