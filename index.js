const mysql = require("mysql2");
const inquirer = require("inquirer");
const confirm = require('inquirer-confirm');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gocubs@16",
  database: "employees_db"
},
);

// Show inquirer menu
function showmenu() {
  inquirer.prompt(
      {
        type: "list",
        message: "Welcome to Jeffery's Employee Tracker. How can I help you?",
        name: "choices",
        choices: [
          {
            name: "Show all employees",
            value: "showEmployees"
          },
          {
            name: "Show all departments",
            value: "showDepartments"
          },
          {
            name: "Show all roles",
            value: "showRoles"
          },
          {
            name: "Adding employee",
            value: "addEmployee"
          },
          {
            name: "Adding department",
            value: "addDepartment"
          },
          {
            name: "Adding role",
            value: "addRole"
          },
          {
            name: "Updating role",
            value: "updatingrole"
          },
          {
            name: "Quit/Terminate",
            value: "quit"
          }
        ]
      }).then(function (res) {
      menu(res.choices)
    })
}
function menu(option) {
  switch (option) {
    case "showEmployees":
      showAllEmployees();
      break;
    case "showDepartments":
      showAllDepartments();
      break;
    case "showRoles":
      showAllRoles();
      break;
    case "addEmployee":
      addEmployee();
      break;
    case "addDepartment":
      addDepartment();
      break;
    case "addRole":
      addRole();
      break;
    case "updatingrole":
      updatingrole();
      break;
    case "quit":
      end();
  }
}
  showmenu();




function showAllEmployees() {
  connection.query("SELECT first_name, last_name FROM employee", function (res) {
    console.table(res);
    endOrMenu();
  })
}

function showAllDepartments() {
  console.log("viewing all the departments")
  connection.query("SELECT * FROM department", function (res) {
    console.table(res);
    endOrMenu();
  })
}

function showAllRoles() {
  connection.query("SELECT title FROM roles", function (res) {
    console.table(res);
    endOrMenu();
  })
}

var roleArr = [];
function selectingRoles() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
}
var managersArr = [];
function selectingManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }
  })
  return managersArr;
}

// Ask the user for the employee's information.
function addEmployee() {
  inquirer.prompt([
      {
        name: "firstName",
        type: 'input',
        message: "What is their first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is their last name?",
      },
      {
        name: "title",
        type: "list",
        message: "What is their employee role?",
        choices: selectingRoles(),
      },
      {
        name: "manager",
        type: "list",
        message: "Who is the employee manager?",
        choices: selectingManager(),
      }
    ]).then(function (data) {
      var roleID = selectingRoles().indexOf(data.role) + 1
      var managerID = selectingRoles().indexOf(data.choice) + 1
        connection.query("INSERT INTO employee SET ?",
          {
            first_name: data.firstName,
            last_name: data.lastName,
            role_id: data.title,
            manager_id: managerID,
            role_id: roleID

          }, function (err) {
            if (error) throw error;
          })
          endOrMenu();
    })
}


function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "name of the new department?",
      }
    ]).then(function (data) {
      connection.query("INSERT INTO department SET ?",{name: res.name},
      function(err){
        if(err) throw err
        console.table(res);
        endOrMenu();
      }
      )
    })
}


function addRole() {
  connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role")  
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "name of the new employee role?",
      },
      {
        name: "salary",
        type: "input",
        message: "How much is the salary for the new role?",
      },
      {
        name: "id",
        type: "list",
        message: "what department is this new role going to?",
        choices: showingdepartments
      }
    ])
    .then(function (response) {
      addEmployeeRole(response);
    })
}

function addEmployeeRole(data) {
  connection.query("INSERT INTO role SET ?", {
    title: data.title,
    salary: data.salary,
    department_id: data.id
  }, function (err) {

    if (error) throw err;
  });
  endOrMenu();
}

function updatingrole() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "what employee would you like to update?",
        name: "empID",
        choices: showingemployees
      },
      {
        type: "list",
        message: "What the employee's new role?",
        name: "titleID",
        choices: showingroles
      }
    ])
    .then(function (response) {
      updateEmployeeRole(response);
    })
}

function updateEmployeeRole(data) {
  connection.query(`UPDATE employee SET role_id = ${data.titleID} WHERE id = ${data.empID}`,
  function (error, res) {
    if (error) throw error;
  });
  endOrMenu();
}

function endOrMenu() {
  confirm("would you like to continue?")
  .then(function confirmed() {
    showmenu();
  }, function cancelled() {
    end();
  });
}

function end() {
  console.log("Thank you for using Jeffery's Employee Tracker!");
  connection.end();
  process.exit();
}