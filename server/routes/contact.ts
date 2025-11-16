import { Router } from 'express';
import db from '../db/schema';

const router = Router();

// Enviar mensaje de contacto (público)
router.post('/', (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    db.prepare(`
      INSERT INTO contact_messages (name, email, phone, message)
      VALUES (?, ?, ?, ?)
    `).run(name, email, phone || null, message);

    res.status(201).json({ message: 'Mensaje enviado exitosamente' });
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
});

export default router;
