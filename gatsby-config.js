module.exports = {
  siteMetadata: {
    title: "My page",
    description: "Site Description"
  },
  plugins: [
    "gatsby-plugin-typescript",
    'gatsby-plugin-typescript-checker',
    "gatsby-plugin-react-helmet",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-remark`,
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        fileName: 'types/graphql-types.d.ts',
      },
    },
    "gatsby-plugin-top-layout",
    {
      resolve: "gatsby-plugin-material-ui",
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      }
    }
    // If you want to use styled components you should add the plugin here.
    // 'gatsby-plugin-styled-components',
  ]
};
