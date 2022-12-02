/* Amplify Params - DO NOT EDIT
    API_202208231425AMPLIFYC_GRAPHQLAPIENDPOINTOUTPUT
    API_202208231425AMPLIFYC_GRAPHQLAPIIDOUTPUT
    AUTH_202208231425AMPLIFYCBA3BA9AC_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */
import { Amplify, API } from "aws-amplify";
const GRAPHQL_ENDPOINT = process.env.API_202208231425AMPLIFYC_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
// @ts-ignore
//global.fetch = require("node-fetch");
const myAppConfig = {
    aws_appsync_graphqlEndpoint: GRAPHQL_ENDPOINT,
    aws_appsync_region: AWS_REGION,
    aws_appsync_authenticationType: "AWS_IAM",
};
Amplify.configure(myAppConfig);
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
    console.log(`Context: ${JSON.stringify(context)}`);
    const results = await API.graphql({
        query: createTodoUserGroupMutation,
        variables: {
            input: {
                inviteCode: "abc123test",
            },
        },
    });
    console.log("results", results);
    return event;
};
