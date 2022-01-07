INSERT INTO department (dep_id, dep_name)
VALUES (1, "Sales"), (2, "Engineering"), (3, "Legal"), (4, "Finance");


INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Sales Lead", 80000, 1), 
(2, "Salesperson", 50000, 1), 
(3, "Lead Engineer", 120000, 2), 
(4, "Software Engineer", 95000, 2), 
(5, "Legal Team Lead", 150000, 3), 
(6, "Lawyer", 100000, 3),
(7, "Account Mangager", 105000, 4), 
(8, "Accountant", 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Nick", "Thebestmanagerever", 3, null),
 ("Sadie", "Sial", 4, 1), 
 ("Rick", "Roll", 1, null), 
("Chuck", "Norris", 2, 3), 
("Chris", "Basse", 5, null), 
("Richard", "Weagner", 6, 5); 
