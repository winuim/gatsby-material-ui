import React from "react";

import SEO from "../components/Seo";
import SignUpSide from "../templates/sign-up-side/SignUpSide";

const SignUpSidePage: React.FC = () => {
  return (
    <div>
      <SEO title="side-up-side page" />
      <SignUpSide />
    </div>
  );
};

export default SignUpSidePage;
