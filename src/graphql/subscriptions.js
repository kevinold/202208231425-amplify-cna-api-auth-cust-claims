/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodoUserGroup = /* GraphQL */ `
  subscription OnCreateTodoUserGroup(
    $filter: ModelSubscriptionTodoUserGroupFilterInput
  ) {
    onCreateTodoUserGroup(filter: $filter) {
      id
      owners
      inviteCode
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodoUserGroup = /* GraphQL */ `
  subscription OnUpdateTodoUserGroup(
    $filter: ModelSubscriptionTodoUserGroupFilterInput
  ) {
    onUpdateTodoUserGroup(filter: $filter) {
      id
      owners
      inviteCode
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodoUserGroup = /* GraphQL */ `
  subscription OnDeleteTodoUserGroup(
    $filter: ModelSubscriptionTodoUserGroupFilterInput
  ) {
    onDeleteTodoUserGroup(filter: $filter) {
      id
      owners
      inviteCode
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo(
    $filter: ModelSubscriptionTodoFilterInput
    $owner: String
  ) {
    onCreateTodo(filter: $filter, owner: $owner) {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo(
    $filter: ModelSubscriptionTodoFilterInput
    $owner: String
  ) {
    onUpdateTodo(filter: $filter, owner: $owner) {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo(
    $filter: ModelSubscriptionTodoFilterInput
    $owner: String
  ) {
    onDeleteTodo(filter: $filter, owner: $owner) {
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
