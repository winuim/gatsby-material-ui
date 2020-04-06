import React from "react";

import SEO from "../components/Seo";
import SignInSide from "../templates/sign-in-side/SignInSide";

const SignInPage: React.FC = () => {
  return (
    <div>
      <SEO title="side-in page" />
      <SignInSide success="/home" signup="/signup" forgot="/forgot" />
    </div>
  );
};

export default SignInPage;
