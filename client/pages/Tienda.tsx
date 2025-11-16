import { useState, useEffect } from 'react';
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { ChevronDown, Search } from "lucide-react";
import { productsAPI, categoriesAPI } from '../services/api';

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category_name?: string;
  category_slug?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  product_count: number;
}

export default function Tienda() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, searchQuery]);

  const loadCategories = async () => {
    try {
      const data = await categoriesAPI.getAll();
      setCategories(data);
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
      
      const data = await productsAPI.getAll(filters);
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
            
            {/* Buscador */}
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full pl-4 pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
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
                    {categories.map(category => (
                      <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category.slug}
                          onChange={() => handleCategoryChange(category.slug)}
                          className="text-navy"
                        />
                        <span className="body-base">
                          {category.name} ({category.product_count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Limpiar filtros */}
                {(selectedCategory || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      setSearchQuery('');
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
                        image={product.image_url || 'https://via.placeholder.com/300'}
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
