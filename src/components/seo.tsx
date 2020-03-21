/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

interface Props {
  site: {
    siteMetadata: {
      title: string;
      description: string;
    };
  };
}

const SEO: React.FC<{ title?: string; description?: string }> = ({
  title,
  description,
}) => {
  const data = useStaticQuery<Props>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  const metaDescription =
    description || data?.site?.siteMetadata?.description || "";

  return (
    <Helmet
      title={title}
      titleTemplate={`%s | ${data?.site?.siteMetadata?.title}`}
    >
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
    </Helmet>
  );
};

SEO.defaultProps = {
  description: "",
};

export default SEO;
