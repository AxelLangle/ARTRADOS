const API_BASE_URL = 'http://localhost:3000/api';

// Helper para manejar respuestas
async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(error.error || 'Error en la petición');
  }
  return response.json();
}

// Helper para obtener el token
function getAuthHeader() {
  const token = localStorage.getItem('authToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },

  register: async (name: string, email: string, password: string, phone?: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone })
    });
    return handleResponse(response);
  },

  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse(response);
  },

  updateProfile: async (name: string, phone: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ name, phone })
    });
    return handleResponse(response);
  },

  changeEmail: async (newEmail: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/change-email`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ newEmail })
    });
    return handleResponse(response);
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ currentPassword, newPassword })
    });
    return handleResponse(response);
  }
};

// Products API
export const productsAPI = {
  getAll: async (filters?: { category?: string; search?: string; featured?: boolean }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.featured) params.append('featured', 'true');
    
    const response = await fetch(`${API_BASE_URL}/products?${params}`);
    return handleResponse(response);
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return handleResponse(response);
  },

  create: async (product: any) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(product)
    });
    return handleResponse(response);
  },

  update: async (id: number, product: any) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(product)
    });
    return handleResponse(response);
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(response);
  }
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return handleResponse(response);
  }
};

// Addresses API
export const addressesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/addresses`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse(response);
  },

  create: async (address: any) => {
    const response = await fetch(`${API_BASE_URL}/addresses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(address)
    });
    return handleResponse(response);
  },

  update: async (id: number, address: any) => {
    const response = await fetch(`${API_BASE_URL}/addresses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(address)
    });
    return handleResponse(response);
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/addresses/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(response);
  }
};

// Wishlist API
export const wishlistAPI = {
  getLists: async () => {
    const response = await fetch(`${API_BASE_URL}/wishlist/lists`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse(response);
  },

  createList: async (name: string) => {
    const response = await fetch(`${API_BASE_URL}/wishlist/lists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ name })
    });
    return handleResponse(response);
  },

  deleteList: async (listId: number) => {
    const response = await fetch(`${API_BASE_URL}/wishlist/lists/${listId}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(response);
  },

  getListItems: async (listId: number) => {
    const response = await fetch(`${API_BASE_URL}/wishlist/lists/${listId}/items`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse(response);
  },

  addItem: async (listId: number, productId: number) => {
    const response = await fetch(`${API_BASE_URL}/wishlist/lists/${listId}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ product_id: productId })
    });
    return handleResponse(response);
  },

  removeItem: async (listId: number, productId: number) => {
    const response = await fetch(`${API_BASE_URL}/wishlist/lists/${listId}/items/${productId}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(response);
  }
};

// Contact API
export const contactAPI = {
  sendMessage: async (name: string, email: string, phone: string, message: string) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, message })
    });
    return handleResponse(response);
  }
};
