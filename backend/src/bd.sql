CREATE DATABASE photo_studio;

USE photo_studio;

CREATE TABLE rooms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT NOT NULL,
    date DATE NOT NULL,
    time_start TIME NOT NULL,
    time_end TIME NOT NULL,
    client_name VARCHAR(100),
    client_phone VARCHAR(50),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);
INSERT INTO rooms (name) VALUES
('Studio Soft'),
('Studio Nude'),
('Studio Avalon');
INSERT INTO bookings (room_id, date, time_start, time_end, client_name, client_phone) VALUES
(1, '2025-05-05', '09:00:00', '11:00:00', 'Іван Петренко', '0991234567'),
(2, '2025-05-06', '12:00:00', '14:00:00', 'Марія Іванова', '0687654321'),
(3, '2025-05-07', '15:00:00', '17:00:00', 'Олександр Коваленко', '0509876543');

UPDATE rooms SET name = 'Nude' WHERE id = 2;
UPDATE rooms SET name = 'Soft' WHERE id = 1;

SELECT id, name FROM rooms