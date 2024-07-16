/**
 * Fills the person form with the provided user data.
 *
 * @param {Object} user - Receives a user object that contains the data to fill out the form.
 * 
 */
Cypress.Commands.add('fillPersonForm', (user) => {
    cy.contains('h2', 'Dados Pessoais e de acesso').should('be.visible');
    cy.get('[data-cy="input-signup-personal-data-firstName"]').type(user.name);
    cy.get('[data-cy="input-signup-personal-data-lastName"]').type(user.lastName);
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type(user.date);
    cy.get('[data-cy="input-signup-personal-data-cpf"]').type(user.cpf);
    cy.get('[data-cy="input-signup-personal-data-email"]').type(user.email);
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]').type(user.emailConfirm);
    cy.get('[data-cy="input-signup-personal-data-password"]').type(user.password);
    cy.get('[data-cy="input-signup-personal-data-password-confirm"]').type(user.confirmPassword);
    cy.contains('span', 'Selecione a proficiência...').click();
    cy.contains('span', user.proficiency).click();
});

/**
 * Submits the person form.
 */
Cypress.Commands.add('submitPersonForm', () => {
    cy.get('[data-cy="input-signup-personal-data-lgpd"]').check();
    cy.get('[data-cy="button-signup_submit_button_1"]').click();
});

/**
 * Fills the address form with the provided address data.
 *
 * @param {Object} address - Receives a adress object that contains the data to fill out the form.
 */
Cypress.Commands.add('fillAddressForm', (address) => {
    cy.intercept('GET', 'https://viacep.com.br/ws/*/*').as('address');
    cy.contains('h2', 'Endereço').should('be.visible');
    cy.get('[data-cy="input-signup-address-cep"]').type(address.cep);
    cy.get('[data-cy="input-signup-address-neighborhood"]').type(address.neighborhood).wait('@address');
    cy.get('[data-cy="input-signup-address-street"]').type(address.street);
    cy.get('[data-cy="input-signup-address-number"]').type(address.number);
    cy.get('[data-cy="input-signup-address-complement"]').type(address.complement);
});

/**
 * Submits the address form.
 */
Cypress.Commands.add('submitAddressForm', () => {
    cy.get('[data-cy="button-signup_submit_button_3"]').click();
});