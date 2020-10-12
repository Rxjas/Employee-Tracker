// Adding in requirements
var fs = require("fs");
var mysql = require("mysql");
var inquirer = require ("inquirer");
var cTable = require ("console.table");

// creating the setup for the connection to the database
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

// Once connecting to DB
connection.connect(function(err){
    if (err) throw err;
    indexMenu();
    console.log("Currently Running on Port 3306");
});

//Menu which we will handle what the user wants
function indexMenu(){
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
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
            case "View All Departments":
                allDepartments(); 
                break;
            
            case "View All Roles":
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
};

function allDepartments(){
    console.log("working1")
    indexMenu();

};

function allRoles(){
    console.log("working88")
    indexMenu();
};

function allEmployees(){
    console.log("working2")
    indexMenu();
};

function addDepartment(){
    console.log("working3")
    indexMenu();
};

function addRole(){
    console.log("working4")
    indexMenu();
};

function addEmployee(){
    console.log("working5")
    indexMenu();
};

function updateEmployeeRole(){
    console.log("working6")
    indexMenu();
};

function removeEmployee(){
    console.log("working7")
    indexMenu();
};

