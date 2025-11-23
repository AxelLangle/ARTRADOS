export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  image: string;
  video_url: string | null;
  featured: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  avatar: string;
}

export interface Address {
  id: number;
  user_id: number;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  name: string;
  default: boolean;
}

export interface Wishlist {
  id: number;
  user_id: number;
  name: string;
  default: boolean;
  items: number[]; // Solo IDs de productos en la API simulada
}

export interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  user_id: number;
  order_number: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  estimated_delivery: string;
  items: OrderItem[];
}
