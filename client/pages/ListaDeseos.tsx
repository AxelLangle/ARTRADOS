import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Plus, X, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";
import { wishlistAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface WishlistList {
  id: number;
  name: string;
  is_default: boolean;
  item_count: number;
}

interface WishlistItem {
  id: number; // ID del producto
  name: string;
  price: number;
  image: string; // Corregido a 'image'
}

export default function ListaDeseos() {
  const { addToCart } = useCart();
  const { isLogged } = useAuth();
  const [lists, setLists] = useState<WishlistList[]>([]);
  const [currentList, setCurrentList] = useState<WishlistList | null>(null);
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [showNewListModal, setShowNewListModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLogged) {
      loadLists();
    }
  }, [isLogged]);

  useEffect(() => {
    if (currentList) {
      loadListItems(currentList.id);
    }
  }, [currentList]);

  const loadLists = async () => {
    try {
      const data = await wishlistAPI.getLists();
      setLists(data);
      if (data.length > 0) {
        setCurrentList(data[0]);
      }
    } catch (error) {
      console.error('Error al cargar listas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadListItems = async (listId: number) => {
    try {
      const data = await wishlistAPI.getListItems(listId);
      // La API simulada devuelve objetos Product, no WishlistItem.
      // Ajustamos el tipo de items para reflejar esto.
      setItems(data as any); // Usamos 'any' temporalmente, la API simulada devuelve Product

    } catch (error) {
      console.error('Error al cargar items:', error);
    }
  };

  const handleCreateList = async () => {
    if (!newListName.trim()) return;
    
    try {
      await wishlistAPI.createList(newListName);
      await loadLists();
      setNewListName('');
      setShowNewListModal(false);
    } catch (error) {
      console.error('Error al crear lista:', error);
      alert('Error al crear lista');
    }
  };

  const handleDeleteList = async (listId: number) => {
    if (!confirm('¿Estás seguro de eliminar esta lista?')) return;
    
    try {
      await wishlistAPI.deleteList(listId);
      await loadLists();
    } catch (error: any) {
      alert(error.message || 'Error al eliminar lista');
    }
  };

  const handleRemoveItem = async (productId: number) => {
    if (!currentList) return;
    
    try {
      await wishlistAPI.removeItem(currentList.id, productId);
      await loadListItems(currentList.id);
    } catch (error) {
      console.error('Error al eliminar item:', error);
    }
  };

  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id, // Usar el ID del producto directamente
      name: item.name,
      price: item.price,
      image: item.image, // Corregido a 'image'
      quantity: 1
    });
  };

  if (!isLogged) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <Heart className="w-16 h-16 text-navy/30 mx-auto mb-4" />
          <h2 className="heading-2 mb-4">Inicia sesión para ver tus favoritos</h2>
          <Link to="/login" className="btn-primary inline-block">
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
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-navy border-t-transparent"></div>
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
          className="inline-flex items-center gap-2 text-navy hover:text-blue transition-colors mb-8"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-2xl">Volver</span>
        </Link>

        {/* Title */}
        <h1 className="heading-1 mb-8">Mis favoritos</h1>

        {/* Tabs */}
        <div className="mb-8 border-b border-navy/20">
          <div className="flex gap-6 relative overflow-x-auto">
            {lists.map(list => (
              <div key={list.id} className="flex items-center gap-2 group">
                <button
                  onClick={() => setCurrentList(list)}
                  className={`pb-2 text-xl font-semibold relative whitespace-nowrap ${
                    currentList?.id === list.id
                      ? 'text-navy'
                      : 'text-navy/50 hover:text-navy'
                  }`}
                >
                  {list.name} ({list.item_count})
                  {currentList?.id === list.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-navy rounded-t"></div>
                  )}
                </button>
                {!list.is_default && (
                  <button
                    onClick={() => handleDeleteList(list.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setShowNewListModal(true)}
              className="pb-2 ml-2 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
            >
              <Plus className="w-7 h-7 text-navy" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {items.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-navy/30 mx-auto mb-4" />
            <p className="text-xl text-navy/60">No tienes productos en esta lista</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                <div className="relative">
                  <img
                    src={item.image || 'https://via.placeholder.com/300'}
                    alt={item.name}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-navy mb-2">{item.name}</h3>
                  {/* <p className="text-sm text-gray-600 mb-2">{item.category_name}</p> */ /* Eliminado ya que no está disponible en WishlistItem */}
                  <p className="text-xl font-bold text-navy mb-4">${item.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="btn-primary w-full"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Nueva Lista */}
        {showNewListModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="heading-3 mb-4">Nueva Lista</h2>
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Nombre de la lista"
                className="input-field w-full mb-4"
                autoFocus
              />
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowNewListModal(false);
                    setNewListName('');
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateList}
                  className="btn-primary flex-1"
                >
                  Crear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
