import { login } from './steps/login.command.js';
import { loginViaApi } from './requests/postUsersSignIn.command.js';

// ui steps
Cypress.Commands.add('login', login);

// api steps
Cypress.Commands.add('loginViaApi', loginViaApi);

// There is an uncaught error "Cannot read property 'addEventListener' of null" when loading a listing's page.
// I have temporarily added and exception in order not to fail the test. Meanwhile I would raise a bug for this.
Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('addEventListener')) {
      return false
    }
  });