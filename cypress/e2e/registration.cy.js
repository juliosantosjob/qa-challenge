/// <reference types="cypress" />

import { registerFactory } from '../samples/registerFactory'

describe('Registration', () => {

  beforeEach(() => {
    cy.visit('/18/cadastro')
    cy.get('[data-cy="button-btn-enroll"]').click()

    cy.url().should('contain',
      Cypress.config().baseUrl + '/18/cadastro')
  })

  afterEach(() => cy.screenshot())

  it('Registration succesfully', () => {
    let regist = registerFactory()

    cy.fillPersonForm(regist.person)
    cy.submitPersonForm()

    cy.fillAddressForm(regist.addreass)
    cy.submitAddressForm()

    cy.contains('h1', 'Thank you for joining us!')
      .should('be.visible')

    cy.contains('p', 'Agora você tem o passe para descobrir como o inglês pode te levar longe ')
      .should('be.visible')
  })

  it('Registration with invalid date', () => {
    let regist = registerFactory()

    regist.person.date = '2000-01-01'

    cy.fillPersonForm(regist.person)
    cy.contains('.input-error', 'Data de nascimento inválida.')
      .should('be.visible')
  })

  it('Registration with invalid CEP', () => {
    let regist = registerFactory()

    regist.person.cpf = '1111111111'

    cy.fillPersonForm(regist.person)
    cy.contains('.input-error', 'CPF inválido.')
      .should('be.visible')
  })

  it('Registration with invalid email', () => {
    let regist = registerFactory()

    regist.person.email = 'test@.com'

    cy.fillPersonForm(regist.person)
    cy.contains('.input-error', 'Email inválido.')
      .should('be.visible')
  })

  it('Registration with different confirmation email', () => {
    let regist = registerFactory()

    regist.person.emailConfirm = 'email_diferente@.com'

    cy.fillPersonForm(regist.person)
    cy.contains('.input-error', 'Precisa ser email')
      .should('be.visible')
  })

  it('Fill out and send a personal form without agreeing to the terms', () => {
    let regist = registerFactory()

    cy.fillPersonForm(regist.person)
    cy.get('[data-cy="button-signup_submit_button_1"]').click();

    cy.contains('[for="signup-personal-data-lgpd"]',
      'Eu concordo com os Termos de Uso e Política de Privacidade.').should('be.visible')
  })

  it('Invalid CEP', () => {
    let regist = registerFactory()

    cy.fillPersonForm(regist.person)
    cy.submitPersonForm()

    regist.addreass.cep = '000000000'

    cy.fillAddressForm(regist.addreass)

    cy.contains('[role="alert"]', 'CEP não encontrado.')
      .should('be.visible')
  })

  it('Performs leveling test flow', () => {
    cy.get('a[class="btn btn-secondary w-full cursor-pointer"]').then((onclick) =>
      cy.visit(onclick.attr('x-on:click')))

    cy.contains('.text-lg', 'Placement Test').should('be.visible')
    cy.get('button[x-ref="submitButton"]').click()
    cy.contains('button', 'Mudar de nível').click()

    cy.get('button[type="button"]').last().click()
    cy.go('back')
    cy.get('[data-cy="button-btn-enroll"]').click()
  })
})