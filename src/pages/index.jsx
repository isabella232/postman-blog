import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
// import '../components/_layout.scss'

import FluidImage from '../components/FluidImage';
import EntryMeta from '../components/Shared/EntryMeta';
import PageSelectionButtons from '../components/Shared/PageSelectionButtons';


const BlogIndex = ({ data }) => {
  const currentPage = 1;
  const { totalPages } = 28;
  const posts = data.wpgraphql.posts.edges;
  return (
    <Layout>
      <SEO title="Home" />

      {posts.map((post) => {
        const postTitle = post.node.title;
        const postExcerpt = post.node.excerpt;
      
        const { slug, date } = post.node;
        const { name } = post.node.author;
        const avatar = post.node.author.avatar.url;
        const { featuredImage } = post.node;

        return (
          <div key={post.node.id} className="post">
            <FluidImage image={featuredImage} />
            <a href={slug} style={{"color": "#282828"}}>
              <h1 className="h2" dangerouslySetInnerHTML={{ __html: postTitle }} />
            </a>
            <EntryMeta
              name={name}
              avatar={avatar}
              date={date}
            />
            <p dangerouslySetInnerHTML={{ __html: postExcerpt }} />
          </div>
        );
      })}
      <PageSelectionButtons currentPage={currentPage} totalPages={totalPages} />
    </Layout>

  );
};

export default BlogIndex;


export const First10Posts = graphql`
  query GET_FIRST_10_POSTS{
    wpgraphql {
      posts(first: 10) {
        edges {
          node {
            id
            title
            excerpt
            date
            slug
            uri
            author {
              name
              avatar {
                url
              }
            }
            featuredImage {
              sourceUrl
              altText
            }
            tags {
              edges {
                node {
                  id
                  name
                  slug
                }
              }
            }
            categories {
              edges {
                node {
                  id
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
`;
