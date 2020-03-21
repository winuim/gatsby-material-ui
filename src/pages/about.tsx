import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "gatsby";

import ProTip from "../components/ProTip";
import Layout from "../layout";
import SEO from "../components/Seo";

const About: React.FC = () => {
  return (
    <Layout>
      <SEO title="about page" />
      <Typography variant="h4" component="h1" gutterBottom>
        About
      </Typography>
      <Link to="/" color="secondary">
        Go to the main page
      </Link>
      <ProTip />
    </Layout>
  );
};

export default About;
