const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 

function promptUser(){
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'managerName',
                message: "Enter team manager's name:",
            },
            {
                type: 'input',
                name: 'managerName',
                message: "Enter team manager's name:",
            },
            {
                type: 'input',
                name: 'managerName',
                message: "Enter team manager's name:",
            },
            {
                type: 'input',
                name: 'managerName',
                message: "Enter team manager's name:",
            },


        ])
        .then((managerData) => {
            const manager = new Manager(
                managerData.managerName,
                managerData.managerId,
                managerData.managerEmail,
                managerData.managerPhoneNumber,
            );

           return inquirer.prompt([
            {
                type: 'list',
                name: 'menuChoice',
                message: 'what would you like to do next?',
                choices: ['Add an Engineer', 'Add an Intern', 'Finish building the team'],
            },
           ]); 
        })
        .then((menuChoice) => {
            if (menuChoice.menuChoice === 'Add an Engineer') {
                return inquirer.prompt([
                    {
                        type:'input',
                        name:'engineerName',
                        message: "Enter the engineer's name:", 
                    },
                    {
                        type:'input',
                        name:'engineerId',
                        message: "Enter the engineer's ID:", 
                    },
                    {
                        type:'input',
                        name:'engineerEmail',
                        message: "Enter the engineer's email address:", 
                    },
                    {
                        type:'input',
                        name:'engineerGithub',
                        message: "Enter the engineers Github username:", 
                    },
                ]).then((engineerData) => {
                    const engineer = new Engineer(
                        engineerData.engineerName,
                        engineerData.engineerId,
                        engineerData.engineerEmail,
                        engineerData.engineerGithub,
                    );
                    promptUser();
                });
            } else if (menuChoice.menuChoice === 'Add an Intern') {
                return inquirer.prompt([
                    {
                        type:'input',
                        name:'internName',
                        message: "Enter the intern's name:", 
                    },
                    {
                        type:'input',
                        name:'internId',
                        message: "Enter the intern's Id:", 
                    },
                    {
                        type:'input',
                        name:'internEmail',
                        message: "Enter the intern's email address:", 
                    },
                    {
                        type:'input',
                        name:'engineerSchool',
                        message: "Enter the intern's school:", 
                    },
                ]).then((internData) => {
                    const intern = new Intern(
                        internData.internName,
                        internData.internId,
                        internData.internEmail,
                        internData.internSchool,
                    );

                    promptUser();
                });
            } else {
                generateHTML();
                console.log('Team roster generated succesfully!');
            }
        })
        .catch((error) => {
            console.log('An error occured:', error);
        });
}    
        function generateHTML() {
            const htmlCode = '<html>Your generated HTML code here</html>';
            fs.writeFile('team.html', htmlCode, (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log('HTML file generated successfully!');
              }
            });
          }
          
promptUser(); 