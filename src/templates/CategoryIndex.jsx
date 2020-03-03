import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import EntryMeta from '../components/Shared/EntryMeta';
import PageSelectionButtons from '../components/Shared/PageSelectionButtons';
import SEO from '../components/seo';
import FluidImage from '../components/FluidImage';


export const catsPostsQuery = graphql`
  query GET_PAGE_POSTS_OF_CATEGORY($id: ID!, $startCursor: String!) {
    wpgraphql {
        category(id: $id){
            name
            slug
            posts (first: 10, after: $startCursor) {
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
  }
`;
// { data }
const CatsPostsList = ({ data, pageContext }) => {
//   const { post } = data.wpgraphql
  const { category } = data.wpgraphql;
  const title = category.name;
  const posts = category.posts.edges;
  const { totalCatsPages, catsPageNum } = pageContext;

  console.log(data);

  return (
    <Layout>
      <SEO title="post" />
      <h1>
        #
        {title}
      </h1>
      {posts.map((post) => {
        const postTitle = post.node.title;
        const postExcerpt = post.node.excerpt;
        const tags = post.node.tags.edges;
        const category = post.node.categories;
        const { slug, date } = post.node;

        const { name } = post.node.author;
        const avatar = post.node.author.avatar.url;
        const { featuredImage } = post.node;

        return (
          <div key={post.node.id} className="post">
            <FluidImage image={featuredImage} />
            <Link to={slug}>
              <h1 dangerouslySetInnerHTML={{ __html: postTitle }} />
            </Link>
            <EntryMeta name={name} avatar={avatar} date={date} tags={tags} categories={category} />
            <p dangerouslySetInnerHTML={{ __html: postExcerpt }} />
          </div>
        );
      })}
      {totalCatsPages > 1 && (
        <PageSelectionButtons currentPage={catsPageNum} totalPages={totalCatsPages} prefix={`/categories/${category.slug}`} />
      )}

    </Layout>
  );
};

export default CatsPostsList;
