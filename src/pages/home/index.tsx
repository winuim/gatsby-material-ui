import React from "react";

import SEO from "../../components/Seo";
import Mypage from "./Mypage";

const HomeIndexPage: React.FC = () => {
  return (
    <div>
      <SEO title="User page" />
      <Mypage />
    </div>
  );
};

export default HomeIndexPage;
