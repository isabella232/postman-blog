const queries = require('./src/utils/algolia');

require('dotenv').config({
  path: `.env.${process.env.GATSBY_ACTIVE_ENV}`,
});

// require('dotenv').config({
//   path: `.env.${process.env.NODE_ENV}`,
// });



module.exports = {
  siteMetadata: {
    title: 'Postman Blog',
    description: '',
    author: 'Postman',
    siteUrl: 'https://blog.postman.com/',
  },
  plugins: [
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'WPGraphQL',
        fieldName: 'wpgraphql',
        url: 'https://blog.postman.com/graphql',
        refetchInterval: 240,
      },
    },

    // {
    //   resolve: 'gatsby-wpgraphql-inline-images',
    //   options: {
    //     wordPressUrl: 'https://blog.getpostman.com',
    //     uploadsUrl: 'https://blog.getpostman.com/wp-content/uploads/',
    //     processPostTypes: ['Page', 'Post'],
    //     graphqlTypeName: 'WPGraphQL',
    //     httpHeaders: {
    //       Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    //     },
    //     debugOutput: true,
    //   },
    // },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries,
        chunkSize: 10000, // default: 1000
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
