import { Router } from 'express';
import db from '../db/schema';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticate);

// Obtener todas las direcciones del usuario
router.get('/', (req: AuthRequest, res) => {
  try {
    const addresses = db.prepare(`
      SELECT * FROM addresses
      WHERE user_id = ?
      ORDER BY is_default DESC, created_at DESC
    `).all(req.user!.userId);

    res.json(addresses);
  } catch (error) {
    console.error('Error al obtener direcciones:', error);
    res.status(500).json({ error: 'Error al obtener direcciones' });
  }
});

// Obtener una dirección específica
router.get('/:id', (req: AuthRequest, res) => {
  try {
    const address = db.prepare(`
      SELECT * FROM addresses
      WHERE id = ? AND user_id = ?
    `).get(req.params.id, req.user!.userId);

    if (!address) {
      return res.status(404).json({ error: 'Dirección no encontrada' });
    }

    res.json(address);
  } catch (error) {
    console.error('Error al obtener dirección:', error);
    res.status(500).json({ error: 'Error al obtener dirección' });
  }
});

// Crear nueva dirección
router.post('/', (req: AuthRequest, res) => {
  try {
    const {
      street,
      number,
      postal_code,
      state,
      municipality,
      locality,
      neighborhood,
      interior_number,
      delivery_instructions,
      type,
      recipient_name,
      recipient_phone,
      is_default
    } = req.body;

    const userId = req.user!.userId;

    // Si es dirección por defecto, quitar el default de las demás
    if (is_default) {
      db.prepare(`
        UPDATE addresses
        SET is_default = 0
        WHERE user_id = ?
      `).run(userId);
    }

    const result = db.prepare(`
      INSERT INTO addresses (
        user_id, street, number, postal_code, state, municipality,
        locality, neighborhood, interior_number, delivery_instructions,
        type, recipient_name, recipient_phone, is_default
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      userId, street, number, postal_code, state, municipality,
      locality, neighborhood, interior_number, delivery_instructions,
      type, recipient_name, recipient_phone, is_default ? 1 : 0
    );

    res.status(201).json({
      message: 'Dirección creada exitosamente',
      id: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Error al crear dirección:', error);
    res.status(500).json({ error: 'Error al crear dirección' });
  }
});

// Actualizar dirección
router.put('/:id', (req: AuthRequest, res) => {
  try {
    const {
      street,
      number,
      postal_code,
      state,
      municipality,
      locality,
      neighborhood,
      interior_number,
      delivery_instructions,
      type,
      recipient_name,
      recipient_phone,
      is_default
    } = req.body;

    const userId = req.user!.userId;
    const addressId = req.params.id;

    // Verificar que la dirección pertenece al usuario
    const existing = db.prepare(`
      SELECT id FROM addresses
      WHERE id = ? AND user_id = ?
    `).get(addressId, userId);

    if (!existing) {
      return res.status(404).json({ error: 'Dirección no encontrada' });
    }

    // Si es dirección por defecto, quitar el default de las demás
    if (is_default) {
      db.prepare(`
        UPDATE addresses
        SET is_default = 0
        WHERE user_id = ? AND id != ?
      `).run(userId, addressId);
    }

    db.prepare(`
      UPDATE addresses
      SET street = ?, number = ?, postal_code = ?, state = ?, municipality = ?,
          locality = ?, neighborhood = ?, interior_number = ?, delivery_instructions = ?,
          type = ?, recipient_name = ?, recipient_phone = ?, is_default = ?
      WHERE id = ?
    `).run(
      street, number, postal_code, state, municipality,
      locality, neighborhood, interior_number, delivery_instructions,
      type, recipient_name, recipient_phone, is_default ? 1 : 0,
      addressId
    );

    res.json({ message: 'Dirección actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar dirección:', error);
    res.status(500).json({ error: 'Error al actualizar dirección' });
  }
});

// Eliminar dirección
router.delete('/:id', (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;
    const addressId = req.params.id;

    const result = db.prepare(`
      DELETE FROM addresses
      WHERE id = ? AND user_id = ?
    `).run(addressId, userId);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Dirección no encontrada' });
    }

    res.json({ message: 'Dirección eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar dirección:', error);
    res.status(500).json({ error: 'Error al eliminar dirección' });
  }
});

export default router;
