import 'cypress-file-upload';

describe('API Testing', () => {
    const apiUrl = 'http://localhost:3000/api';

    it('should fetch users successfully', () => {
        cy.request(`${apiUrl}/users`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('users');
            expect(response.body.users).to.be.an('array');
        });
    });

    it('should add a new user successfully', () => {
        const newUser = { name: 'New User', email: 'new.user@example.com' };
        cy.request('POST', `${apiUrl}/users`, newUser).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
            expect(response.body.name).to.eq(newUser.name);
            expect(response.body.email).to.eq(newUser.email);
        });
    });

    it('should fetch tasks successfully', () => {
        cy.request(`${apiUrl}/tasks`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('tasks');
            expect(response.body.tasks).to.be.an('array');
        });
    });

    it('should add a new task successfully', () => {
        const newTask = { task: 'New Task' };
        cy.request('POST', `${apiUrl}/tasks`, newTask).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.task).to.eq(newTask.task);
        });
    });

    it('should upload a file successfully', () => {
        const fileName = 'sample_file.txt';
        cy.fixture(fileName, 'base64').then(fileContent => {
            const blob = Cypress.Blob.base64StringToBlob(fileContent, 'application/vnd.oasis.opendocument.presentation');
            const formData = new FormData();
            formData.append('file', blob, fileName);
            cy.request({
                method: 'POST',
                url: `${apiUrl}/upload`,
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryFERjw9Bta5pE2rqc',
                    'Accept': '*/*',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Connection': 'keep-alive',
                    'Origin': 'http://localhost:8080',
                    'Referer': 'http://localhost:8080/',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-site',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
                    'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"'
                }
            }).then((response) => {
                cy.log(response.body)
                expect(response.status).to.eq(200);
            });
        });
    });
});