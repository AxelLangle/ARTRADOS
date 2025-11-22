import { Router } from 'express';
import db from '../db/schema';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticate);

// Obtener todas las listas del usuario
router.get('/lists', (req: AuthRequest, res) => {
  try {
    const lists = db.prepare(`
      SELECT l.*, COUNT(i.id) as item_count
      FROM wishlist_lists l
      LEFT JOIN wishlist_items i ON l.id = i.list_id
      WHERE l.user_id = ?
      GROUP BY l.id
      ORDER BY l.is_default DESC, l.created_at DESC
    `).all(req.user!.userId);

    res.json(lists);
  } catch (error) {
    console.error('Error al obtener listas:', error);
    res.status(500).json({ error: 'Error al obtener listas' });
  }
});

// Crear nueva lista
router.post('/lists', (req: AuthRequest, res) => {
  try {
    const { name } = req.body;
    const userId = req.user!.userId;

    if (!name) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const result = db.prepare(`
      INSERT INTO wishlist_lists (user_id, name)
      VALUES (?, ?)
    `).run(userId, name);

    res.status(201).json({
      message: 'Lista creada exitosamente',
      id: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Error al crear lista:', error);
    res.status(500).json({ error: 'Error al crear lista' });
  }
});

// Eliminar lista
router.delete('/lists/:id', (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;
    const listId = req.params.id;

    // Verificar que no sea la lista por defecto
    const list = db.prepare(`
      SELECT is_default FROM wishlist_lists
      WHERE id = ? AND user_id = ?
    `).get(listId, userId) as any;

    if (!list) {
      return res.status(404).json({ error: 'Lista no encontrada' });
    }

    if (list.is_default) {
      return res.status(400).json({ error: 'No se puede eliminar la lista principal' });
    }

    db.prepare('DELETE FROM wishlist_lists WHERE id = ?').run(listId);

    res.json({ message: 'Lista eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar lista:', error);
    res.status(500).json({ error: 'Error al eliminar lista' });
  }
});

// Obtener items de una lista
router.get('/lists/:id/items', (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;
    const listId = req.params.id;

    // Verificar que la lista pertenece al usuario
    const list = db.prepare(`
      SELECT id FROM wishlist_lists
      WHERE id = ? AND user_id = ?
    `).get(listId, userId);

    if (!list) {
      return res.status(404).json({ error: 'Lista no encontrada' });
    }

    const items = db.prepare(`
      SELECT i.*, p.name, p.price, p.image_url, c.name as category_name
      FROM wishlist_items i
      JOIN products p ON i.product_id = p.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE i.list_id = ?
      ORDER BY i.created_at DESC
    `).all(listId);

    res.json(items);
  } catch (error) {
    console.error('Error al obtener items:', error);
    res.status(500).json({ error: 'Error al obtener items' });
  }
});

// Agregar producto a lista
router.post('/lists/:id/items', (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;
    const listId = req.params.id;
    const { product_id } = req.body;

    // Verificar que la lista pertenece al usuario
    const list = db.prepare(`
      SELECT id FROM wishlist_lists
      WHERE id = ? AND user_id = ?
    `).get(listId, userId);

    if (!list) {
      return res.status(404).json({ error: 'Lista no encontrada' });
    }

    // Verificar que el producto existe
    const product = db.prepare('SELECT id FROM products WHERE id = ?').get(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    try {
      db.prepare(`
        INSERT INTO wishlist_items (list_id, product_id)
        VALUES (?, ?)
      `).run(listId, product_id);

      res.status(201).json({ message: 'Producto agregado a favoritos' });
    } catch (err: any) {
      if (err.message.includes('UNIQUE')) {
        return res.status(400).json({ error: 'El producto ya está en esta lista' });
      }
      throw err;
    }
  } catch (error) {
    console.error('Error al agregar a favoritos:', error);
    res.status(500).json({ error: 'Error al agregar a favoritos' });
  }
});

// Eliminar producto de lista
router.delete('/lists/:listId/items', (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;
    const listId = req.params.listId;
    const { productId } = req.query; // Usar query parameter para el producto

    if (!productId) {
      return res.status(400).json({ error: 'Falta el ID del producto' });
    }

    // Verificar que la lista pertenece al usuario
    const list = db.prepare(`
      SELECT id FROM wishlist_lists
      WHERE id = ? AND user_id = ?
    `).get(listId, userId);

    if (!list) {
      return res.status(404).json({ error: 'Lista no encontrada' });
    }

    const result = db.prepare(`
      DELETE FROM wishlist_items
      WHERE list_id = ? AND product_id = ?
    `).run(listId, productId);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Producto no encontrado en la lista' });
    }

    res.json({ message: 'Producto eliminado de favoritos' });
  } catch (error) {
    console.error('Error al eliminar de favoritos:', error);
    res.status(500).json({ error: 'Error al eliminar de favoritos' });
  }
});

export default router;
