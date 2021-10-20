const inquirer = require("inquirer")
const mysql = require("mysql")
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerDataBase"
  });

connection.connect(function(err) {
    if (err) throw err
    console.log("Connecting Id" + connection.threadId)
    startPrompt();
});
//main menu
function startPrompt() {
    inquirer.prompt([
    {
    type: "list",
    message: "how can I help you today?",
    name: "choice",
    choices: [
              "Show All Employees?", 
              "Show All Employee Roles?",
              "Show all Emplyees Deparments", 
              "Adding Employee?",
              "Updating Employee",
              "Adding Role?",
              "Adding Department?"
            ]
    }
]).then(function(val) {
        switch (val.choice) {
            case "Show All Employees?":
              showingAllEmployees();
            break;
    
          case "Show All Employee's By Roles?":
              showingAllRoles();
            break;
          case "Show all Emplyees By Deparments":
              showingAllDepartments();
            break;
          
          case "Adding Employee?":
                addingEmployee();
              break;

          case "Updating Employee":
                updatingEmployee();
              break;
      
            case "Adding Role?":
                addingRole();
              break;
      
            case "Adding Department?":
                addingDepartment();
              break;
    
            }
    })
}
//showing all employee
function showingAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
}
//showing all roles
function showingAllRoles() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
  function(err, res) {
  if (err) throw err
  console.table(res)
  startPrompt()
  })
}
//showing employee by there department
function showingAllDepartments() {
  connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
  })
}

//slecting the role for the new Employee 
var roleArr = [];
function selectingRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
}
//Selecting The Managers for new Employee
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
//Adding new Employee 
function addingEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "please enter the first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Please enter the last name "
        },
        {
          name: "role",
          type: "list",
          message: "What role are they going to be? ",
          choices: selectingRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "What is the managers name?",
            choices: selectingManager()
        }
    ]).then(function (val) {
      var roleId = selectingRole().indexOf(val.role) + 1
      var managerId = selectingManager().indexOf(val.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(val)
          startPrompt()
      })

  })
}
//Updating new Employee
  function updatingEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
    // console.log(res)
     if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the employee last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the employees new title? ",
            choices: selectingRole()
          },
      ]).then(function(val) {
        var roleId = selectingRole().indexOf(val.role) + 1
        connection.query("UPDATE employee SET WHERE ?", 
        {
          last_name: val.lastName
        }, 
        {
          role_id: roleId
        }, 
        function(err){
            if (err) throw err
            console.table(val)
            startPrompt()
        })
    });
  });
  }
//============= Add Employee Role ==========================//
function addingRole() { 
  connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
    inquirer.prompt([
        {
          name: "Title",
          type: "input",
          message: "What is the roles Title?"
        },
        {
          name: "Salary",
          type: "input",
          message: "What is the Salary?"

        } 
    ]).then(function(res) {
        connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )

    });
  });
  }
//adding  department
function addingDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
    })
  }
