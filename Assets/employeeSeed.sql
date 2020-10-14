-- creating the database and table
DROP DATABASE IF EXISTS myEmployees_DB;

CREATE DATABASE myEmployees_DB;

USE myEmployees_DB;

CREATE TABLE department (
    department_id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NULL,
    PRIMARY KEY(department_id)
);

CREATE TABLE role (
    role_id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    department_id INT,
    PRIMARY KEY (role_id),
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
);

CREATE TABLE employee (
    employee_id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY(employee_id),
    FOREIGN KEY (role_id) REFERENCES role (role_id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee (employee_id) ON DELETE CASCADE
);

-- Test inserts
INSERT INTO department (name)
VALUES ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 50000, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1);

-- Test inserts
INSERT INTO department (name)
VALUES ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 55000, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jane", "Blue", 2);

-- Test inserts
INSERT INTO department (name)
VALUES ("Public Relations");

INSERT INTO role (title, salary, department_id)
VALUES ("Represenative", 70000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Caleb", "Red", 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Connor", "Reed", 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Cob", "Reeps", 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Haley", "Reeps", 1);

SELECT CONCAT(employee.first_name, ' ' ,  employee.last_name) AS Name FROM employee;

UPDATE employee SET role_id = 1 WHERE employee_id = (SELECT employee_id FROM (SELECT employee_id FROM employee WHERE CONCAT(first_name," ",last_name) = "Jane Blue")AS NAME);

SELECT employee.employee_id, employee.first_name,employee.last_name, role.title, department.name
FROM employee
INNER JOIN role ON (employee.role_id = role.role_id)
INNER JOIN department ON (role.role_id = department.department_id)
ORDER BY department.name;