/// <reference types="Cypress"/>

describe('template spec', () => {
  it('Create', () => {
    cy.visit("http://localhost:8081");
    // Enter creds for the admin on my local machine
    cy.get('input[type="text"]').type("biden@joe.com");
    cy.get('input[type="Password"]').type("asdf");
    cy.get(".v-btn__content").contains("Sign in").should("be.visible").click();
    cy.get('.mdi-file-edit').should('be.visible').click()
    cy.get('.v-btn__content').contains("Education").should('be.visible').click()
    cy.get('.v-btn__content').contains("Add").should('be.visible').click()
    cy.get(".v-field__input").eq(0).clear().type("University of North Texas");
    cy.get(".v-field__input").eq(1).clear().type("Music");
    cy.get(".v-field__input").eq(2).clear().type("Denton, TX");
    cy.get(".v-field__input").eq(3).clear().type("3.2");
    cy.get(".v-field__input").eq(4).clear().type("Deans List, Honor Roll");
    cy.get(".v-field__input").eq(5).clear().type("Algorithms, Data structures");
    cy.get(".v-field__input").eq(6).clear().type("2020");
    cy.get(".v-field__input").eq(7).clear().type("2024");
    cy.get('.v-btn__content').contains("Add Education").should('be.visible').click()
    cy.wait(1000);  })

    it('Edit', () => {
      cy.visit("http://localhost:8081");
      // Enter creds for the admin on my local machine
      cy.get('input[type="text"]').type("biden@joe.com");
      cy.get('input[type="Password"]').type("asdf");
      cy.get(".v-btn__content").contains("Sign in").should("be.visible").click();
      cy.get('.mdi-file-edit').should('be.visible').click()
      cy.get('.v-btn__content').contains("Education").should('be.visible').click()
      cy.get('.mdi-pencil').last().should('be.visible').click()
      cy.get(".v-field__input").eq(0).clear().type("Oklahoma Christian");
      cy.get(".v-field__input").eq(1).clear().type("Chemistry");
      cy.get(".v-field__input").eq(2).clear().type("Edmond, OK");
      cy.get(".v-field__input").eq(3).clear().type("3.2");
      cy.get(".v-field__input").eq(4).clear().type("Best Engineer, Honor Roll");
      cy.get(".v-field__input").eq(5).clear().type("Foundations, AI");
      cy.get(".v-field__input").eq(6).clear().type("2020");
      cy.get(".v-field__input").eq(7).clear().type("2024");
      cy.get('.v-btn__content').contains("Update Education").should('be.visible').click()
      cy.wait(1000);  })

      it('Delete', () => {
        cy.visit("http://localhost:8081");
        // Enter creds for the admin on my local machine
        cy.get('input[type="text"]').type("biden@joe.com");
        cy.get('input[type="Password"]').type("asdf");
        cy.get(".v-btn__content").contains("Sign in").should("be.visible").click();
        cy.get('.mdi-file-edit').should('be.visible').click()
        cy.get('.v-btn__content').contains("Education").should('be.visible').click()
        cy.get(".mdi-delete").last().should("be.visible").click();
        cy.on ('window:confirm', (text) => {
          // Say yes on the alert window to delete the created user
          expect(text).to.contains('Are you sure you want to delete');
          return true;
        })
        cy.wait(1000);  })
})