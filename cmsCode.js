const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require('console.table');
const connection = require('./server.js');

// Gets all data from a db table
async function getAllDataFrom (tablename)
{
  let queryString = "SELECT * FROM " + tablename;
  return connection.q(queryString);
}

// Formats sql query item into a choice item
function formatEmployeeChoice (rawData)
{
  return {
    name: `${rawData.first_name} ${rawData.last_name} (${rawData.id})`,
    value: {
      id: rawData.id
    }
  }
}

// Formats sql query item into a choice item
function formatJobChoice (rawData)
{
  return {
    name: `${rawData.title}`,
    value: {
      id: rawData.id
    }
  }
}

// Formats sql query item into a choice item
function formatDeptChoice (rawData)
{
  return {
    name: `${rawData.department_name}`,
    value: {
      id: rawData.id
    }
  }
}

// Gets all available items as a list of choices for inquirer
// returns selected id
async function getChoicesFromDb (tableName, formatFn)
{
  const rawData = await getAllDataFrom(tableName);
  let myChoices = [];
  rawData.forEach(element =>
  {
    myChoices.push(formatFn(element));
  });
  return myChoices;
}

async function main ()
{
  await connection.c();
  displayMenu();
}

// prints all data from a table into the console
async function printAllFrom (tableName)
{
  const data = await getAllDataFrom(tableName);
  console.table(data);
};

// ask the user to choose a role
// return Job id
async function promptForRole (query)
{
  const myJob = await getChoicesFromDb("jobs", formatJobChoice);
  const job = await inquirer.prompt({
    name: "choice",
    type: "list",
    message: query,
    choices: myJob
  });
  return job.choice.id;
}

// ask the user to choose a department
// renturn department id
async function promptForDepartment ()
{
  const myDept = await getChoicesFromDb("departments", formatDeptChoice);
  const dept = await inquirer.prompt({
    name: "choice",
    type: "list",
    message: "Which department would you like to view?",
    choices: myDept
  });
  return dept.choice.id;
}
// ask the user to choose a employee
// return employee id
async function promptForEmployee (question)
{
  const worker = await getChoicesFromDb("employees", formatEmployeeChoice);
  const Emp = await inquirer.prompt({
    name: "person",
    type: "list",
    message: question,
    choices: worker
  });
  return Emp.person.id;
}

async function promptForText (question)
{
  const text = await inquirer.prompt({
    name: "value",
    type: "input",
    message: question
  });
  return text.value;
}

async function promptForSalary ()
{
  const money = await inquirer.prompt({
    name: "value",
    type: "number",
    message: "What is the salary?",  //check for number
    validate: function (input)
    {
      //todo: validate that the 'input' is a number
      return true;
    }
  });
  return money.value;
}

// prints all employee names from a department into the console
async function printEmployeesFrom (departmentId)
{
  // select * from employees 
  const queryString = "SELECT * FROM employees LEFT JOIN jobs ON employees.job_id = jobs.id WHERE ?";
  const result = await connection.q(queryString, { department_id: departmentId });
  console.table(result);
}

async function printEmployeesManagedBy (managerId)
{
  const queryString = "SELECT * FROM employees WHERE ?";
  const result = await connection.q(queryString, { manager_id: managerId });
  console.table(result);
}

async function updateRole (empId, jobId)
{
  const queryString = "UPDATE employees SET ? WHERE ?";
  const result = await connection.q(queryString, [{ job_id: jobId }, { id: empId }]);
}

async function updateManager (empId, mgrId)
{
  const queryString = "UPDATE employees SET ? WHERE ?";
  const result = await connection.q(queryString, [{ manager_id: mgrId }, { id: empId }]);
}

async function removeByIdFrom (tableName, id)
{
  try {
    const queryString = `DELETE FROM ${tableName} WHERE ?`;
    const result = await connection.q(queryString, { id: id });
  }
  catch {
    console.log("Unable to remove item in use");
  }

}

async function printUtilizedBudgetOf (departmentId)
{
  const queryString = "SELECT SUM(salary) as budget FROM employees LEFT JOIN jobs ON employees.job_id = jobs.id WHERE ?";
  const result = await connection.q(queryString, { department_id: departmentId });
  console.table(result);
}

async function createNewRole (title, salary, deptId)
{
  const queryString = "INSERT INTO jobs SET ?";
  await connection.q(queryString, { 
    title: title,
    salary: salary,
    department_id: deptId 
  });
}

async function createNewDepartment (name)
{
  const queryString = "INSERT INTO departments SET ?";
  await connection.q(queryString, { department_name: name });
}

async function createNewEmployee (fstname, lstname, jobid, mgrid)
{
  const queryString = "INSERT INTO employees SET ?";
  await connection.q(queryString, { 
    first_name: fstname,
    last_name: lstname,
    job_id: jobid,
    manager_id: mgrid
  });
}

async function displayMenu ()
{
  const answer = await inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all employees",
      "View all roles",
      "View all departments",
      "View all employees by department",
      "View all employees by manager", 
      "Remove an employee",
      "Add an employee",
      "Update an employee's role",
      "Update an employee's manager", 
      "Add a new department",
      "Add a new role",
      "Delete an existing department",
      "Delete an existing role", 
      "View the utilized budget of a department", 
      "Exit"
    ]
  });

  console.log(`You want to ${answer.action}`);
  switch (answer.action) {
    case "View all employees":
      await printAllFrom("employees");
      break;

    case "View all roles":
      await printAllFrom("jobs");
      break;

    case "View all departments":
      await printAllFrom("departments");
      break;

    case "View all employees by department":
      const departmentId = await promptForDepartment();
      await printEmployeesFrom(departmentId);
      break;

    case "View all employees by manager":
      {
        const id = await promptForEmployee("Which manager's employees would you like to view?");
        await printEmployeesManagedBy(id);
      }
      break;

    case "Remove an employee":
      {
        const id = await promptForEmployee("Who are we firing today?");
        await removeByIdFrom("employees", id);
      }
      break;

    case "Add an employee":
      {
        const firstName = await promptForText("First Name");
        const lastName = await promptForText("Last Name");
        const roleId = await promptForRole("What is the employee Role?");
        const mgrId = await promptForEmployee("who's the manager?");
        await createNewEmployee(firstName, lastName, roleId, mgrId);
      }
      break;

    case "Update an employee's role":
      {
        const id = await promptForEmployee("Who are we updating?");
        const job = await promptForRole("What is the new role?");
        await updateRole(id, job);
      }
      break;

    case "Update an employee's manager":
      {
        const empId = await promptForEmployee("Who is the employee?");
        const mgrId = await promptForEmployee("Who is the new manager?");
        await updateManager(empId, mgrId);
      }
      break;

    case "Add a new department":
      {
        const name = await promptForText("Department Name");
        await createNewDepartment(name);
      }
      break;

    case "Add a new role":
      {
        const title = await promptForText("Title");
        const salary = await promptForSalary();
        const deptId = await promptForDepartment();
        await createNewRole(title, salary, deptId);
      }
      break;

    case "Delete an existing department":
      {
        const id = await promptForDepartment();
        await removeByIdFrom("departments", id);
      }
      break;

    case "Delete an existing role":
      {
        const id = await promptForRole("What role/job are you deleting?");
        await removeByIdFrom("jobs", id);
      }
      break;

    case "View the utilized budget of a department":
      {
        const id = await promptForDepartment();
        await printUtilizedBudgetOf(id);
      }
      break;

    case "Exit":
      {
        connection.end();
        console.log("Bye!");
        return;
      }
      break;

    default:
      {
        console.log(answer.action + " <<< (!) not handled in the switch (!)");
        return;
      }
  }
  displayMenu();
}

main();