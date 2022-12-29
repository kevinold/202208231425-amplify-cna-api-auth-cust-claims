import { useAuthenticator, withAuthenticator } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import React from "react";
import { useForm } from "react-hook-form";
import { joinTodoUserGroup } from "../src/graphql/mutations";

const Settings = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  console.log("sub", user.attributes?.sub);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const result = await API.graphql({
      //authMode: "AMAZON_COGNITO_USER_POOLS", // must have this here!
      query: joinTodoUserGroup,
      variables: {
        input: {
          userId: user.attributes?.sub,
          inviteCode: data.inviteCode,
        },
      },
    });
    console.log("result", result);
  };

  console.log(watch("inviteCode"));

  return (
    <div className="py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl pl-4 pr-8 sm:px-6 lg:px-8">
        <h1 className="text-medium font-bold tracking-tight text-warm-gray-900 sm:text-5xl lg:text-6xl">
          Paste your invite code to join Group
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700">
            Invite Code
          </label>
          <div className="mt-1">
            <input
              id="inviteCode"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register("inviteCode", { required: true })}
            />
            {errors.inviteCode && <span>This field is required</span>}
          </div>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default withAuthenticator(Settings);
