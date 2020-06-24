--View all employees, departments, roles
SELECT * FROM ??

--View all employees by department
SELECT first_name, last_name, job_id, manager_id 
FROM employees
LEFT JOIN departments ON employee.job_id = departments.id

--View all employees by manager
SELECT first_name, last_name, job_id 
FROM employees
INNER JOIN employees ON manager_id = employees.id

--Add employee
INSERT INTO employees (first_name, last_name, job_id, manager_id)
VALUES (`${}`,`${}`,`${}`, `${}`);

--Updates employee
UPDATE employees SET ?? WHERE first_name = ?? and last_name = ??


--Deletes employee
DELETE FROM employees WHERE ??
