/* eslint-disable no-undef */

describe("Register", () => {
  it("Une fois inscrit, l'utilisateur est redirigé", () => {
    cy.visit("http://localhost:3000/inscription");

    cy.get('[data-button="register"]').type("S'inscrire");

    cy.get('[data-button="register"]').click();

    cy.visit("http://localhost:3000/compte/infos");
  });
});

