const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

let teamMembers = [];

function promptUser() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'managerName',
        message: "Enter team manager's name:",
      },
      {
        type: 'input',
        name: 'managerId',
        message: "Enter team manager's ID:",
      },
      {
        type: 'input',
        name: 'managerEmail',
        message: "Enter team manager's email address:",
      },
      {
        type: 'input',
        name: 'managerPhoneNumber',
        message: "Enter team manager's phone number:",
      },
    ])
    .then((managerData) => {
      const manager = new Manager(
        managerData.managerName,
        managerData.managerId,
        managerData.managerEmail,
        managerData.managerPhoneNumber
      );

      teamMembers.push(manager);

      displayMenu();
    })
    .catch((error) => {
      console.log('An error occurred:', error);
    });
}

function addEngineer() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'engineerName',
        message: "Enter the engineer's name:",
      },
      {
        type: 'input',
        name: 'engineerId',
        message: "Enter the engineer's ID:",
      },
      {
        type: 'input',
        name: 'engineerEmail',
        message: "Enter the engineer's email address:",
      },
      {
        type: 'input',
        name: 'engineerGithub',
        message: "Enter the engineer's GitHub username:",
      },
    ])
    .then((engineerData) => {
      const engineer = new Engineer(
        engineerData.engineerName,
        engineerData.engineerId,
        engineerData.engineerEmail,
        engineerData.engineerGithub
      );
      teamMembers.push(engineer);

      displayMenu();
    })
    .catch((error) => {
      console.log('An error occurred:', error);
    });
}

function addIntern() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'internName',
        message: "Enter the intern's name:",
      },
      {
        type: 'input',
        name: 'internId',
        message: "Enter the intern's ID:",
      },
      {
        type: 'input',
        name: 'internEmail',
        message: "Enter the intern's email address:",
      },
      {
        type: 'input',
        name: 'internSchool',
        message: "Enter the intern's school:",
      },
    ])
    .then((internData) => {
      const intern = new Intern(
        internData.internName,
        internData.internId,
        internData.internEmail,
        internData.internSchool
      );

      teamMembers.push(intern);

      displayMenu();
    })
    .catch((error) => {
      console.log('An error occurred:', error);
    });
}

function displayMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'menuChoice',
        message: 'What would you like to do next?',
        choices: ['Add an Engineer', 'Add an Intern', 'Finish building the team'],
      },
    ])
    .then((menuChoice) => {
      if (menuChoice.menuChoice === 'Add an Engineer') {
        addEngineer();
      } else if (menuChoice.menuChoice === 'Add an Intern') {
        addIntern();
      } else {
        generateHTML(teamMembers);
        console.log('Team roster generated successfully!');
      }
    })
    .catch((error) => {
      console.log('An error occurred:', error);
    });
}

function generateHTML(teamMembers) {
  let htmlCode =
    `<!DOCTYPE html>
    <html>
    <head>
      <title>Team Roster</title>
      <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        padding: 20px;
        margin: 0;
      }
      
      .header {
        text-align: center;
        background-color: blue;
        margin-bottom: 30px;
        padding: 30px 0;
      }
      
      h1 {
        color: rgb(241, 240, 249);
        background-color: blue;
        margin-bottom: 20px;
        padding: 20px;
        width: 97%;
        text-align: center;
        margin-top: 0;
      }
      
      #cards-wrapper {
            margin-left: 10px;
          }
      #team-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 20px;
      }
      
      .card {
        background-color: white;
        border-radius: 5px;
        padding: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .card-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
        text-align: center;
      }
      
      .card-body {
        margin-bottom: 10px;
      }
      </style>
      </head>
      <body>
        <h1>Team Roster</h1>
        <section id="team-cards">
          ${generateTeamCardsHTML(teamMembers)}
        </section>
      </body>
    </html>`;

  fs.writeFile('team.html', htmlCode, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('HTML file generated successfully!');
    }
  });
}

function generateTeamCardsHTML(teamMembers) {
  let html = '';

  for (const member of teamMembers) {
    html += `
      <div class="card">
        <div class="card-title">${member.getName()} - ${member.constructor.name}</div>
        <ul class="card-body">
          <li><strong>ID:</strong> ${member.getId()}</li>
          <li><strong>Email:</strong> ${member.getEmail()}</li>
          ${getRoleSpecificInfo(member)}
        </ul>
      </div>
    `;
  }

  return html;
}

function getRoleSpecificInfo(member) {
  if (member instanceof Manager) {
    return `<li><strong>Phone Number:</strong> ${member.getPhoneNumber()}</li>`;
  } else if (member instanceof Engineer) {
    return `<li><strong>GitHub:</strong> ${member.getGithub()}</li>`;
  } else if (member instanceof Intern) {
    return `<li><strong>School:</strong> ${member.getSchool()}</li>`;
  }

  return '';
}

promptUser();
