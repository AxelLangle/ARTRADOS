import { Router } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db/schema';
import { generateToken } from '../utils/jwt';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Registro de usuario
router.post('/register', (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validaciones
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Verificar si el email ya existe
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hash de la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insertar usuario
    const result = db.prepare(`
      INSERT INTO users (name, email, password, phone)
      VALUES (?, ?, ?, ?)
    `).run(name, email, hashedPassword, phone || null);

    const userId = result.lastInsertRowid as number;

    // Crear lista de favoritos por defecto
    db.prepare(`
      INSERT INTO wishlist_lists (user_id, name, is_default)
      VALUES (?, ?, ?)
    `).run(userId, 'Lista Principal', 1);

    // Generar token
    const token = generateToken({
      userId,
      email,
      isAdmin: false
    });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: userId,
        name,
        email,
        phone,
        isAdmin: false
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Buscar usuario
    const user = db.prepare(`
      SELECT id, name, email, password, phone, avatar, is_admin
      FROM users
      WHERE email = ?
    `).get(email) as any;

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      isAdmin: Boolean(user.is_admin)
    });

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        isAdmin: Boolean(user.is_admin)
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Obtener perfil del usuario autenticado
router.get('/me', authenticate, (req: AuthRequest, res) => {
  try {
    const user = db.prepare(`
      SELECT id, name, email, phone, avatar, is_admin
      FROM users
      WHERE id = ?
    `).get(req.user!.userId) as any;

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      isAdmin: Boolean(user.is_admin)
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
});

// Actualizar perfil
router.put('/profile', authenticate, (req: AuthRequest, res) => {
  try {
    const { name, phone } = req.body;
    const userId = req.user!.userId;

    db.prepare(`
      UPDATE users
      SET name = ?, phone = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(name, phone, userId);

    res.json({ message: 'Perfil actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
});

// Cambiar email
router.put('/change-email', authenticate, (req: AuthRequest, res) => {
  try {
    const { newEmail } = req.body;
    const userId = req.user!.userId;

    // Verificar si el nuevo email ya existe
    const existing = db.prepare('SELECT id FROM users WHERE email = ? AND id != ?').get(newEmail, userId);
    if (existing) {
      return res.status(400).json({ error: 'El email ya está en uso' });
    }

    db.prepare(`
      UPDATE users
      SET email = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(newEmail, userId);

    res.json({ message: 'Email actualizado exitosamente' });
  } catch (error) {
    console.error('Error al cambiar email:', error);
    res.status(500).json({ error: 'Error al cambiar email' });
  }
});

// Cambiar contraseña
router.put('/change-password', authenticate, (req: AuthRequest, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user!.userId;

    // Obtener contraseña actual
    const user = db.prepare('SELECT password FROM users WHERE id = ?').get(userId) as any;
    
    // Verificar contraseña actual
    const isValid = bcrypt.compareSync(currentPassword, user.password);
    if (!isValid) {
      return res.status(400).json({ error: 'Contraseña actual incorrecta' });
    }

    // Hash de la nueva contraseña
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    db.prepare(`
      UPDATE users
      SET password = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(hashedPassword, userId);

    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ error: 'Error al cambiar contraseña' });
  }
});

export default router;
