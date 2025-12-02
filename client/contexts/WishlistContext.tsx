import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { wishlistAPI } from "../services/api";
import { useAuth } from "./AuthContext";
import { Product } from "../types";

interface WishlistList {
  id: number;
  name: string;
  default: boolean;
  items: Product[]; // Los productos completos se cargarán en el contexto
}



interface WishlistContextType {
  lists: WishlistList[];
  defaultList: WishlistList | undefined;
  isLoading: boolean;
  loadWishlists: () => Promise<void>;
  addToWishlist: (productId: number, listId?: number) => Promise<void>;
  removeFromWishlist: (productId: number, listId?: number) => Promise<void>;
  isInWishlist: (productId: number, listId?: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const authContext = useAuth();
  const user = authContext.user;
  const [lists, setLists] = useState<WishlistList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadWishlists = async () => {
    // Solo cargar si el contexto de autenticación está disponible y el usuario está definido
    if (!authContext || !user) {
      setLists([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      let userLists = await wishlistAPI.getLists();

      // CRÍTICO: Crear lista predeterminada si no existe
      if (userLists.length === 0) {
        const defaultList = await wishlistAPI.createList('Favoritos');
        userLists = [defaultList];
      }

      // Cargar los detalles de los productos para cada lista
      const listsWithItems = await Promise.all(userLists.map(async (list: any) => {
        const items = await wishlistAPI.getListItems(list.id);
        return { ...list, items };
      }));

      setLists(listsWithItems);
    } catch (error) {
      console.error("Error loading wishlists:", error);
      setLists([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Solo cargar si el contexto de autenticación está disponible
    if (authContext) {
      loadWishlists();
    }
  }, [authContext, user]); // Recargar cuando el contexto o el usuario cambie (login/logout)

	  const defaultList = lists.find(list => list.default || list.name === 'Favoritos');
	
	  const addToWishlist = async (productId: number, listId?: number) => {
	    // Si la lista por defecto no está cargada, intentamos forzar la carga
	    if (!defaultList && !isLoading) {
	      await loadWishlists();
	    }
	
	    const targetListId = listId || defaultList?.id;
	    if (!targetListId) {
	      console.error("No se pudo encontrar la lista de deseos por defecto.");
	      return;
	    }
	
	    try {
	      await wishlistAPI.addItem(targetListId, productId);
	      await loadWishlists(); // Recargar para actualizar el estado
	    } catch (error) {
	      console.error("Error adding item to wishlist:", error);
	    }
	  };

  const removeFromWishlist = async (productId: number, listId?: number) => {
    const targetListId = listId || defaultList?.id;
    if (!targetListId) return;

    try {
      await wishlistAPI.removeItem(targetListId, productId);
      await loadWishlists(); // Recargar para actualizar el estado
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  const isInWishlist = (productId: number, listId?: number) => {
    const targetList = listId ? lists.find(l => l.id === listId) : defaultList;
    if (!targetList) return false;

    return targetList.items.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{ lists, defaultList, isLoading, loadWishlists, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}

// Nota: Necesitamos el tipo Product. Asumo que está en ../types.
// Si no existe, el siguiente paso será crearlo.
// Para evitar errores de compilación, voy a crear un archivo de tipos básico.
