/// <reference types="Cypress"/>

describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:8081");
    // Enter creds for the admin on my local machine
    cy.get('input[type="text"]').type("email@gmail.com");
    cy.get('input[type="Password"]').type("asdf");
    cy.get(".v-btn__content").contains("Sign in").should("be.visible").click();
    cy.wait(1000);
    // Click on the navigation drawer to show buttons and find Manage users
    cy.get(".v-navigation-drawer__content").should("be.visible").click();
    cy.get(".v-list-item-title")
      .contains("Manage Users")
      .should("be.visible")
      .click();
    cy.get(".v-btn__content")
      .contains("show users")
      .should("be.visible")
      .click(); // Users in db should be shown here
    cy.get(".mdi-dots-vertical").last().should("be.visible").click();
    cy.get(".v-list-item-title")
      .contains("career services")
      .should("be.visible")
      .click();
    cy.wait(1000);
    cy.get("table").contains("td", "career_serv");
    cy.get(".mdi-dots-vertical").last().should("be.visible").click();
    cy.get(".v-list-item-title")
      .contains("student")
      .should("be.visible")
      .click();
    cy.get("table").contains("td", "student");
    cy.get(".mdi-pencil").last().should("be.visible").click();
    cy.get(".v-field__input").eq(1).clear().type("Donald");
    cy.get(".v-field__input").eq(2).clear().type("Trump");
    cy.get(".v-field__input").eq(3).clear().type("trump@donald.com");
    cy.get(".v-btn__content")
      .contains("Update User Profile")
      .should("be.visible")
      .click();
    cy.get("table").contains("td", "Donald Trump").should("be.visible");
    cy.get("table").contains("td", "trump@donald.com").should("be.visible");
    cy.get(".mdi-pencil").last().should("be.visible").click();
    cy.get(".v-field__input").eq(1).clear().type("Joe");
    cy.get(".v-field__input").eq(2).clear().type("Biden");
    cy.get(".v-field__input").eq(3).clear().type("biden@joe.com");
    cy.get(".v-btn__content")
      .contains("Update User Profile")
      .should("be.visible")
      .click();
    cy.get("table").contains("td", "Joe Biden").should("be.visible");
    cy.get("table").contains("td", "biden@joe.com").should("be.visible");
  });
});
