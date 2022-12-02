/* Amplify Params - DO NOT EDIT
    API_202208231425AMPLIFYC_GRAPHQLAPIENDPOINTOUTPUT
    API_202208231425AMPLIFYC_GRAPHQLAPIIDOUTPUT
    AUTH_202208231425AMPLIFYCBA3BA9AC_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */
import crypto from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { default as fetch, Request } from "node-fetch";
const { Sha256 } = crypto;
const GRAPHQL_ENDPOINT = process.env.API_202208231425AMPLIFYC_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
/**
 * Helper function that sends a GraphQL query to the specified
 * endpoint and returns the result.
 *
 * @param {string} endpoint The URL of the GraphQL API endpoint
 * @param {string} query The GraphQL query to send
 * @returns {Promise<any>} The result of the query
 */
async function queryApi(endpoint, query, variables) {
  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
  });
  const endpointUrl = new URL(endpoint);
  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: endpointUrl.host,
    },
    hostname: endpointUrl.host,
    body: JSON.stringify({ query, variables }),
    path: endpointUrl.pathname,
  });
  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpointUrl, signed);
  let statusCode = 200;
  let body;
  let response;
  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message,
        },
      ],
    };
  }

  console.log("body", body);
  return {
    statusCode,
    body: JSON.stringify(body),
  };
}
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
  const variables = {
    input: {
      inviteCode: "abc123",
    },
  };
  const result = queryApi(GRAPHQL_ENDPOINT, createTodoUserGroupMutation, variables);
  console.log("result", result);
  return event;
};
