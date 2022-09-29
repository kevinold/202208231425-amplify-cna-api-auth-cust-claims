/// <reference types="cypress" />

describe("shared todos functionality", () => {
  let ctx = {};
  before(() => {
    cy.fixture("users").then((usersJson) => {
      ctx.primaryUser = usersJson[0];
      ctx.secondaryUser = usersJson[1];
    });
  });

  beforeEach(() => {
    cy.loginWithCognitoUI(ctx.primaryUser.email, Cypress.env("testUserPassword"));
    cy.visit("/");

    cy.intercept("POST", Cypress.env("appSyncGraphQLEndpoint"), (req) => {
      if (req.body.hasOwnProperty("query") && req.body.query.includes("query ListTodos")) {
        req.alias = "gqlListTodosQuery";
      }

      if (req.body.hasOwnProperty("query") && req.body.query.includes("mutation CreateTodo")) {
        req.alias = "gqlCreateTodoMutation";
      }
    });
    cy.visit("/");
  });

  it("displays user information", () => {
    cy.wait("@gqlListTodosQuery");

    cy.getBySel("user-email").should("have.text", ctx.primaryUser.email);
  });
});

/*
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

*/
