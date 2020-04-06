import React from "react";

import SEO from "../components/Seo";
import SignUpSide from "../templates/sign-up-side/SignUpSide";

const SignUpPage: React.FC = () => {
  return (
    <div>
      <SEO title="side-up page" />
      <SignUpSide success="/signin" signin="/signin" />
    </div>
  );
};

export default SignUpPage;
