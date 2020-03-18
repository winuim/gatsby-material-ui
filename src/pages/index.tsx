import React from "react";
import { Link } from "gatsby";
import Typography from "@material-ui/core/Typography";

import ProTip from "../components/ProTip";
import Layout from "../layout";
import SEO from "../components/seo";

const Index: React.FC = () => {
  return (
    <Layout>
      <SEO title="index main" />
      <Typography variant="h4" component="h1" gutterBottom>
        Gatsby Material-UI with Typescript
      </Typography>
      <img src="https://source.unsplash.com/random/400x200" alt="" />
      <Typography>
        <Link to="/about" color="secondary">
          Go to the about page
        </Link>
      </Typography>
      <ProTip />
    </Layout>
  );
};

export default Index;
