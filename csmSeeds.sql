

INSERT INTO department (department_name)
VALUES ("Payroll"),
("Sales"),
("Engineering"),
("Human Resources"),
 ("Legal"),
("Facilities"),
 ("Recruiting"),
 ("Training");

INSERT INTO job (title, salary, department_id)
VALUES ("CEO", 250000, null),
 ("Salesperson", 14, 2),
 ("Sales Lead", 19, 2),
 ("Software Engineer", 100000, 3),
 ("Lead Engineer", 150000, 3),
 ("Legal Team Lead", 250000, 5),
 ("Lawyer", 180000, 5),
 ("Accountant", 110000, 1);

INSERT INTO employee (first_name, last_name, job_id)
VALUES ("Alyssa Joy", "Smith", 2);



