import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { productsAPI, categoriesAPI } from '../services/api';
import { Product, Category } from '../types';
import QRCode from 'qrcode.react';
import { Plus, Edit, Trash2, QrCode, ArrowLeft } from 'lucide-react';
import DragAndDropInput from '../components/DragAndDropInput';





export default function Admin() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category_id: 0,
    image: '', // Corregido a 'image'
    video_url: '',
    featured: false
  });

  useEffect(() => {
    // Verificar si el usuario es admin
    const userRole = localStorage.getItem('userRole');
    const storedUser = localStorage.getItem('artra:user');
    
    if (userRole !== 'admin' && !storedUser) {
      navigate('/');
      return;
    }
    
    // Si el usuario está logueado, verificar que sea admin
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (!userData.isAdmin) {
          navigate('/');
          return;
        }
      } catch {
        navigate('/');
        return;
      }
    }
    
    loadData();
  }, [navigate]);


  const loadData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // La API de update es más flexible y acepta el objeto completo
        await productsAPI.update(editingProduct.id, {
          ...formData,
          image: formData.image, // Asegurar que la clave es 'image'
          video_url: formData.video_url || null,
        });
      } else {
        // Usar la nueva función addProduct
        await productsAPI.addProduct({
          ...formData,
          image: formData.image, // Asegurar que la clave es 'image'
          video_url: formData.video_url || null,
        });
      }
      await loadData();
      resetForm();
    } catch (error) {
      console.error('Error al guardar producto:', error);
      alert('Error al guardar producto');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      await productsAPI.delete(id);
      await loadData();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar producto');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category_id: product.category_id,
      image: product.image, // Corregido a 'image'
      video_url: product.video_url || '', // Asegurar que no es null para el input
      featured: product.featured
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category_id: 0,
      image: '', // Corregido a 'image'
      video_url: '',
      featured: false
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
	    <div className="min-h-screen bg-gray-50 py-8">
	      <div className="max-w-7xl mx-auto px-4">
	        <div className="flex items-center justify-between mb-8">
	          <h1 className="heading-1">Panel de Administración</h1>
	          <button
	            onClick={() => navigate('/')}
	            className="btn-secondary flex items-center gap-2"
	          >
	            Volver al Inicio
	          </button>
	        </div>
	        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Agregar Producto
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="heading-3 mb-4">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block body-base font-semibold mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block body-base font-semibold mb-2">Categoría</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
                  required
                  className="input-field w-full"
                >
                  <option value={0}>Seleccionar categoría</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block body-base font-semibold mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="input-field w-full"
                />
              </div>

	              <div>
	                <label className="block body-base font-semibold mb-2">Precio</label>
	                <div className="relative">
	                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
	                  <input
	                    type="number"
	                    step="0.01"
	                    value={formData.price === 0 ? '' : formData.price}
	                    onFocus={(e) => e.target.value === '0' && setFormData({ ...formData, price: '' as any })}
	                    onBlur={(e) => e.target.value === '' && setFormData({ ...formData, price: 0 })}
	                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
	                    required
	                    className="input-field w-full pl-6"
	                  />
	                </div>
	              </div>

	              <div>
	                <label className="block body-base font-semibold mb-2">Stock</label>
	                <input
	                  type="number"
	                  value={formData.stock === 0 ? '' : formData.stock}
	                  onFocus={(e) => e.target.value === '0' && setFormData({ ...formData, stock: '' as any })}
	                  onBlur={(e) => e.target.value === '' && setFormData({ ...formData, stock: 0 })}
	                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
	                  required
	                  className="input-field w-full"
	                />
	              </div>

	              <div className="md:col-span-2">
	                <DragAndDropInput
	                  value={formData.image}
	                  onChange={(value) => setFormData({ ...formData, image: value })}
	                  productName={formData.name}
	                />
	              </div>

              <div>
                <label className="block body-base font-semibold mb-2">URL de Video</label>
                <input
	                  type="url"
	                  value={formData.video_url}
	                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
	                  className="input-field w-full"
	                  placeholder="Se generará QR automáticamente"
	                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded"
                  />
                  <span className="body-base">Producto destacado</span>
                </label>
              </div>

              <div className="md:col-span-2 flex gap-4">
                <button type="button" onClick={resetForm} className="btn-secondary flex-1">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary flex-1">
                  {editingProduct ? 'Actualizar' : 'Crear'} Producto
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de productos */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-navy text-white">
              <tr>
                <th className="px-4 py-3 text-left">Producto</th>
                <th className="px-4 py-3 text-left">Categoría</th>
                <th className="px-4 py-3 text-right">Precio</th>
                <th className="px-4 py-3 text-right">Stock</th>
	                <th className="px-4 py-3 text-center">QR</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
	                  <td className="px-4 py-3">
	                    <div className="flex items-center gap-3">
	                      {product.image && (
	                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
	                      )}
	                      <div>
                        <div className="font-semibold">{product.name}</div>
                        {product.featured && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Destacado</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {categories.find(c => c.id === product.category_id)?.name || 'Sin categoría'}
                  </td>
                  <td className="px-4 py-3 text-right">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">{product.stock}</td>
	                  <td className="px-4 py-3 text-center">
	                    {product.video_url && (
	                      <a 
	                        href={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(product.video_url)}`} 
	                        target="_blank" 
	                        rel="noopener noreferrer"
	                        className="text-blue hover:text-navy"
	                        title="Ver QR del video"
	                      >
	                        <QrCode className="w-5 h-5 mx-auto" />
	                      </a>
	                    )}
	                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue hover:text-navy"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
