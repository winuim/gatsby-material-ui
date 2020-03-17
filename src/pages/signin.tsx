import React from "react";
import { Link } from "gatsby";

import ProTip from "../components/ProTip";
import Layout from "../layout";
import SEO from "../components/seo";
import SignIn from "../templates/sign-in/signin";

const Signin: React.FC = () => {
  return (
    <Layout>
      <SEO title="about page" />
      <SignIn />
      <Link to="/">Go to the main page</Link>
      <ProTip />
    </Layout>
  );
};

export default Signin;
