import { useState, useEffect } from 'react';
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { ChevronDown, Search } from "lucide-react";
import { productsAPI, categoriesAPI } from '../services/api';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string; // Corregido a 'image'
  video_url?: string | null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function Tienda() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, searchQuery, priceRange]);

  const loadCategories = async () => {
    try {
      const data = await categoriesAPI.getAll();
      const allProducts = await productsAPI.getAll();
      
      // Contar productos por categoría
      const categoriesWithCount = data.map(cat => ({
        ...cat,
        product_count: allProducts.filter(p => p.category_id === cat.id).length
      }));
      
      setCategories(categoriesWithCount);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const filters: any = {};
      if (selectedCategory) filters.category = selectedCategory;
      if (searchQuery) filters.search = searchQuery;
      
      let data = await productsAPI.getAll(filters);
      // Filtrar por precio
      data = data.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
      setProducts(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug === selectedCategory ? '' : slug);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="heading-1 mb-4">Tienda</h1>
            

          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filtros */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="heading-4 mb-4">Filtros</h2>
                
                {/* Categorías */}
                <div className="mb-6">
                  <h3 className="font-semibold text-navy mb-3">Categorías</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === ''}
                        onChange={() => setSelectedCategory('')}
                        className="text-navy"
                      />
                      <span className="body-base">Todas</span>
                    </label>
                    {categories.map(category => {
                      const count = (category as any).product_count || 0;
                      return (
                        <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === category.slug}
                            onChange={() => handleCategoryChange(category.slug)}
                            className="text-navy"
                          />
                          <span className="body-base">
                            {category.name} ({count})
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Precio */}
                <div className="mb-6">
                  <h3 className="font-semibold text-navy mb-3">Precio</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">Mínimo: ${priceRange[0]}</label>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Máximo: ${priceRange[1]}</label>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Limpiar filtros */}
                {(selectedCategory || searchQuery || priceRange[0] !== 0 || priceRange[1] !== 1000) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      setSearchQuery('');
                      setPriceRange([0, 1000]);
                    }}
                    className="btn-secondary w-full"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>

            {/* Productos */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-navy border-t-transparent"></div>
                  <p className="mt-4 text-gray-600">Cargando productos...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No se encontraron productos</p>
                </div>
              ) : (
                <>
                  <div className="mb-4 text-gray-600">
                    {products.length} producto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <ProductCard
	                        key={product.id}
	                        id={product.id.toString()}
	                        name={product.name}
	                        price={product.price}
                        image={product.image || 'https://via.placeholder.com/300'} // Corregido a 'image'
                        video_url={(product as any).video_url || null}
	                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
