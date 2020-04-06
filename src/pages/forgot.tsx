import React from "react";

import SEO from "../components/Seo";
import ForgotSide from "../templates/forgot-side/ForgotSide";

const ForgotPage: React.FC = () => {
  return (
    <div>
      <SEO title="side-in page" />
      <ForgotSide success="/signin" signin="/signin" />
    </div>
  );
};

export default ForgotPage;
