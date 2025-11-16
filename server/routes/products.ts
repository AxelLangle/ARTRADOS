import { Router } from 'express';
import db from '../db/schema';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';
import QRCode from 'qrcode';

const router = Router();

// Obtener todos los productos (público)
router.get('/', (req, res) => {
  try {
    const { category, search, featured } = req.query;
    
    let query = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (category) {
      query += ' AND c.slug = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    if (featured === 'true') {
      query += ' AND p.featured = 1';
    }

    query += ' ORDER BY p.created_at DESC';

    const products = db.prepare(query).all(...params);
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Obtener un producto por ID (público)
router.get('/:id', (req, res) => {
  try {
    const product = db.prepare(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `).get(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// Crear producto (solo admin)
router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category_id,
      image_url,
      video_url,
      featured
    } = req.body;

    const result = db.prepare(`
      INSERT INTO products (name, description, price, stock, category_id, image_url, video_url, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(name, description, price, stock || 0, category_id, image_url, video_url, featured ? 1 : 0);

    const productId = result.lastInsertRowid;

    // Generar QR code si hay video_url
    if (video_url) {
      try {
        const qrCode = await QRCode.toDataURL(video_url);
        db.prepare('UPDATE products SET qr_code = ? WHERE id = ?').run(qrCode, productId);
      } catch (qrError) {
        console.error('Error al generar QR:', qrError);
      }
    }

    res.status(201).json({
      message: 'Producto creado exitosamente',
      id: productId
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// Actualizar producto (solo admin)
router.put('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category_id,
      image_url,
      video_url,
      featured
    } = req.body;

    const productId = req.params.id;

    // Verificar si el producto existe
    const existing = db.prepare('SELECT id, video_url FROM products WHERE id = ?').get(productId) as any;
    if (!existing) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    db.prepare(`
      UPDATE products
      SET name = ?, description = ?, price = ?, stock = ?, category_id = ?,
          image_url = ?, video_url = ?, featured = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(name, description, price, stock, category_id, image_url, video_url, featured ? 1 : 0, productId);

    // Regenerar QR si cambió el video_url
    if (video_url && video_url !== existing.video_url) {
      try {
        const qrCode = await QRCode.toDataURL(video_url);
        db.prepare('UPDATE products SET qr_code = ? WHERE id = ?').run(qrCode, productId);
      } catch (qrError) {
        console.error('Error al generar QR:', qrError);
      }
    }

    res.json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// Eliminar producto (solo admin)
router.delete('/:id', authenticate, requireAdmin, (req: AuthRequest, res) => {
  try {
    const result = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

export default router;
