// client/data/mockUsers.ts
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  avatar?: string;
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  colony: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
}

export const mockUsers: User[] = [
  {
    id: "1",
    email: "axellangle40@gmail.com",
    password: "123456",
    name: "Axel Langle",
    phone: "(558) 259-4361",
    avatar: undefined,
  },
  {
    id: "2",
    email: "maria.garcia@example.com",
    password: "password123",
    name: "María García",
    phone: "(555) 123-4567",
    avatar: undefined,
  },
  {
    id: "3",
    email: "juan.perez@example.com",
    password: "password123",
    name: "Juan Pérez",
    phone: "(555) 987-6543",
    avatar: undefined,
  },
];

export const mockAddresses: Address[] = [
  {
    id: "1",
    userId: "1",
    street: "Av. de los Dioses #15, Col. Centro",
    colony: "Centro",
    city: "Teotihuacán de Arista",
    state: "México",
    postalCode: "55800",
    isDefault: true,
  },
  {
    id: "2",
    userId: "1",
    street: "Cerrada de la Laguna #78, Col. San Juan",
    colony: "San Juan",
    city: "Zumpango de Ocampo",
    state: "México",
    postalCode: "55600",
    isDefault: false,
  },
  {
    id: "3",
    userId: "2",
    street: "Calle Reforma #123, Col. Centro",
    colony: "Centro",
    city: "Ciudad de México",
    state: "CDMX",
    postalCode: "06000",
    isDefault: true,
  },
  {
    id: "4",
    userId: "3",
    street: "Av. Insurgentes #456, Col. Roma",
    colony: "Roma",
    city: "Ciudad de México",
    state: "CDMX",
    postalCode: "06700",
    isDefault: true,
  },
];

// Helper functions
export function getUserByEmail(email: string): User | undefined {
  return mockUsers.find((user) => user.email === email);
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id);
}

export function validateCredentials(email: string, password: string): User | null {
  const user = getUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
}

export function getUserAddresses(userId: string): Address[] {
  return mockAddresses.filter((addr) => addr.userId === userId);
}

export function getAddressById(id: string): Address | undefined {
  return mockAddresses.find((addr) => addr.id === id);
}
