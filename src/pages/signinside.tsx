import React from "react";

import SEO from "../components/seo";
import SignInSide from "../templates/sign-in-side/SignInSide";

const SignInSidePage: React.FC = () => {
  return (
    <div>
      <SEO title="side-in-side page" />
      <SignInSide />
    </div>
  );
};

export default SignInSidePage;
