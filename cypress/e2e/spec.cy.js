import 'cypress-file-upload';

describe('Sample Webpage Testing', () => {
  const apiUrl = 'http://localhost:3000/api';

  beforeEach(() => {
    // Visit the webpage before each test
    cy.visit('http://localhost:8080'); // Replace with the actual URL of your hosted `index.html`
  });
  
  before(() => {
    // Ensure the file upload plugin is available
    Cypress.Commands.add('attachFile', { prevSubject: 'element' }, (subject, fileName) => {
      cy.fixture(fileName).then((content) => {
        const el = subject[0];
        const testFile = new File([content], fileName);
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        el.files = dataTransfer.files;
        cy.wrap(subject).trigger('change', { force: true });
      });
    });
  });
  it('should load the webpage and verify its content', () => {
    cy.contains('Test Page').should('be.visible');
    cy.contains('User Form').should('be.visible');
    cy.contains('To-Do List').should('be.visible');
    cy.contains('File Upload').should('be.visible');
  });

  it('should add a user and display it in the user table', () => {
    // Fill the form
    cy.get('#username').type('Test User');
    cy.get('#email').type('testuser@example.com');
    cy.get('#submitUser').click();

    // Verify success message
    cy.get('#userNotification').should('be.visible');

    // Verify the user appears in the table
    cy.wait(500); // Wait for the table to update
    cy.get('#userTableBody').contains('td', 'Test User').should('be.visible');
    cy.get('#userTableBody').contains('td', 'testuser@example.com').should('be.visible');
  });

  it('should fetch and verify existing users from the API', () => {
    cy.request(`${apiUrl}/users`).then((response) => {
      expect(response.status).to.eq(200);
      response.body.users.forEach((user) => {
        cy.get('#userTableBody').contains('td', user.name).should('be.visible');
        cy.get('#userTableBody').contains('td', user.email).should('be.visible');
      });
    });
  });

  it('should add a new task and verify the task list', () => {
    const newTask = 'Complete Cypress Tests';
    cy.get('#newTask').type(newTask);
    cy.get('#addTask').click();

    // Verify the task appears in the list
    cy.get('#taskList').contains('li', newTask).should('be.visible');
  });

  it('should fetch and verify existing tasks from the API', () => {
    cy.request(`${apiUrl}/tasks`).then((response) => {
      expect(response.status).to.eq(200);
      response.body.tasks.forEach((task) => {
        cy.get('#taskList').contains('li', task).should('be.visible');
      });
    });
  });

  it('should upload a file successfully', () => {
    const fileName = 'sample_file.txt';
    
    // Create a dummy file to upload
    cy.writeFile(`cypress/fixtures/${fileName}`, 'This is a test file.');

    // Upload the file
    cy.get('#fileInput').attachFile(fileName);
    cy.get('#uploadFile').click();

    // Verify success message
    cy.get('#uploadNotification').should('be.visible');
  });
});
