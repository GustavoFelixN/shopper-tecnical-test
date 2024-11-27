CREATE DATABASE shopper;
USE shopper;

CREATE TABLE drivers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    vehicle VARCHAR(100),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_comment TEXT,
    value FLOAT CHECK (value >= 0),
    min_km INT DEFAULT 0
);

CREATE TABLE rides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    driver_id INT NOT NULL,
    date DATETIME NOT NULL,
    origin VARCHAR(255) NULL,
    destination VARCHAR(255) NULL,
    duration INT CHECK (duration >= 0), -- duração em minutos
    value FLOAT CHECK (value >= 0),
    FOREIGN KEY (driver_id) REFERENCES drivers(id)
);

-- Corrigindo o comando INSERT
INSERT INTO drivers (name, description, vehicle, rating, review_comment, value, min_km) VALUES
('Homer Simpson', 
 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).', 
 'Plymouth Valiant 1973 rosa e enferrujado', 
 2, 
 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.', 
 2.5, 
 1),
('Dominic Toretto', 
 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.', 
 'Dodge Charger R/T 1970 modificado', 
 4, 
 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!', 
 5.0, 
 5),
('James Bond', 
 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.', 
 'Aston Martin DB5 clássico', 
 5, 
 'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.', 
 10.0, 
 10);

