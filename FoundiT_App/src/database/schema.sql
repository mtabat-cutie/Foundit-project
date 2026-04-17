CREATE DATABASE IF NOT EXISTS foundit_db;

USE foundit_db;

CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS LostItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    date_lost DATE NOT NULL,
    place_lost VARCHAR(255) NOT NULL,
    reported_by VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS FoundItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    date_found DATE NOT NULL,
    location_found VARCHAR(255) NOT NULL,
    turned_in_by VARCHAR(255)
);
