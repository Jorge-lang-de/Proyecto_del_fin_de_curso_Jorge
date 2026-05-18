-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS inmoluxury;
ALTER TABLE favoritos MODIFY COLUMN id INT AUTO_INCREMENT;
-- 2. Seleccionar la base de datos
USE inmoluxury;

-- 3. Crear la tabla favoritos
CREATE TABLE IF NOT EXISTS favoritos (
    id INT PRIMARY KEY,
    titulo VARCHAR(255),
    precio VARCHAR(50),
    img VARCHAR(255),
    ubicacion VARCHAR(255),
    hab VARCHAR(50),
    banos VARCHAR(50),
    metros VARCHAR(50),
    link VARCHAR(255)
);


select * from favoritos;