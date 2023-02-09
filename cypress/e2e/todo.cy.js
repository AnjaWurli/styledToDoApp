/// <reference types="cypress"/>

/*give all testing elements a data-cy

-input field = "input-shit"
-add button = "add-button"
-remove button= "remove-button"
-filter = "all"/"done"/"open"
-todos = <description>
-checkbox ="checkbox"
*/

//filters

describe("Todo App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    const typeIn = "learn cypress";
  });
  it("should have input field", () => {
    cy.get("[data-cy='input-shit']").should("exist");
  });

  //check if not shorter than 5 characters
  it("should not allow entries with less than 5 characters", () => {
    const typeIn = "hi";
    cy.get("[data-cy='input-shit']").type(typeIn);
    cy.get("[data-cy='add-button']").click();
    Cypress.on("uncaught:exception", () => false);
    cy.get(`[data-cy='${typeIn}']`).should("not.exist");
  });

  context("with a new task", () => {
    beforeEach(() => {
      const typeIn = "learn cypress";
      cy.get("[data-cy='input-shit']").type(typeIn);
      cy.get("[data-cy='add-button']").click();
    });

    afterEach(() => {
      const typeIn = "learn cypress";
      cy.get(`[data-cy='${typeIn}']`).find("[data-cy='checkbox']").check();
      cy.get("[data-cy='remove-button']").click();
    });

    //input of new todo:
    it("should add new elements", () => {
      const typeIn = "learn cypress";
      cy.get(`[data-cy='${typeIn}']`).should("exist");
    });

    //duplication check
    it("should not allow duplicated entries", () => {
      const typeIn = "learn cypress";
      cy.get("[data-cy='input-shit']").type(typeIn);
      cy.get("[data-cy='add-button']").click();
      Cypress.on("uncaught:exception", () => false);
      cy.get(`[data-cy='${typeIn}']`).should("have.length", 1);
    });

    context("with a checked task", () => {
      beforeEach(() => {
        const typeIn = "learn cypress";
        cy.get(`[data-cy='${typeIn}']`).click();
      });

      afterEach(() => {
        cy.get("[data-cy='all']").click();
        const typeIn = "learn cypress";
        cy.get(`[data-cy='${typeIn}']`).click();
      });

      //check element is done
      it("should mark elements as done", () => {
        const typeIn = "learn cypress";
        cy.get(`[data-cy='${typeIn}']`)
          .find("[data-cy='checkbox']:checked")
          .should("exist");
      });

      //filter
      it("can filter uncompleted tasks", () => {
        cy.get("[data-cy='open']").click();
        cy.get("[data-cy='checkbox']:checked")
          .parents()
          .should("have.css", "display", "none");
      });

      it("can filter completed tasks", () => {
        cy.get("[data-cy='done']").click();
        cy.get("[data-cy='checkbox']:not(:checked)")
          .parents()
          .should("have.css", "display", "none");
      });
    });
  });

  //deletion
  it("can delete done todos", () => {
    const typeIn = "learn cypress";
    cy.get("[data-cy='input-shit']").type(typeIn);
    cy.get("[data-cy='add-button']").click();

    cy.get(`[data-cy='${typeIn}']`).click();

    cy.get("[data-cy='remove-button']").click();
    cy.get("[data-cy='checkbox']:checked").should("not.exist");
  });
});
