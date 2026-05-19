-- Computer Store Database Schema (Supabase)
-- Run this SQL in your Supabase SQL Editor

-- Users Table
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'customer',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  stock INTEGER NOT NULL,
  category VARCHAR(100) NOT NULL,
  model VARCHAR(100),
  warranty VARCHAR(100),
  emoji VARCHAR(10),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  customerName VARCHAR(255) NOT NULL,
  customerEmail VARCHAR(255) NOT NULL,
  customerPhone VARCHAR(20) NOT NULL,
  shippingAddress TEXT NOT NULL,
  city VARCHAR(100),
  postalCode VARCHAR(20),
  items JSONB,
  totalAmount INTEGER NOT NULL,
  paymentMethod VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE payments (
  id BIGSERIAL PRIMARY KEY,
  orderId BIGINT REFERENCES orders(id),
  amount INTEGER NOT NULL,
  customerName VARCHAR(255),
  customerPhone VARCHAR(20),
  bkashNumber VARCHAR(20),
  transactionId VARCHAR(255),
  status VARCHAR(50) DEFAULT 'initiated',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completedAt TIMESTAMP
);

-- User Logins Table
CREATE TABLE user_logins (
  id BIGSERIAL PRIMARY KEY,
  userId BIGINT REFERENCES users(id),
  email VARCHAR(255),
  loginTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  userAgent TEXT
);

-- Create indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_email ON orders(customerEmail);
CREATE INDEX idx_user_logins_userId ON user_logins(userId);
CREATE INDEX idx_payments_orderId ON payments(orderId);

-- Insert demo products
INSERT INTO products (name, description, price, stock, category, model, warranty, emoji) VALUES
('Intel Core i9-13900KS', 'High-end gaming CPU with 24 cores', 85000, 5, 'Processor', 'i9-13900KS', '3 Years', '⚙️'),
('AMD Ryzen 7 7700X', 'Excellent productivity CPU 8-core', 45000, 8, 'Processor', 'Ryzen 7 7700X', '3 Years', '⚙️'),
('NVIDIA RTX 4090', 'Best gaming graphics card 24GB VRAM', 180000, 3, 'GPU', 'RTX 4090', '2 Years', '🎮'),
('RTX 4070 Ti', 'Mid-high GPU 12GB VRAM', 95000, 6, 'GPU', 'RTX 4070 Ti', '2 Years', '🎮'),
('DDR5 64GB RAM Kit', 'High performance memory 6000MHz', 45000, 12, 'RAM', 'Corsair Vengeance', '5 Years', '💾'),
('DDR4 32GB RAM Kit', 'Standard DDR4 3600MHz', 15000, 20, 'RAM', 'G.Skill Ripjaws', '5 Years', '💾'),
('WD Black NVMe 2TB', 'Ultra-fast storage 7100MB/s', 25000, 15, 'Storage', 'WD Black SN850X', '5 Years', '📦'),
('Samsung 870 QVO 1TB', 'Reliable SSD storage', 8000, 25, 'Storage', '870 QVO', '5 Years', '📦'),
('ASUS ROG Strix Z790', 'Premium motherboard LGA1700', 38000, 4, 'Motherboard', 'ROG STRIX Z790', '2 Years', '🔌'),
('MSI MPG B650E', 'High-end AM5 motherboard', 32000, 7, 'Motherboard', 'MPG B650E', '2 Years', '🔌'),
('Corsair HX1200', '1200W 80+ Platinum PSU', 22000, 10, 'Power Supply', 'HX1200', '10 Years', '⚡'),
('Seasonic Focus 850', '850W 80+ Gold modular PSU', 16000, 12, 'Power Supply', 'Focus GX', '12 Years', '⚡'),
('NZXT Kraken Z73', 'RGB Liquid Cooler 360mm', 18000, 8, 'Cooling', 'Kraken Z73', '6 Years', '❄️'),
('Noctua NH-D15', 'Best Air Cooler 140mm', 12000, 14, 'Cooling', 'NH-D15', '6 Years', '❄️'),
('Corsair 5000T RGB', 'Full tower gaming case', 16000, 6, 'Case', 'Corsair 5000T', '5 Years', '🖥️'),
('Lian Li Lancool 303', 'Compact mid-tower case', 8000, 18, 'Case', 'Lancool 303', '5 Years', '🖥️');

-- Insert demo admin user
-- Password: password123
INSERT INTO users (email, password, name, role) VALUES
('admin@example.com', '$2a$10$ZIvVc3c6.5K3VnM.n1K.G.o3DRNbPPVg3YzKLK5kL1h9K2C2a3EWG', 'Admin User', 'admin'),
('customer@example.com', '$2a$10$ZIvVc3c6.5K3VnM.n1K.G.o3DRNbPPVg3YzKLK5kL1h9K2C2a3EWG', 'John Doe', 'customer');
