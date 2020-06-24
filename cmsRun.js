const connection = require("./server.js");
const { table } = require("ascii-art");

function getDataFrom(tablename) {
    let queryString = "SELECT * FROM " + tablename;
    return await connection.q(queryString);
}

function viewEmpJobs(){
    let queryString = "SELECT jobs.id as 'ID', jobs.title as 'Title', jobs.salary as 'Salary', departments.id as 'Department ID', departments.name as 'Department' FROM jobs INNER JOIN departments ON jobs.departments_id = departments.id";
    connection.q(queryString, function(err, result) {
        if (err) throw err;
        console.log(result);
    });
}

function viewLdrs(){
    let queryString = "SELECT employees.id as 'ID', employees.first_name as 'First Name', employees.last_name as 'Last Name', jobs.id as 'Title ID', jobs.title as 'Title', mgr_id as 'Manager ID', mgr.first_name as 'Manager First Name',mgr.last_name as 'Manager Last Name' FROM employees LEFT JOIN employees ON employees.manager_id = employees.id INNER JOIN jobs ON employees.job_id = jobs.id WHERE employees.manager_id = ?";
    connection.q(queryString, function(err, result) {
        if (err) throw err;
        console.log(result);
    });
} 

function removeEmployee(){
    let queryString = "DELETE FROM employees WHERE id = ?";
    connection.q(queryString, function(err, result) {
    if (err) throw err;
        console.log(result);
    });
} 

function makeEmployee(first_name, last_name, job_id, manager_id){
    let queryString = "INSERT INTO employees SET ?";
    connection.q(queryString [(first_name, last_name, job_id, manager_id)], function(err, result) {
    if (err) throw err;
        console.log(result);
    });
} 

// updates employee's role/title
function changeJob(){
    // query the db to get list of employee names
    const employeesRaw = getDataFrom("employee");
    let listOfEmployees = [];   // "Erin Smith (12345)", "Honza (456677)"

    // query the db to get list of the role names
    let listOfRoles = getDataFrom("job");
    
    // 
    const worker = await inquirer.prompt([
       { name: "person",
        type: "list",
        message: "Which employee do you want to update?",
        choices: listOfEmployees  //how do i get this table to populate and work
    },
    {
        name: "newJob",
        type: "list",
        message: "What is the employee's new role?",
        choices: listOfRoles
    }
])
let queryString = "UPDATE employees SET ? WHERE id = ?";
connection.q(queryString,[(worker.newJob, worker.person.id)], function(err, result) {
    if (err) throw err;
    console.log(result);
  });
} 
function changeMgr();
function makeDept(){
let queryString = "INSERT INTO departments SET ?";
connection.q(queryString, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
} 
function makeJob(){
let queryString = "INSERT INTO jobs SET ?";
connection.q(queryString, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
} 
function removeDept(){
let queryString= "DELETE FROM departments WHERE id = ?";
connection.q(queryString, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
} 
function removeJob(){
let queryString= "DELETE FROM jobs WHERE id = ?";
connection.q(queryString, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
} 
function sumDept$alaries(){
let queryString ="SELECT SUM(salary) FROM employees INNER JOIN jobs ON jobs.id = employees.job_id";
connection.q(queryString, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
};