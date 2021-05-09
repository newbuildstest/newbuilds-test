
// Obviously, logging in through UI is an anti-pattern. However, I seem to lack Cypress/JS experience to properly save and transfer csrf tokens and cookies, modify storage etc.
// to all other Cypress commands, therefore decided to leave this as is. 
// You can see my thought process in custom command 'loginViaApi', which actually does log in through API. It works in isolation, and it allows to send requests
// but for UI flow it doesn't transfer and I still need to log in. I would be super keen if you could actually show me where was my problem with this. I suppose you are logging in programmatically in your suite.

export const login = (email, password) => {
    Cypress.log({
        name: 'login',
        displayName: 'LOGIN',
        message: [`🔐 Authenticating | 📧 ${email}`]
    });

    cy.visit('');
    cy.get('[data-testid=modal-login-button]').first().click();
    cy.get('[data-testid=user-email]').first().type(email);
    cy.get('[data-testid=user-password]').first().type(password);
    cy.get('[data-testid=modal-login-submit]').first().click();
    cy.get('[data-testid=user-email]').should('not.exist');
};

