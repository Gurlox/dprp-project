CREATE TABLE IF NOT EXISTS users (
   id INT AUTO_INCREMENT NOT NULL,
   login VARCHAR(30) NOT NULL UNIQUE,
   password VARCHAR(30) NOT NULL,
   name VARCHAR(100),
   surname VARCHAR(100),
   birthDate TIMESTAMP,
   isDeleted BOOLEAN DEFAULT 0,
   role INT NOT NULL,
   PRIMARY KEY (id)
) ENGINE=InnoDB CHARSET=utf8;

CREATE TABLE IF NOT EXISTS roles (
   id INT AUTO_INCREMENT NOT NULL,
   name VARCHAR(30) NOT NULL,
   PRIMARY KEY (id)
) ENGINE=InnoDB CHARSET=utf8;

ALTER TABLE users
ADD CONSTRAINT fk_users_roles
FOREIGN KEY (role)
REFERENCES roles(id);

INSERT INTO roles (name) VALUES ('admin'), ('user');

INSERT INTO users (login, password, name, surname, birthDate, role)
   VALUES ('user1', 'password1', 'Jan', 'Kowalski', '2011-01-02', 2),
   ('user2', 'password2', 'Jan', 'Nowak', '2011-01-02', 2);
