/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodoUserGroup = /* GraphQL */ `
  query GetTodoUserGroup($id: ID!) {
    getTodoUserGroup(id: $id) {
      id
      owners
      inviteCode
      createdAt
      updatedAt
    }
  }
`;
export const listTodoUserGroups = /* GraphQL */ `
  query ListTodoUserGroups(
    $filter: ModelTodoUserGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodoUserGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owners
        inviteCode
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const todoUserGroupByInviteCode = /* GraphQL */ `
  query TodoUserGroupByInviteCode(
    $inviteCode: String!
    $sortDirection: ModelSortDirection
    $filter: ModelTodoUserGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    todoUserGroupByInviteCode(
      inviteCode: $inviteCode
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owners
        inviteCode
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      group
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        group
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
