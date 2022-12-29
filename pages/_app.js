import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../src/aws-exports";
Amplify.configure({
  API: {
    graphql_headers: async () => ({
      Authorization: (await Auth.currentSession()).getIdToken().getJwtToken(),
    }),
  },
  ...awsconfig,
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
