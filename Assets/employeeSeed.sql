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