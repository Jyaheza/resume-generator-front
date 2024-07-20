/// <reference types="Cypress"/>

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8081')
    // Enter creds for the admin on my local machine
    cy.get('input[type="text"]').type('email@gmail.com')
    cy.get('input[type="Password"]').type('asdf')
    cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
    cy.pause() // Admin page should be loaded up right now
    // Click on the navigation drawer to show buttons and find Manage users
    cy.get('.v-navigation-drawer__content').should('be.visible').click()
    cy.get('.v-list-item-title').contains('Manage Users').should('be.visible').click()
    cy.get('.v-btn__content').contains('show users').should('be.visible').click() // Users in db should be shown here
    // Go back to review resumes
    cy.get('.v-navigation-drawer__content').should('be.visible').click()
    cy.get('.v-list-item-title').contains('Review Resumes').should('be.visible').click()
    cy.get('.v-navigation-drawer__content').should('be.visible').click()
    cy.get('.v-avatar').should('be.visible').click() // Click avatar
    cy.get('table').contains('td', 'admin'); // Profile page should show name and role which is admin
  })
})