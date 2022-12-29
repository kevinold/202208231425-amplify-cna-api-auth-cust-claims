/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodoUserGroup = /* GraphQL */ `
  mutation CreateTodoUserGroup(
    $input: CreateTodoUserGroupInput!
    $condition: ModelTodoUserGroupConditionInput
  ) {
    createTodoUserGroup(input: $input, condition: $condition) {
      id
      owners
      inviteCode
      createdAt
      updatedAt
    }
  }
`;
export const updateTodoUserGroup = /* GraphQL */ `
  mutation UpdateTodoUserGroup(
    $input: UpdateTodoUserGroupInput!
    $condition: ModelTodoUserGroupConditionInput
  ) {
    updateTodoUserGroup(input: $input, condition: $condition) {
      id
      owners
      inviteCode
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodoUserGroup = /* GraphQL */ `
  mutation DeleteTodoUserGroup(
    $input: DeleteTodoUserGroupInput!
    $condition: ModelTodoUserGroupConditionInput
  ) {
    deleteTodoUserGroup(input: $input, condition: $condition) {
      id
      owners
      inviteCode
      createdAt
      updatedAt
    }
  }
`;
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
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
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
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
export const myCustomMutation = /* GraphQL */ `
  mutation MyCustomMutation($args: String) {
    myCustomMutation(args: $args)
  }
`;
