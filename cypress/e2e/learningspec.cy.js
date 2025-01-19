import 'cypress-wait-until';

describe('Learning Cypress Commands', () => {
    before(() => {
        // Runs once before all tests in the block
        cy.visit('http://localhost:8080'); // Replace with the actual URL of your hosted `index.html`
    });

    beforeEach(() => {
        // Runs before each test in the block
        cy.visit('http://localhost:8080');
    });

    after(() => {
        // Runs once after all tests in the block
        cy.log('All tests completed');
    });

    afterEach(() => {
        // Runs after each test in the block
        cy.log('Test completed');
    });

    it('should type into an input field', () => {
        cy.get('#username').type('Test User');
        cy.get('#email').type('testuser@example.com');
    });

    it('should clear an input field', () => {
        cy.get('#username').type('Test User').clear();
    });

    it('should submit a form', () => {
        cy.get('#username').type('Test User');
        cy.get('#email').type('testuser@example.com');
        cy.get('#submitUser').click();
    });

    it('should check and uncheck a checkbox', () => {
        cy.get('#checkbox').check().uncheck();
    });

    it('should select an option from a dropdown', () => {
        cy.get('#dropdown').select('Option 1');
    });

    it('should wait for a specific time', () => {
        cy.wait(1000); // Wait for 1 second
    });


    it('should make a network request', () => {
        cy.request('GET', 'http://localhost:3000/api/users').then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('should spy on a method', () => {
        const obj = { method: () => 'foo' };
        const spy = cy.spy(obj, 'method');
        obj.method();
        expect(spy).to.have.been.called;
    });

    it('should stub a method', () => {
        const obj = { method: () => 'foo' };
        const stub = cy.stub(obj, 'method').returns('bar');
        expect(obj.method()).to.eq('bar');
    });

    it('should focus on an input field', () => {
        cy.get('#username').focus();
    });

    it('should find an element containing specific text', () => {
        cy.contains('Test Page').should('be.visible');
    });

    it('should click a button', () => {
        cy.get('#submitUser').click();
    });
    it('should blur an input field', () => {
        cy.get('#username').type('Test User').blur();
    });

    it('should scroll to specific coordinates', () => {
        cy.scrollTo(0, 500);
    });

    it('should take a screenshot', () => {
        cy.screenshot();
    });

    it('should reload the page', () => {
        cy.reload();
    });

    it('should access the window object', () => {
        cy.window().should('have.property', 'top');
    });

    it('should access the document object', () => {
        cy.document().should('have.property', 'title');
    });

    it('should test with a different origin', () => {
        cy.origin('https://example.com', () => {
            cy.visit('/');
            cy.contains('Example Domain').should('be.visible');
        });
    });

    it('should get the focused element', () => {
        cy.get('#username').focus();
        cy.focused().should('have.id', 'username');
    });

    it('should control time with cy.clock and cy.tick', () => {
        cy.clock();
        cy.tick(1000);
    });

    it('should pause the test execution', () => {
        cy.pause();
    });

    it('should debug the test', () => {
        cy.get('#username').debug();
    });

    it('should use should and and assertions', () => {
        cy.get('#username').should('be.visible').and('have.attr', 'placeholder', 'Enter your username');
    });

    it('should wrap an object', () => {
        const user = { name: 'Test User', email: 'testuser@example.com' };
        cy.wrap(user).should('have.property', 'name', 'Test User');
    });

    it('should load a fixture', () => {
        cy.fixture('example.json').then((data) => {
            expect(data.name).to.eq('Using fixtures to represent data');
        });
    });

    it('should execute a task', () => {
        cy.task('log', 'This is a log message');
    });

    it('should get the current URL', () => {
        cy.url().should('include', 'localhost:8080');
    });

    it('should get the location object', () => {
        cy.location().should((loc) => {
            expect(loc.href).to.include('localhost:8080');
        });
    });

    it('should get the page title', () => {
        cy.title().should('eq', 'Sample Test Page');
    });

    it('should wait for a specific condition', () => {
        cy.waitUntil(() => cy.get('#username').should('be.visible'));
    });
});

