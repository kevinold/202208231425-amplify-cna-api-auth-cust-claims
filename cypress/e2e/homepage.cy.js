/// <reference types="cypress" />

describe("shared todos functionality", () => {
  beforeEach(() => {
    cy.fixture("users").then((usersJson) => {
      cy.loginWithCognitoUI(usersJson[0].username, Cypress.env("testPassword"));
      cy.visit("/");
    });

    cy.intercept("POST", Cypress.env("AppSyncGraphQLEndpoint"), (req) => {
      if (req.body.hasOwnProperty("query") && req.body.query.includes("query ListTodos")) {
        req.alias = "gqlListTodosQuery";
      }

      if (req.body.hasOwnProperty("query") && req.body.query.includes("mutation CreateTodo")) {
        req.alias = "gqlCreateTodoMutation";
      }
    });
    cy.visit("/");
  });

  it("displays the home page", () => {
    cy.getBySel("nav-dashboard").should("be.visible");

    cy.getBySel("header-title").should("have.text", "Dashboard");

    cy.getBySel("meal-list-loading").should("exist");

    cy.wait("@gqlMealsByOwnerQuery");

    cy.getBySel("meal-list-loading").should("not.exist");
  });

  it("should render posts using SSR", () => {
    cy.visit("/");
    cy.getBySel("posts-count").should("have.text", 2);

    cy.getBySelLike("post-").should("have.length", 2);
  });
});
