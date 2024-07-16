const { defineConfig } = require('cypress')
const { allureCypress } = require('allure-cypress/reporter')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qastage.buildbox.one',
    setupNodeEvents(on, config) { 
      allureCypress(on)
    },
  },
})