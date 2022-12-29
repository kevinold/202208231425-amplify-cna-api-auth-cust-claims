/* Amplify Params - DO NOT EDIT
	API_202208231425AMPLIFYC_GRAPHQLAPIENDPOINTOUTPUT
	API_202208231425AMPLIFYC_GRAPHQLAPIIDOUTPUT
  API_202208231425AMPLIFYC_GRAPHQLAPIKEYOUTPUT
	AUTH_202208231425AMPLIFYCBA3BA9AC_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

// @ts-ignore
import { v4 as uuidv4 } from "uuid";

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

const createTodoUserGroupMutation = `
  mutation CreateTodoUserGroup(
    $input: CreateTodoUserGroupInput!
    $condition: ModelTodoUserGroupConditionInput
  ) {
    createTodoUserGroup(input: $input, condition: $condition) {
      id
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log(`context: ${JSON.stringify(context)}`);

  try {
    const result = await API.graphql({
      query: createTodoUserGroupMutation,
      variables: {
        input: {
          owners: event.request.userAttributes.sub,
          inviteCode: uuidv4(),
        },
      },
    });

    console.log("result", result);
  } catch (error) {
    console.log(error);
    throw new Error(JSON.stringify(error, null, 2));
  }

  return event;
};
