DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 70000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 50000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 100000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 80000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 120000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 100000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 210000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 200000, 4);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id iNT NOT NULL,
  manager_id VARCHAR(30),
  PRIMARY KEY(id)
);
