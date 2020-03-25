import React from "react";

import SEO from "../components/Seo";
import Mypage from "../templates/home/Mypage";

const Home: React.FC = () => {
  return (
    <div>
      <SEO title="User page" />
      <Mypage />
    </div>
  );
};

export default Home;
