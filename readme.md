# Employee Tracker
By: Jeffery Wojciechowski

![mit](https://img.shields.io/badge/license-MIT-brightgreen)


## User Story
___
```
AS the business owner
you WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT you can organize and plan my business
```


## Acceptance Criteria
___

```
IVEN a command-line application that accepts user input
WHEN you start the application
THEN you are presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN you choose to view all departments
THEN you am presented with a formatted table showing department names and department ids
WHEN you choose to view all roles
THEN you am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN you choose to view all employees
THEN you are presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN you choose to add a department
THEN you are prompted to enter the name of the department and that department is added to the database
WHEN you choose to add a role
THEN you are prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN you choose to add an employee
THEN you are prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN you choose to update an employee role
THEN you are prompted to select an employee to update and their new role and this information is updated in the database 
```

## Table of Contents
---

* [Technology Used](#technology-used)
* [Installation](#installation)
* [Links](#links)
* [Screenshots/Video](#Screenshots/Videos)
* [Usage](#usage)
* [Questions](#questions)
* [License](#License)

## Technology Used
___
SQL

## Installation

1. Users will need to use `git clone` to clone this repo into their local drive. 

2. Then they will need to run `npm i` in their command line to install the `node_modules` folder necessary for this application.

## Links
___
- [GitHub Repository](https://github.com/Jefferywojo98/employee-tracker)
## Screenshots/Videos
___
![employeetrackermenu](https://user-images.githubusercontent.com/87153472/148503255-b7027362-6548-49f7-8bfd-d9e029692d5b.png)
[Walkthough Video](https://watch.screencastify.com/v/cNvzLPripDTvV0BzDDyf)


## Usage
___

After the installation process, users will then need to run node index.js.

They will then be presented with the database welcome screen and a menu to view, add, or edit the database.


## Questions
___

If you have any questions about the repo you can open an issue on my [Github](https://github.com/Jefferywojo98/Note-Taking/issues)

## License
___

Copyright (c) 2021 Jeffery Wojciechowski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
