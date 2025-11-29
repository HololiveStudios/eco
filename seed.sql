-- seed.sql - Dados iniciais para teste
INSERT INTO categories (id, name, slug, description) VALUES 
('cat-1', 'Eletrônicos', 'eletronicos', 'Produtos eletrônicos e tecnologia'),
('cat-2', 'Moda', 'moda', 'Roupas e acessórios'),
('cat-3', 'Casa', 'casa', 'Itens para casa');

INSERT INTO products (id, name, slug, price, compare_price, description, category, stock, featured, tags, images) VALUES 
('prod-1', 'Smartphone Premium', 'smartphone-premium', 2999.90, 3499.90, 'Smartphone de última geração', 'Eletrônicos', 50, 1, '["novo","destaque"]', '["https://via.placeholder.com/400"]'),
('prod-2', 'Notebook Gamer', 'notebook-gamer', 5999.90, 6999.90, 'Notebook para jogos', 'Eletrônicos', 30, 1, '["gamer","potente"]', '["https://via.placeholder.com/400"]'),
('prod-3', 'Camiseta Básica', 'camiseta-basica', 49.90, NULL, 'Camiseta 100% algodão', 'Moda', 100, 0, '["basico"]', '["https://via.placeholder.com/400"]'),
('prod-4', 'Jaqueta Jeans', 'jaqueta-jeans', 199.90, 249.90, 'Jaqueta jeans estilo clássico', 'Moda', 45, 1, '["inverno","classico"]', '["https://via.placeholder.com/400"]'),
('prod-5', 'Luminária LED', 'luminaria-led', 89.90, NULL, 'Luminária LED moderna', 'Casa', 60, 0, '["decoracao"]', '["https://via.placeholder.com/400"]');

INSERT INTO coupons (id, code, discount, type, min_value, max_uses, active) VALUES 
('coup-1', 'BEMVINDO10', 10, 'percentage', 100, 1000, 1),
('coup-2', 'PRIMEIRACOMPRA', 50, 'fixed', 200, 500, 1),
('coup-3', 'FRETEGRATIS', 15, 'fixed', 150, 2000, 1);