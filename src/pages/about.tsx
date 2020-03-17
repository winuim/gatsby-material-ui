import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "gatsby";

import ProTip from "../components/ProTip";
import Layout from "../layout";

const About: React.FC = () => {
  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Gatsby v4-beta example
      </Typography>
      <Link to="/">Go to the main page</Link>
      <ProTip />
    </Layout>
  );
};

export default About;
