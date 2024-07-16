// Disable uncaught exception
Cypress.on('uncaught:exception', (err, runnable) => { return false });

// import plugins
import 'allure-cypress/commands';

// Import commands
import './commands'