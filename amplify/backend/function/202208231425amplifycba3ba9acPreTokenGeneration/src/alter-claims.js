/**
 * @type {import('@types/aws-lambda').PreTokenGenerationTriggerHandler}
 */

exports.handler = async (event) => {
  event.response = {
    claimsOverrideDetails: {
      groupOverrideDetails: {
        //groupsToOverride: ["kevinold@gmail.com-group"],
      },
      claimsToAddOrOverride: {
        //user_groups: "kevinold@gmail.com-group",
      },
    },
  };
  // Return to Amazon Cognito
  return event;
};

// via https://github.com/aws-amplify/amplify-category-api/issues/449#issuecomment-1155778615
/*
import crypto from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import fetch from "node-fetch";
import { Request as Request } from "node-fetch";

const { Sha256 } = crypto;

// use your own endpoint here
const GRAPHQL_ENDPOINT = <YOUR_API_ENDPOINT>;
const AWS_REGION = process.env.AWS_REGION || 'us-east-2';

const query = `query GetUser(
  $id: ID!
) {
  getUser(id: $id) {
    role
    business {
      id
      locations(limit: 100) {
        items {
          id
        }
      }
    }
  }
}`;

export async function handler(event) {

  // get the user ID (Cognito sub)
  const userSub = event.request.userAttributes.sub;

  // get the user groups assigned through Cognito groups
  const groups = event.request.groupConfiguration.groupsToOverride;

  // Return early if user is admin, will have full auth access anyway
  if (groups.includes('admin')) { return event }

  const endpoint = new URL(GRAPHQL_ENDPOINT);


  // Return if no user is found in DB, handle this case
  if (!body.data.getUser) return event

  const claimsToAddOrOverride = {}
  const customGroups = [];

  const businessId = body.data.getUser?.business?.id

  if (businessId) {
    claimsToAddOrOverride.business_id = businessId
  }

  if (body.data.getUser?.role === "BUSINESS_ADMIN") {
    customGroups.push(businessId);

    // add all Business Location IDs to customGroups
    body.data.getUser?.business?.locations?.items.forEach((item) => {
      customGroups.push(item.location.id);
    });

  } else if (body.data.getUser.role === "LOCATION_ADMIN") {

    // add only the specific Location IDs that the user is assigned to
    body.data.getUser?.locations?.items.forEach((item) => {
      customGroups.push(item.location.id);
    });

    claimsToAddOrOverride.locationAdmin = businessId;

  } else {

    claimsToAddOrOverride.readAccess = businessId;
  }

  event.response = {
    claimsOverrideDetails: {
      groupOverrideDetails: {
        groupsToOverride: [...groups, ...customGroups],
      },
      claimsToAddOrOverride,
    }
  };

  return event;
}
*/
