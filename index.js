// Adding in requirements
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

function indexMenu(){
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles ",
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
        console.log(ans)
        switch (ans.action){

        };
    });
};

