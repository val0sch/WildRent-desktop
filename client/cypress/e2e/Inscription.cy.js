/* eslint-disable no-undef */

describe("Register", () => {
  it("Une fois inscrit, l'utilisateur est redirigé", () => {
    cy.visit("http://localhost:3000/compte");

    cy.get('[data-form-type="email"]').type("test@test.fr");

    cy.get('[data-form-type="password,new"]').type("Azertyuiop01");

    cy.get('[data-form-type="password,confirmation"]').type("Azertyuiop01");

    cy.get('[data-button="register"]').type("S'inscrire");

    cy.get('[data-button="register"]').click();

    cy.url().should("include", "/compte/infos");

    // cy.visit("http://localhost:3000/compte/infos");
  });
});

