// client/data/mockOrders.ts
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingMethod: string;
  shippingAddressId: string;
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrackingEvent {
  id: string;
  orderId: string;
  status: string;
  location?: string;
  timestamp: string;
  notes?: string;
}

export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "531751",
    userId: "1",
    items: [
      {
        id: "1",
        productId: "1",
        productName: "Jarrón de Barro Artesanal",
        productImage: "https://api.builder.io/api/v1/image/assets/TEMP/f3748033348ff6036cbef09a04d9c6a06d643dd9?width=466",
        quantity: 2,
        price: 450,
      },
      {
        id: "2",
        productId: "2",
        productName: "Tapete Oaxaqueño",
        productImage: "https://api.builder.io/api/v1/image/assets/TEMP/d82fcbac2c633e7e48bf44bc3f02e4ae6e08f9f1?width=466",
        quantity: 1,
        price: 1200,
      },
    ],
    total: 2100.00,
    status: "shipped",
    shippingMethod: "Estándar",
    shippingAddressId: "1",
    estimatedDelivery: "14 de Octubre, 2025",
    createdAt: "05 de Octubre, 2025",
    updatedAt: "12 de Octubre, 2025",
  },
  {
    id: "2",
    orderNumber: "531752",
    userId: "1",
    items: [
      {
        id: "3",
        productId: "3",
        productName: "Máscara de Madera Tallada",
        productImage: "https://api.builder.io/api/v1/image/assets/TEMP/d57e70596c6c096c421ff3969286017b98fad44f?width=466",
        quantity: 1,
        price: 850,
      },
    ],
    total: 850.00,
    status: "processing",
    shippingMethod: "Express",
    shippingAddressId: "1",
    estimatedDelivery: "18 de Noviembre, 2025",
    createdAt: "15 de Noviembre, 2025",
    updatedAt: "15 de Noviembre, 2025",
  },
  {
    id: "3",
    orderNumber: "528943",
    userId: "1",
    items: [
      {
        id: "4",
        productId: "1",
        productName: "Jarrón de Barro Artesanal",
        productImage: "https://api.builder.io/api/v1/image/assets/TEMP/f3748033348ff6036cbef09a04d9c6a06d643dd9?width=466",
        quantity: 1,
        price: 450,
      },
      {
        id: "5",
        productId: "4",
        productName: "Collar de Plata con Turquesa",
        productImage: "https://api.builder.io/api/v1/image/assets/TEMP/f3748033348ff6036cbef09a04d9c6a06d643dd9?width=466",
        quantity: 1,
        price: 3780,
      },
    ],
    total: 4230.00,
    status: "delivered",
    shippingMethod: "Estándar",
    shippingAddressId: "1",
    estimatedDelivery: "05 de Octubre, 2025",
    createdAt: "28 de Septiembre, 2025",
    updatedAt: "05 de Octubre, 2025",
  },
  {
    id: "4",
    orderNumber: "527821",
    userId: "1",
    items: [
      {
        id: "6",
        productId: "2",
        productName: "Tapete Oaxaqueño",
        productImage: "https://api.builder.io/api/v1/image/assets/TEMP/d82fcbac2c633e7e48bf44bc3f02e4ae6e08f9f1?width=466",
        quantity: 2,
        price: 1200,
      },
    ],
    total: 2400.00,
    status: "delivered",
    shippingMethod: "Express",
    shippingAddressId: "2",
    estimatedDelivery: "20 de Septiembre, 2025",
    createdAt: "15 de Septiembre, 2025",
    updatedAt: "20 de Septiembre, 2025",
  },
  {
    id: "5",
    orderNumber: "526543",
    userId: "1",
    items: [
      {
        id: "7",
        productId: "3",
        productName: "Máscara de Madera Tallada",
        productImage: "https://api.builder.io/api/v1/image/assets/TEMP/d57e70596c6c096c421ff3969286017b98fad44f?width=466",
        quantity: 3,
        price: 850,
      },
    ],
    total: 2550.00,
    status: "delivered",
    shippingMethod: "Estándar",
    shippingAddressId: "1",
    estimatedDelivery: "10 de Septiembre, 2025",
    createdAt: "01 de Septiembre, 2025",
    updatedAt: "10 de Septiembre, 2025",
  },
];

export const mockTrackingEvents: TrackingEvent[] = [
  {
    id: "1",
    orderId: "1",
    status: "Pedido recibido",
    timestamp: "05 de Octubre, 2025",
    notes: "Tu pedido ha sido recibido y está siendo preparado",
  },
  {
    id: "2",
    orderId: "1",
    status: "Procesando",
    timestamp: "06 de Octubre, 2025",
    notes: "Estamos preparando tu pedido para el envío",
  },
  {
    id: "3",
    orderId: "1",
    status: "En camino",
    location: "Tecamac de Felipe Villanueva, México",
    timestamp: "12 de Octubre, 2025",
    notes: "Tu pedido está en camino a la dirección de entrega",
  },
  {
    id: "4",
    orderId: "1",
    status: "Entrega",
    timestamp: "14 de Octubre, 2025",
    notes: "Fecha estimada de entrega",
  },
  {
    id: "5",
    orderId: "2",
    status: "Pedido recibido",
    timestamp: "15 de Noviembre, 2025",
    notes: "Tu pedido ha sido recibido y está siendo preparado",
  },
  {
    id: "6",
    orderId: "2",
    status: "Procesando",
    timestamp: "15 de Noviembre, 2025",
    notes: "Estamos preparando tu pedido para el envío",
  },
];

// Helper functions
export function getUserOrders(userId: string): Order[] {
  return mockOrders.filter((order) => order.userId === userId);
}

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find((order) => order.id === id);
}

export function getOrderByNumber(orderNumber: string): Order | undefined {
  return mockOrders.find((order) => order.orderNumber === orderNumber);
}

export function getOrderTracking(orderId: string): TrackingEvent[] {
  return mockTrackingEvents.filter((event) => event.orderId === orderId);
}

export function getActiveOrders(userId: string): Order[] {
  return getUserOrders(userId).filter(
    (order) => order.status === "processing" || order.status === "shipped"
  );
}

export function getPastOrders(userId: string): Order[] {
  return getUserOrders(userId).filter((order) => order.status === "delivered");
}

export function getStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    pending: "Pendiente",
    processing: "Procesando",
    shipped: "Enviado",
    delivered: "Entregado",
    cancelled: "Cancelado",
  };
  return labels[status];
}
