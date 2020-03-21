import React from "react";

import SEO from "../components/seo";
import SignIn from "../templates/sign-in/SignIn";

const SignInPage: React.FC = () => {
  return (
    <div>
      <SEO title="signin page" />
      <SignIn />
    </div>
  );
};

export default SignInPage;
