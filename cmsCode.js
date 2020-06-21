const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "p@ssw0rd1",
  database: "cms_DB"
});

connection.connect(err =>
    {
    if (err) throw err;
    promptUser();
  });
  
  function promptUser() {
    inquirer
      .prompt({
       name: "action",
       type: "list",
       message: "What action would you like to make in the Management System?",
       choices: ["VIEW", "UPDATE", "ADD", "DELETE"]
    })
    .then(function(answer) {
       
        if (answer.action === "VIEW") {
          viewData();
        }
        if (answer.action === "UPDATE") {
          updateData();
        }
        if (answer.action === "ADD") {
           addData();
        }
        else if(answer.action === "DELETE") {
          deleteData();
        } 
        else{
          connection.end();
        }
      });
  }