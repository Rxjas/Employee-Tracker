// Adding in requirements
var fs = require("fs");
var mysql = require("mysql");
var inquirer = require ("inquirer");
var cTable = require ("console.table");

//Arrays to push the roles, employees and departments
var departmentArr = [];
var roleArr = [];
var employeeArr = [];

//* creating the setup for the connection to the database
var connection = mysql.createConnection({
    host:"localhost",

    //the port to the DB
    port: 3306,

    // username
    user: "root",

    //password into the DB
    password: "Oops123!",
    database: "myEmployees_DB"
});

// **Once connecting to DB
connection.connect(function(err){
    if (err) throw err;
    indexMenu();
    console.log("Currently Running on Port 3306");
});



//***Menu which we will handle what the user wants
function indexMenu(){
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees by Departments",
            "View All Employees by Roles",
            "View All Employees",
            "View All Roles",
            "View All Departments",
            "Add A Department",
            "Add A Role",
            "Add Employee",
            "Update An Employee's Role",
            "EXIT",
        ],
    })
    //What to do once we got an answer
    .then(function(ans){
        switch (ans.action){
            case "View All Employees by Departments":
                employeeByDepartment(); 
                break;
            
            case "View All Employees by Roles":
                employeeByRole();
                break;

            case "View All Employees":
                allEmployees();
                break;
            
            case "View All Roles":
                allRoles();
                break;

            case "View All Departments":
                allDepartments();
                break;

            case "Add A Department":
                addDepartment();
                break;

            case "Add A Role":
                addRole();
                break;
            
            case "Add Employee":
                addEmployee();
                break;

            case "Update An Employee's Role":
                updateEmployeeRole();
                break;

            case "EXIT":
                connection.end();
                break;
        };
    });
    pushDepartments();
    pushRoles();
    pushEmployees();
};

//****functions to get information on databases and push to arrays for later
function pushDepartments(){
    connection.query("SELECT name FROM myemployees_db.department",function(err, res){
        if (err) throw err
        //Must empty the array everytime so as to update it
        departmentArr = [];
        for (var i = 0; i < res.length; i++){
            departmentArr.push(res[i].name);
        }
    });
};

function pushRoles(){
    connection.query("SELECT title FROM myemployees_db.role",function(err, res){
        if (err) throw err
        roleArr = [];
        for (var i = 0; i < res.length; i++){
            roleArr.push(res[i].title);
        }
    });
};

function pushEmployees(){
    connection.query("SELECT CONCAT(employee.first_name,' ',employee.last_name) AS name FROM myemployees_db.employee",function(err, res){
        if (err) throw err
        employeeArr = [];
        for (var i = 0; i < res.length; i++){
            employeeArr.push(res[i].name);
        }
    });
};



//*****Queries for what the user decides to do
function employeeByDepartment(){
    var query = "SELECT employee.employee_id, employee.first_name,employee.last_name, role.title, department.name "
    query += "FROM myemployees_db.employee "
    query += "INNER JOIN role ON (employee.role_id = role.role_id) "
    query += "INNER JOIN department ON (role.role_id = department.department_id) "
    query += "ORDER BY department.name";
    connection.query(query, function(err, res) {
      if (err) throw err;
        console.table(res)
        indexMenu();
    });
};

function employeeByRole(){
    var query = "SELECT employee.employee_id, employee.first_name,employee.last_name, role.title, department.name "
    query += "FROM myemployees_db.employee "
    query += "INNER JOIN role ON (employee.role_id = role.role_id) "
    query += "INNER JOIN department ON (role.role_id = department.department_id) "
    query += "ORDER BY  role.title";
    connection.query(query, function(err, res) {
      if (err) throw err;
        console.table(res)
        indexMenu();
    });
};

//add departments and such-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
function allEmployees(){
    var query = "SELECT employee.employee_id, employee.first_name,employee.last_name, role.title, department.name "
    query += "FROM myemployees_db.employee INNER JOIN role ON (employee.role_id = role.role_id) "
    query += "INNER JOIN department ON (role.role_id = department.department_id) "
    query += "ORDER BY employee.employee_id";
    connection.query(query, function(err, res) {
      if (err) throw err;
        console.table(res)
        indexMenu();
    });
};

function allRoles(){
    var query = "SELECT title, salary, name FROM myemployees_db.role INNER JOIN myemployees_db.department ON (role.role_id = department.department_id)";
    connection.query(query, function (err, res){
        if(err) throw err
        console.table(res)
        indexMenu();
    });
};

function allDepartments(){
    var query = "SELECT name FROM myemployees_db.department";
    connection.query(query, function (err, res){
        if(err) throw err
        console.table(res)
        indexMenu();
    });
};

function addDepartment(){
    inquirer.prompt({
        name: "department",
        type: 'input',
        message: "What is the name of the Department you would like to add?"
    })
    .then(function(data){
        var query = "INSERT INTO department (name)"
        query += "VALUES (?)";
        connection.query(query, data.department, function(err, res) {
          if (err) throw err;
            console.log("Department Successfully Added!")
            indexMenu();
        });
    });

};

//When adding the role 2 queries must be made in order to allow the user to 
//choose the department via list
function addRole(){
    //query so The function is able to match the user choice to the id of role
    var query = "SELECT * FROM myemployees_db.department";
    connection.query(query, function(err,res){
        inquirer.prompt([{
            name: "title",
            type: "input",
            message: "What is the Title of the Role?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the Salary of this Role?"
        },
        {
            name: "department",
            type: "list",
            message: "What Department is the Role in?",
            choices: departmentArr
        },
        ])
        .then(function(data){
           let departmentID = null;
           //Loop to check matching id and departments
           for(let i = 0; i < res.length; i++){
                if(res[i].name == data.department){
                    departmentID = res[i].department_id;
                }
           }
           //Query to insert the info into the DB
           connection.query("INSERT INTO role (title, salary, department_id) VALUES(?,?,?)",
           [data.title, data.salary, departmentID], 
           function (err, res){
               if (err) throw err
               indexMenu();
            }
           )
        });

   }); 
};

function addEmployee(){
    //query so The function is able to match the user choice to the id of role
    var query = "SELECT * FROM myemployees_db.role";
    connection.query(query, function(err,res){
        inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "What is the First Name of the New Employee?"
        },
        {
            name: "lastname",
            type: "input",
            message: "What is the Last Name of the New Employee?"
        },
        {
            name: "job",
            type: "list",
            message: "What is the Role of the New Employee?",
            choices: roleArr
        }
        // {
        //     name: "manager",
        //     type: "input",
        //     message: "What is the Role of the New Employee?",
        //     choices: roleArr
        // },
        ])
        .then(function(data){
           let roleID = null;
           //Loop to check matching id and roles
           for(let i = 0; i < res.length; i++){
                if(res[i].title == data.job){
                    roleID = res[i].role_id;
                }
           }
           //Query to insert the info into the DB
           connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES(?,?,?)",
           [data.firstname, data.lastname, roleID], 
           function (err, res){
               if (err) throw err
               indexMenu();
            }
           )
        });

   });
};

function updateEmployeeRole(){
    connection.query("SELECT * FROM myemployees_db.role", function(err,res1){
        inquirer.prompt([
            {
                name: "person",
                type: "list",
                message: "Which Employee would you like to Update?",
                choices: employeeArr
            },
            {
                name: "job",
                type: "list",
                message: "What is the Employee's new Role?",
                choices: roleArr
            },
        ])
        .then(function(data){
            let roleID = null;
            for (let b = 0; b < roleArr.length; b++){
                if(res1[b].title = data.job){
                    roleID = res1[b].role_id;
                }
            }
                //second query to update the info3
                var query = "UPDATE employee SET role_id = ? " 
                query += "WHERE employee_id = (SELECT employee_id FROM " 
                query += "(SELECT employee_id FROM employee WHERE CONCAT(first_name,' ',last_name) = ? )AS NAME)"
                connection.query(query, 
                    [roleID, data.person], 
                    function(err,res){
                    if (err) throw err
                    indexMenu();
                })
        });
    });
};



