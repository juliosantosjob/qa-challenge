Cypress.on('test:after:run', (test, runnable) => {
    const screenshotName = `${runnable.parent.title} - ${test.title}.png`
    const screenshotPath = `screenshots/${Cypress.spec.name}/${screenshotName}`

    cy.allure().logStep(`Attaching screenshot ${screenshotName}`)
    cy.allure().attachment('Screenshot', screenshotPath, 'image/png')
})