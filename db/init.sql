CREATE DATABASE shopper;
USE shopper;

CREATE TABLE drivers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    vehicle VARCHAR(100),
    rating INT,
    review_comment TEXT,
    value FLOAT,
    min_km INT
);

CREATE TABLE rides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    driver_id INT NOT NULL,
    date DATETIME NOT NULL,
    origin VARCHAR(255),
    destination VARCHAR(255),
    duration TIME,
    value FLOAT,
    FOREIGN KEY (driver_id) REFERENCES drivers(id)
);

