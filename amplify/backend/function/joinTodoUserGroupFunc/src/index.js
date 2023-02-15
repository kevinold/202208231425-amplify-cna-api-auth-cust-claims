/* Amplify Params - DO NOT EDIT
	API_202208231425AMPLIFYC_GRAPHQLAPIENDPOINTOUTPUT
	API_202208231425AMPLIFYC_GRAPHQLAPIIDOUTPUT
	API_202208231425AMPLIFYC_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { API } from "@aws-amplify/api";

const config = {
  aws_project_region: process.env.REGION,
  // @ts-ignore
  aws_appsync_graphqlEndpoint: process.env.API_202208231425AMPLIFYC_GRAPHQLAPIENDPOINTOUTPUT,
  aws_appsync_region: process.env.REGION,
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: process.env.API_202208231425AMPLIFYC_GRAPHQLAPIKEYOUTPUT,
};

API.configure(config);

const todoUserGroupByInviteCode = /* GraphQL */ `
  query TodoUserGroupByInviteCode($inviteCode: String = "") {
    todoUserGroupByInviteCode(inviteCode: $inviteCode) {
      items {
        id
        owners
      }
    }
  }
`;

const updateTodoUserGroup = /* GraphQL */ `
  mutation UpdateTodoUserGroup(
    $input: UpdateTodoUserGroupInput!
    $condition: ModelTodoUserGroupConditionInput
  ) {
    updateTodoUserGroup(input: $input, condition: $condition) {
      id
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const { userId, inviteCode } = event.arguments.input;

  let todoUserGroup;

  try {
    const res = await API.graphql({
      query: todoUserGroupByInviteCode,
      variables: { inviteCode },
    });

    if (res.data.todoUserGroupByInviteCode?.items && res.data.todoUserGroupByInviteCode.items[0]) {
      todoUserGroup = res.data.todoUserGroupByInviteCode?.items[0];
    }
  } catch (error) {
    console.log(error);
    throw new Error(JSON.stringify(error, null, 2));
  }

  if (!todoUserGroup) return "Invalid Invite Code or group is full";

  try {
    console.log({ todoUserGroup });
    const res = await API.graphql({
      query: updateTodoUserGroup,
      variables: {
        input: {
          id: todoUserGroup.id,
          // append userId to existing owners
          owners: [...todoUserGroup.owners, userId],
        },
      },
    });

    return { statusCode: 200, body: "Success" };
  } catch (error) {
    console.log(error);
    throw new Error(JSON.stringify(error, null, 2));
  }
};
