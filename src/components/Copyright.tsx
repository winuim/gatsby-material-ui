import React from "react";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import { useStaticQuery, graphql } from "gatsby";

interface Props {
  site: {
    siteMetadata: {
      title: string;
      url: string;
    };
  };
}

const Copyright: React.FC = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      site {
        siteMetadata {
          title
          url
        }
      }
    }
  `);
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <MuiLink color="inherit" href={data.site.siteMetadata.url}>
        {data.site?.siteMetadata?.title}
      </MuiLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
