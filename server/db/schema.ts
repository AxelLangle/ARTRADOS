import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'artrados.db');
const db = new Database(dbPath);

// Habilitar foreign keys
db.pragma('foreign_keys = ON');

export function initializeDatabase() {
  // Tabla de usuarios
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      avatar TEXT,
      is_admin BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabla de direcciones
  db.exec(`
    CREATE TABLE IF NOT EXISTS addresses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      street TEXT NOT NULL,
      number TEXT,
      postal_code TEXT NOT NULL,
      state TEXT NOT NULL,
      municipality TEXT NOT NULL,
      locality TEXT NOT NULL,
      neighborhood TEXT NOT NULL,
      interior_number TEXT,
      delivery_instructions TEXT,
      type TEXT DEFAULT 'Residencial',
      recipient_name TEXT NOT NULL,
      recipient_phone TEXT NOT NULL,
      is_default BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Tabla de categorías
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabla de productos
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      stock INTEGER DEFAULT 0,
      category_id INTEGER,
      image_url TEXT,
      video_url TEXT,
      qr_code TEXT,
      featured BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    )
  `);

  // Tabla de órdenes
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      address_id INTEGER NOT NULL,
      total REAL NOT NULL,
      status TEXT DEFAULT 'Procesando',
      tracking_number TEXT UNIQUE,
      estimated_delivery DATE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (address_id) REFERENCES addresses(id)
    )
  `);

  // Tabla de items de órdenes
  db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  // Tabla de eventos de tracking
  db.exec(`
    CREATE TABLE IF NOT EXISTS tracking_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      status TEXT NOT NULL,
      location TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    )
  `);

  // Tabla de listas de favoritos
  db.exec(`
    CREATE TABLE IF NOT EXISTS wishlist_lists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      is_default BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Tabla de items de favoritos
  db.exec(`
    CREATE TABLE IF NOT EXISTS wishlist_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      list_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (list_id) REFERENCES wishlist_lists(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      UNIQUE(list_id, product_id)
    )
  `);

  // Tabla de mensajes de contacto
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('✅ Base de datos inicializada correctamente');
}

export function seedDatabase() {
  // Verificar si ya hay datos
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  
  if (userCount.count > 0) {
    console.log('⏭️  Base de datos ya contiene datos, omitiendo seed');
    return;
  }

  console.log('🌱 Sembrando datos de prueba...');

  // Crear usuario admin
  const adminPassword = bcrypt.hashSync('admin123', 10);
  db.prepare(`
    INSERT INTO users (name, email, password, phone, is_admin)
    VALUES (?, ?, ?, ?, ?)
  `).run('Administrador', 'admin@artrados.com', adminPassword, '5551234567', 1);

  // Crear usuarios de prueba
  const userPassword = bcrypt.hashSync('123456', 10);
  const userId1 = db.prepare(`
    INSERT INTO users (name, email, password, phone)
    VALUES (?, ?, ?, ?)
  `).run('Axel Langle', 'axellangle40@gmail.com', userPassword, '5582594361').lastInsertRowid;

  const userId2 = db.prepare(`
    INSERT INTO users (name, email, password, phone)
    VALUES (?, ?, ?, ?)
  `).run('María González', 'maria.gonzalez@example.com', userPassword, '5551122334').lastInsertRowid;

  // Crear direcciones
  db.prepare(`
    INSERT INTO addresses (user_id, street, postal_code, state, municipality, locality, neighborhood, recipient_name, recipient_phone, is_default)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(userId1, 'Av. de los Dioses #15', '55800', 'México', 'Teotihuacán de Arista', 'Centro', 'Centro', 'Axel Langle', '5582594361', 1);

  db.prepare(`
    INSERT INTO addresses (user_id, street, postal_code, state, municipality, locality, neighborhood, recipient_name, recipient_phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(userId1, 'Cerrada de la Laguna #78', '55600', 'México', 'Zumpango de Ocampo', 'San Juan', 'San Juan', 'Axel Langle', '5582594361');

  // Crear categorías
  const categories = [
    { name: 'Cerámica', slug: 'ceramica', description: 'Productos de cerámica artesanal' },
    { name: 'Textiles', slug: 'textiles', description: 'Textiles y bordados tradicionales' },
    { name: 'Madera', slug: 'madera', description: 'Artesanías en madera tallada' },
    { name: 'Joyería', slug: 'joyeria', description: 'Joyería artesanal mexicana' },
    { name: 'Decoración', slug: 'decoracion', description: 'Artículos decorativos' }
  ];

  categories.forEach(cat => {
    db.prepare(`
      INSERT INTO categories (name, slug, description)
      VALUES (?, ?, ?)
    `).run(cat.name, cat.slug, cat.description);
  });

  // Crear lista de favoritos por defecto
  db.prepare(`
    INSERT INTO wishlist_lists (user_id, name, is_default)
    VALUES (?, ?, ?)
  `).run(userId1, 'Lista Principal', 1);

  console.log('✅ Datos de prueba sembrados correctamente');
}

export default db;
