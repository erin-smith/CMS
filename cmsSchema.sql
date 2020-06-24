
DROP DATABASE IF EXISTS cms_db;

CREATE DATABASE cms_db;


USE cms_db;

CREATE TABLE departments (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE jobs (
 id INTEGER(11) AUTO_INCREMENT NOT NULL,
 title VARCHAR(30) NOT NULL,
 salary DECIMAL(9, 2) NOT NULL,
 department_id INTEGER(6),   
 PRIMARY KEY (id),
 FOREIGN KEY (department_id) REFERENCES departments (id)
);

CREATE TABLE employees (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  job_id INTEGER(6) NOT NULL, 
  manager_id INTEGER(6),  
  PRIMARY KEY (id),
  FOREIGN KEY (job_id) REFERENCES jobs (id),
  FOREIGN KEY (manager_id) REFERENCES employees (id)
);



SELECT * FROM employees;
SELECT * FROM jobs;
SELECT * FROM departments;
