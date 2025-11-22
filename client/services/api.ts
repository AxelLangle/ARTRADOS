// Simulación robusta de API para el frontend
// Este archivo simula las respuestas del backend hasta que se implemente el backend real

// Datos simulados
const mockUsers = [
  {
    id: 1,
    name: 'Axel Langle',
    email: 'axellangle40@gmail.com',
    password: '123456',
    phone: '(558) 259-4361',
    role: 'user',
    avatar: '/api/placeholder/150/150'
  },
  {
    id: 2,
    name: 'Admin User',
    email: 'admin@artrados.com',
    password: 'admin123',
    phone: '(555) 000-0000',
    role: 'admin',
    avatar: '/api/placeholder/150/150'
  }
];

const mockCategories = [
  { id: 1, name: 'Cerámica', slug: 'ceramica' },
  { id: 2, name: 'Textiles', slug: 'textiles' },
  { id: 3, name: 'Joyería', slug: 'joyeria' },
  { id: 4, name: 'Madera', slug: 'madera' },
  { id: 5, name: 'Vidrio', slug: 'vidrio' },
  { id: 6, name: 'Otros', slug: 'otros' }
];

let mockProducts = [
  {
    id: 1,
    name: 'Cerámica Artesanal Azul',
    description: 'Hermosa pieza de cerámica hecha a mano con diseños tradicionales mexicanos',
    price: 450,
    category_id: 1,
    image: '/api/placeholder/300/300',
    featured: true,
    stock: 10,
    video_url: null
  },
  {
    id: 2,
    name: 'Tejido Tradicional Oaxaca',
    description: 'Textil tejido a mano con técnicas ancestrales de Oaxaca',
    price: 320,
    category_id: 2,
    image: '/api/placeholder/300/300',
    featured: true,
    stock: 8,
    video_url: null
  },
  {
    id: 3,
    name: 'Collar de Plata Artesanal',
    description: 'Joyería de plata pura con diseños únicos',
    price: 580,
    category_id: 3,
    image: '/api/placeholder/300/300',
    featured: true,
    stock: 15,
    video_url: null
  },
  {
    id: 4,
    name: 'Escultura de Madera Tallada',
    description: 'Escultura tallada a mano en madera de cedro',
    price: 750,
    category_id: 4,
    image: '/api/placeholder/300/300',
    featured: false,
    stock: 5,
    video_url: null
  },
  {
    id: 5,
    name: 'Vaso de Vidrio Soplado',
    description: 'Vaso de vidrio artesanal soplado a mano',
    price: 280,
    category_id: 5,
    image: '/api/placeholder/300/300',
    featured: false,
    stock: 20,
    video_url: null
  },
  {
    id: 6,
    name: 'Cerámica Roja Tradicional',
    description: 'Pieza de cerámica roja con patrones geométricos',
    price: 380,
    category_id: 1,
    image: '/api/placeholder/300/300',
    featured: false,
    stock: 12,
    video_url: null
  }
];

let mockAddresses = [
  {
    id: 1,
    user_id: 1,
    street: 'Av. de los Dioses #15',
    city: 'Centro',
    state: 'Centro',
    postal_code: '55800',
    country: 'México',
    name: 'Casa',
    default: true
  },
  {
    id: 2,
    user_id: 1,
    street: 'Cerrada de la Laguna #78',
    city: 'San Juan',
    state: 'Zumpango de Ocampo',
    postal_code: '55600',
    country: 'México',
    name: 'Oficina',
    default: false
  }
];

let mockOrders = [
  {
    id: 1,
    user_id: 1,
    order_number: '#531752',
    total: 850,
    status: 'processing',
    created_at: '2025-11-15',
    estimated_delivery: '2025-11-18',
    items: [
      { product_id: 1, quantity: 1, price: 450 },
      { product_id: 3, quantity: 1, price: 400 }
    ]
  },
  {
    id: 2,
    user_id: 1,
    order_number: '#528943',
    total: 2430,
    status: 'delivered',
    created_at: '2025-09-28',
    estimated_delivery: '2025-10-05',
    items: [{ product_id: 2, quantity: 3, price: 810 }]
  },
  {
    id: 3,
    user_id: 1,
    order_number: '#527821',
    total: 2400,
    status: 'delivered',
    created_at: '2025-09-15',
    estimated_delivery: '2025-09-22',
    items: [{ product_id: 4, quantity: 2, price: 1200 }]
  },
  {
    id: 4,
    user_id: 1,
    order_number: '#526543',
    total: 2550,
    status: 'delivered',
    created_at: '2025-09-01',
    estimated_delivery: '2025-09-08',
    items: [{ product_id: 5, quantity: 3, price: 850 }]
  }
];

let mockWishlists = [
  {
    id: 1,
    user_id: 1,
    name: 'Lista principal',
    default: true,
    items: [1, 3, 5]
  }
];

// Simular delay de red
function simulateDelay(ms = 300) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper para manejar respuestas simuladas
async function mockResponse<T>(data: T, delay = 300): Promise<T> {
  await simulateDelay(delay);
  return data;
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    await simulateDelay(500);
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Email o contraseña incorrectos');
    }

    const token = `mock-token-${user.id}-${Date.now()}`;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', String(user.id));
    localStorage.setItem('userRole', user.role);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar
      }
    };
  },

  register: async (name: string, email: string, password: string, phone?: string) => {
    await simulateDelay(500);
    
    if (mockUsers.find(u => u.email === email)) {
      throw new Error('El email ya está registrado');
    }

    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
      password,
      phone: phone || '',
      role: 'user',
      avatar: '/api/placeholder/150/150'
    };

    mockUsers.push(newUser);

    const token = `mock-token-${newUser.id}-${Date.now()}`;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', String(newUser.id));
    localStorage.setItem('userRole', 'user');

    return {
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        avatar: newUser.avatar
      }
    };
  },

  getProfile: async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('No autenticado');

    const user = mockUsers.find(u => u.id === parseInt(userId));
    if (!user) throw new Error('Usuario no encontrado');

    return mockResponse({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar
    });
  },

  updateProfile: async (name: string, phone: string) => {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('No autenticado');

    const user = mockUsers.find(u => u.id === parseInt(userId));
    if (!user) throw new Error('Usuario no encontrado');

    user.name = name;
    user.phone = phone;

    return mockResponse({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar
    });
  },

  changeEmail: async (newEmail: string) => {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('No autenticado');

    const user = mockUsers.find(u => u.id === parseInt(userId));
    if (!user) throw new Error('Usuario no encontrado');

    if (mockUsers.find(u => u.email === newEmail && u.id !== user.id)) {
      throw new Error('El email ya está en uso');
    }

    user.email = newEmail;
    return mockResponse({ success: true });
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('No autenticado');

    const user = mockUsers.find(u => u.id === parseInt(userId));
    if (!user) throw new Error('Usuario no encontrado');

    if (user.password !== currentPassword) {
      throw new Error('Contraseña actual incorrecta');
    }

    user.password = newPassword;
    return mockResponse({ success: true });
  }
};

// Products API
export const productsAPI = {
  getAll: async (filters?: { category?: string; search?: string; featured?: boolean }) => {
    let results = [...mockProducts];

    if (filters?.category) {
      const category = mockCategories.find(c => c.slug === filters.category);
      if (category) {
        results = results.filter(p => p.category_id === category.id);
      }
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      results = results.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.description.toLowerCase().includes(search)
      );
    }

    if (filters?.featured) {
      results = results.filter(p => p.featured);
    }

    return mockResponse(results);
  },

  getById: async (id: number) => {
    const product = mockProducts.find(p => p.id === id);
    if (!product) throw new Error('Producto no encontrado');
    return mockResponse(product);
  },

  create: async (product: any) => {
    const newProduct = {
      id: Math.max(...mockProducts.map(p => p.id), 0) + 1,
      ...product,
      featured: product.featured || false,
      stock: product.stock || 0
    };

    mockProducts.push(newProduct);
    return mockResponse(newProduct);
  },

  update: async (id: number, product: any) => {
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Producto no encontrado');

    mockProducts[index] = { ...mockProducts[index], ...product };
    return mockResponse(mockProducts[index]);
  },

  delete: async (id: number) => {
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Producto no encontrado');

    mockProducts.splice(index, 1);
    return mockResponse({ success: true });
  }
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    return mockResponse(mockCategories);
  }
};

// Addresses API
export const addressesAPI = {
  getAll: async () => {
    const userId = parseInt(localStorage.getItem('userId') || '0');
    const userAddresses = mockAddresses.filter(a => a.user_id === userId);
    return mockResponse(userAddresses);
  },

  create: async (address: any) => {
    const userId = parseInt(localStorage.getItem('userId') || '0');
    const newAddress = {
      id: Math.max(...mockAddresses.map(a => a.id), 0) + 1,
      user_id: userId,
      ...address,
      default: false
    };

    mockAddresses.push(newAddress);
    return mockResponse(newAddress);
  },

  update: async (id: number, address: any) => {
    const index = mockAddresses.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Dirección no encontrada');

    mockAddresses[index] = { ...mockAddresses[index], ...address };
    return mockResponse(mockAddresses[index]);
  },

  delete: async (id: number) => {
    const index = mockAddresses.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Dirección no encontrada');

    mockAddresses.splice(index, 1);
    return mockResponse({ success: true });
  }
};

// Wishlist API
export const wishlistAPI = {
  getLists: async () => {
    const userId = parseInt(localStorage.getItem('userId') || '0');
    const userLists = mockWishlists.filter(l => l.user_id === userId);
    return mockResponse(userLists);
  },

  createList: async (name: string) => {
    const userId = parseInt(localStorage.getItem('userId') || '0');
    const newList = {
      id: Math.max(...mockWishlists.map(l => l.id), 0) + 1,
      user_id: userId,
      name,
      default: false,
      items: []
    };

    mockWishlists.push(newList);
    return mockResponse(newList);
  },

  deleteList: async (listId: number) => {
    const index = mockWishlists.findIndex(l => l.id === listId);
    if (index === -1) throw new Error('Lista no encontrada');

    mockWishlists.splice(index, 1);
    return mockResponse({ success: true });
  },

  getListItems: async (listId: number) => {
    const list = mockWishlists.find(l => l.id === listId);
    if (!list) throw new Error('Lista no encontrada');

    const items = mockProducts.filter(p => list.items.includes(p.id));
    return mockResponse(items);
  },

  addItem: async (listId: number, productId: number) => {
    const list = mockWishlists.find(l => l.id === listId);
    if (!list) throw new Error('Lista no encontrada');

    if (!list.items.includes(productId)) {
      list.items.push(productId);
    }

    return mockResponse({ success: true });
  },

  removeItem: async (listId: number, productId: number) => {
    const list = mockWishlists.find(l => l.id === listId);
    if (!list) throw new Error('Lista no encontrada');

    list.items = list.items.filter(id => id !== productId);
    return mockResponse({ success: true });
  }
};

// Orders API
export const ordersAPI = {
  getAll: async () => {
    const userId = parseInt(localStorage.getItem('userId') || '0');
    const userOrders = mockOrders.filter(o => o.user_id === userId);
    return mockResponse(userOrders);
  },

  getById: async (id: number) => {
    const order = mockOrders.find(o => o.id === id);
    if (!order) throw new Error('Orden no encontrada');
    return mockResponse(order);
  },

  create: async (order: any) => {
    const userId = parseInt(localStorage.getItem('userId') || '0');
    const newOrder = {
      id: Math.max(...mockOrders.map(o => o.id), 0) + 1,
      user_id: userId,
      order_number: `#${Math.floor(Math.random() * 1000000)}`,
      status: 'processing',
      created_at: new Date().toISOString().split('T')[0],
      estimated_delivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      ...order
    };

    mockOrders.push(newOrder);
    return mockResponse(newOrder);
  }
};

// Contact API
export const contactAPI = {
  sendMessage: async (name: string, email: string, phone: string, message: string) => {
    await simulateDelay(500);
    // Simular envío de mensaje
    console.log('Mensaje de contacto:', { name, email, phone, message });
    return mockResponse({ success: true, message: 'Mensaje enviado correctamente' });
  }
};
