/* Amplify Params - DO NOT EDIT
	API_202208231425AMPLIFYC_GRAPHQLAPIENDPOINTOUTPUT
	API_202208231425AMPLIFYC_GRAPHQLAPIIDOUTPUT
	AUTH_202208231425AMPLIFYCBA3BA9AC_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { Amplify, API } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import { createTodoUserGroup } from "../../../../../src/graphql/mutations";

const GRAPHQL_ENDPOINT = process.env.API_202208231425AMPLIFYC_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";

const myAppConfig = {
  aws_appsync_graphqlEndpoint: GRAPHQL_ENDPOINT,
  aws_appsync_region: AWS_REGION,
  aws_appsync_authenticationType: "AWS_IAM",
};

Amplify.configure(myAppConfig);

const mutation = /* GraphQL */ `
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
  console.log(`Context: ${JSON.stringify(context)}`);

  const variables = {
    input: {
      owner: "testuserid",
      inviteCode: uuidv4(),
    },
  };

  let response;

  try {
    response = await API.graphql({
      query: createTodoUserGroup,
      variables,
    });
    console.log("respose:", response);
  } catch (error) {
    response = {
      errors: [
        {
          message: error.message,
        },
      ],
    };
  }

  return response.data.createTodoUserGroup.id;
};
