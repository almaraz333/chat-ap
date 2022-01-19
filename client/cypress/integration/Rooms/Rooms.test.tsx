// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Rooms test', () => {
  it('successfully loads', () => {
    cy.visit('/rooms');
  });
});
