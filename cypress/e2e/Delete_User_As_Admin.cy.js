/// <reference types="Cypress"/>

describe('template spec', () => {
  it('Delete User', () => {
    cy.visit('http://localhost:8081')
    // Create the account of a new user
    cy.get('.v-btn__content').contains('Create Account').click()
    cy.get('.v-text-field ').eq(2).click().type('Donald')
    cy.get('.v-text-field ').eq(3).click().type('Trump')
    cy.get('.v-text-field ').eq(4).click().type('donald@trump.com')
    cy.get('.v-text-field ').eq(5).click().type('asdf')
    cy.get('.v-btn').eq(3).click()
    cy.wait(1000)
    // Enter creds for the admin on my local machine
    cy.get('input[type="text"]').type('email@gmail.com')
    cy.get('input[type="Password"]').type('asdf')
    cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
    // Click on the navigation drawer to show buttons and find Manage users
    cy.get('.mdi-account-multiple').should('be.visible').click()
    cy.get('.v-btn__content').contains('show users').should('be.visible').click() // Users in db should be shown here
    cy.get("table").contains("td", "Donald Trump").should("be.visible"); // Confirm the creation of the new user
    cy.screenshot()
    cy.get(".mdi-delete").last().should("be.visible").click();
    cy.on ('window:confirm', (text) => {
      // Say yes on the alert window to delete the created user
      expect(text).to.contains('Are you sure you want to delete');
      return true;
    })
    cy.get('.v-btn__content').contains('show users').should('be.visible').click() // Users in db should be shown here
    cy.get("table").contains("td", "Donald Trump").should('not.exist') // Confirm the user was deleted
    cy.screenshot()
    cy.get('.mdi-logout').should('be.visible').click()
    cy.get('input[type="text"]').type('donald@trump.com')
    cy.get('input[type="Password"]').type('asdf')
    cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
    cy.get('.v-snackbar__content').contains('User not found! ').should('be.visible') // Assert that the user cant login
    cy.screenshot()
  })
})