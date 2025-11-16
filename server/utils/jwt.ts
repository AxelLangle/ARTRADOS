import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'artrados-secret-key-2025';
const JWT_EXPIRES_IN = '7d';

export interface JWTPayload {
  userId: number;
  email: string;
  isAdmin: boolean;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
}
