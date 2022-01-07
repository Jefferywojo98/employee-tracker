const mysql = require("mysql2");
const inquirer = require("inquirer");
const confirm = require("inquirer-confirm");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gocubs@16",
  database: "employees_db",
});

// Show inquirer menu
function showmenu() {
  inquirer
    .prompt({
      type: "list",
      message: "Welcome to Jeffery's Employee Tracker. How can I help you?",
      name: "choices",
      choices: [
        {
          name: "Show all employees",
          value: "showEmployees",
        },
        {
          name: "Show all departments",
          value: "showDepartments",
        },
        {
          name: "Show all roles",
          value: "showRoles",
        },
        {
          name: "Adding employee",
          value: "addEmployee",
        },
        {
          name: "Adding department",
          value: "addDepartment",
        },
        {
          name: "Adding role",
          value: "addRole",
        },
        {
          name: "Updating role",
          value: "updatingrole",
        },
        {
          name: "Quit/Terminate",
          value: "quit",
        },
      ],
    })
    .then(function (res) {
      menu(res.choices);
    });
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
  connection.query(
    "SELECT first_name, last_name FROM employee",
    function (err, res) {
      console.table(res);
      endOrMenu();
    }
  );
}

function showAllDepartments() {
  console.log("viewing all the departments");
  connection.query("SELECT * FROM department", function (err, res) {
    console.table(res);
    endOrMenu();
  });
}

function showAllRoles() {
  connection.query("SELECT title FROM roles", function (err, res) {
    console.table(res);
    endOrMenu();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new department name?",
        name: "name",
      },
    ])
    .then(function (response) {
      newDepartment(response);
    });
}

function newDepartment(data) {
  connection.query(
    "INSERT INTO department SET ?",
    { dep_name: data.name },
    function (error, res) {
      if (error) throw error;
    }
  );
  endOrMenu();
}

function addRole() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw (err);
    // console.log(res);
    const fromatResult = []
    res.forEach(department => {
      fromatResult.push({
        name:department.dep_name,
        value: department.dep_id
      })
    });
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the new role name?",
          name: "title",
        },
        {
          type: "input",
          message: "What is the new role salary?",
          name: "salary",
        },
        {
          type: "list",
          message: "Which department the new role in?",
          name: "department_id",
          choices:fromatResult,
        },
      ])
      .then(function (response) {
        console.log(response)
        addNewRole(response);
      });
  });
}

function addNewRole(data) {
  connection.query(
    "INSERT INTO roles SET ?",
    {
      title: data.title,
      salary: data.salary,
      department_id: data.department_id,
    },
    function (error, res) {
      if (error) throw error;
    }
  );
  endOrMenu();
}

function addEmployee() {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw (err);


    const fromatResult = []
    res.forEach(role => {
      fromatResult.push({
        name:role.title,
        value: role.id
      })
    });
    
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is there first name?",
          name: "firstname",
        },
        {
          type: "input",
          message: "What is there last name?",
          name: "lastname",
        },
        {
          type: "input",
          message: "Please enter their manager's ID number",
          name: "managerid",
        },
        {
          type: "list",
          message: "Which is there role in?",
          name: "roleid",
          choices:fromatResult,
        },
      
      ])
      .then(function (response) {
        console.log(response)
        endOrMenu();
        addNewRole(response);
      });
  });
}

function addNewRole(data){
  connection.query(
    "INSERT INTO employee SET ?",
    {
      first_name: data.firstname,
      last_name: data.lastname,
      role_id: data.roleid,
      manager_id: data.managerid,
    },
    function (error, res) {
      if (error) throw error;
    }
  )
  endOrMenu()}

function endOrMenu() {
  confirm("would you like to continue?").then(
    function confirmed() {
      showmenu();
    },
    function cancelled() {
      end();
    }
  );
}

function end() {
  console.log("Thank you for using Jeffery's Employee Tracker!");
  connection.end();
  process.exit();
}
