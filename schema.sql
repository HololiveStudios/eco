-- schema.sql - Estrutura do banco D1
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price REAL NOT NULL,
  compare_price REAL,
  description TEXT,
  category TEXT,
  stock INTEGER DEFAULT 0,
  featured INTEGER DEFAULT 0,
  tags TEXT,
  sku TEXT,
  weight REAL,
  images TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  parent_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_cpf TEXT,
  address_street TEXT NOT NULL,
  address_number TEXT NOT NULL,
  address_complement TEXT,
  address_district TEXT NOT NULL,
  address_city TEXT NOT NULL,
  address_state TEXT NOT NULL,
  address_zipcode TEXT NOT NULL,
  items TEXT NOT NULL,
  total REAL NOT NULL,
  subtotal REAL,
  shipping_cost REAL,
  discount REAL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  payment_status TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT,
  verified INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS coupons (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount REAL NOT NULL,
  type TEXT NOT NULL,
  min_value REAL,
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  expires_at DATETIME,
  active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  cpf TEXT,
  password_hash TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);