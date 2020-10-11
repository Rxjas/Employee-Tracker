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
connection.connect((err) => {
    if (err) throw err;
    console.log("Currently Running on Port 3306");
});

