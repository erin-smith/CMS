


INSERT INTO departments (department_name)
VALUES ("Payroll"),
("Sales"),
("Engineering"),
("Human Resources"),
 ("Legal"),
("Facilities"),
 ("Recruiting"),
 ("Training");

INSERT INTO jobs (title, salary, department_id)
VALUES ("CEO", 250000, null),
 ("Salesperson", 14, 2),
 ("Sales Lead", 19, 2),
 ("Software Engineer", 100000, 3),
 ("Lead Engineer", 150000, 3),
 ("Legal Team Lead", 250000, 5),
 ("Lawyer", 180000, 5),
 ("Accountant", 110000, 1);

INSERT INTO employees (first_name, last_name, job_id, manager_id)
VALUES ("Erin", "Smith", 1, null),
("Alyssa Joy", "Smith", 2, 1),
("Bobek", "Gersl", 5, 1),
 ("Johnny", "Li", 3, 2),
 ("Tony", "Houck", 2, 2),
 ("jane", "Smith", 1, 3),
 ("Gary", "Files", 8, 3);




