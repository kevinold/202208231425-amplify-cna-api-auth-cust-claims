/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodoUserGroup = /* GraphQL */ `
  subscription OnCreateTodoUserGroup(
    $filter: ModelSubscriptionTodoUserGroupFilterInput
    $owner: String
  ) {
    onCreateTodoUserGroup(filter: $filter, owner: $owner) {
      id
      inviteCode
      joinedGroupId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateTodoUserGroup = /* GraphQL */ `
  subscription OnUpdateTodoUserGroup(
    $filter: ModelSubscriptionTodoUserGroupFilterInput
    $owner: String
  ) {
    onUpdateTodoUserGroup(filter: $filter, owner: $owner) {
      id
      inviteCode
      joinedGroupId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteTodoUserGroup = /* GraphQL */ `
  subscription OnDeleteTodoUserGroup(
    $filter: ModelSubscriptionTodoUserGroupFilterInput
    $owner: String
  ) {
    onDeleteTodoUserGroup(filter: $filter, owner: $owner) {
      id
      inviteCode
      joinedGroupId
      createdAt
      updatedAt
      owner
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
