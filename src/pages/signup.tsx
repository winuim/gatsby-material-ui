import React from "react";

import SEO from "../components/seo";
import SignUp from "../templates/sign-up/SignUp";

const SignUpPage: React.FC = () => {
  return (
    <div>
      <SEO title="sign-up page" />
      <SignUp />
    </div>
  );
};

export default SignUpPage;
