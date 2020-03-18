import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "gatsby";

import ProTip from "../components/ProTip";
import Layout from "../layout";
import SEO from "../components/seo";

const Index: React.FC = () => {
  return (
    <Layout>
      <SEO title="index main" />
      <Typography variant="h4" component="h1" gutterBottom>
        Create React App v4-beta example with TypeScript{" "}
      </Typography>
      <Link to="/about" color="secondary">
        Go to the about page
      </Link>
      <ProTip />
    </Layout>
  );
};

export default Index;
