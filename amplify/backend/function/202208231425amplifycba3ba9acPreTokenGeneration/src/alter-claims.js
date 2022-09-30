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
