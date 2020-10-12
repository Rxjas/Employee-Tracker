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
    password: "Cr382437!",
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
            "Add A Department",
            "Add A Role",
            "Add Employee",
            "Update An Employee's Role",
            "Remove Employee",
            "EXIT",
        ],
    })
    //What to do once we got an answer
    .then(function(ans){
        switch (ans.action){
            case "View All Employees by Departments":
                allDepartments(); 
                break;
            
            case "View All Employees by Roles":
                allRoles();
                break;

            case "View All Employees":
                allEmployees();
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

            case "Remove Employee":
                removeEmployee();
                break;

            case "EXIT":
                connection.end();
                break;
        };
    });
    pushDepartments();
    pushRoles();
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



//*****Queries for what the user decides to do
function allDepartments(){
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

function allRoles(){
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

function addRole(){
    inquirer.prompt(
    {
        name: "role",
        type: 'input',
        message: "What is the name of the Role you would like to add?"
    },
    {
        name: "salary",
        type: 'input',
        message: "What is the Salary of the Role?"
    },
    {
        name: "role",
        type: 'list',
        message: "What is the name of the Role you would like to add?",
        choices: departmentArr
    }
    )
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

function addEmployee(){
    inquirer.prompt(
    {
        name: "role",
        type: 'input',
        message: "What is the name of the Role you would like to add?"
    },
    {
        name: "salary",
        type: 'input',
        message: "What is the Salary of the Role?"
    },
    {
        name: "department",
        type: 'input',
        message: "What Department is the Role in?"
    }
    )
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

function updateEmployeeRole(){
    console.log("working6")
    indexMenu();
};

function removeEmployee(){
    console.log("working7")
    indexMenu();
};

