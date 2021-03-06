// Template for the Blog Post
import React from 'react';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Bio from '../components/Shared/Bio';
import BlogHeader from '../components/Shared/BlogHeader';
import PostForm from '../components/Shared/PostForm';
import CommentList from '../components/Shared/CommentList';
import NewsLetterForm from '../components/Shared/NewsLetterForm';


const BlogPostTemplate = ({ data }) => {
  const { post } = data.wpgraphql;
  //  insert postId, below to call PostForm
  const {
    title, content, date, featuredImage, slug, excerpt, seo, comments, postId,
    // title, content, date, featuredImage, slug, excerpt, seo, /* comments, */
  } = data.wpgraphql.post;
  const authorSlug = data.wpgraphql.post.author.slug;
  const authorBio = data.wpgraphql.post.author.description || '';

  const name = data.wpgraphql.post.author.name || 'The Postman Team';
  const avatar = data.wpgraphql.post.author.avatar.url || '';
  const tags = post.tags.edges;
  const categories = data.wpgraphql.post.categories.edges[0].node;

  const excerptText = excerpt.replace(/<(.|\n)*?>/g, '');
  /*
  *   Creates a string from the 'sanitized' excerpt string.
  *   Grabs everything before the index of '. '(end of sentence) after 100th char.
  *   Adds one to include the '. '
  * */
  const excerptTrimmed = excerptText.slice(0, (excerptText.indexOf('. ', 100) + 1));

  /* data from yoast is coming from 'seo' field that is called in the context of createPage.
  * Yoast plugin for WPGraphQL */
  const seoTitle = seo.title || title;
  const canonical = seo.canonical || slug;
  const seoDescription = seo.metaDesc || excerptTrimmed;
  const seoImage = (seo.opengraphImage && seo.opengraphImage.mediaItemUrl)
    ? seo.opengraphImage.mediaItemUrl
    : featuredImage;

  return (
    <Layout>
      <SEO title={seoTitle} description={seoDescription} image={seoImage} canonical={canonical} />
      <BlogHeader
        name={name}
        authorSlug={authorSlug}
        avatar={avatar}
        date={date}
        tags={tags}
        categories={categories}
        slug={slug}
        featuredImage={featuredImage}
        postTitle={title}
      />
      <div className="container">
        <div className="post-body-container">
          <div className="post-content">
            {parse(content, {
              replace: (domNode) => {
                /* show youtube videos
                ****************************************************************** */
                if (domNode.attribs && domNode.attribs.class === 'wp-block-embed__wrapper') {
                  if (domNode.children[1].name === 'iframe') {
                    return (
                      <div className="embed-responsive embed-responsive-16by9">
                        <iframe
                          title={`${(domNode.attribs && domNode.children[1].attribs.title) || 'Postman Youtube Channel'}`}
                          width="560"
                          height="315"
                          src={`${domNode.attribs && domNode.children[1].attribs['data-src']}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    );
                  }
                }
                if (domNode && domNode.name === 'iframe') {
                  return (
                    <div className="embed-responsive embed-responsive-16by9">
                      <iframe
                        title={`${(domNode.attribs && domNode.attribs.title) || 'Postman Youtube Channel'}`}
                        width="560"
                        height="315"
                        src={`${domNode.attribs && domNode.attribs['data-src']}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  );
                }
                /* Youtube video does not display image. iframe causes CORS error in this case
                ************************************************************************************
                // if (domNode.attribs && domNode.attribs.class === 'wp-video-shortcode') {
                //   // console.log('kyles video', domNode.children[2].children[1].attribs.href)
                //   console.log('kyles video', domNode.children[0].attribs.src)
                //   return (
                //     <iframe
                //       // title={`
                //        ${
                //          (domNode.attribs && domNode.attribs.title) || 'Postman Youtube Channel'
                //        }`
                //       }
                //       width="560"
                //       height="315"
                //       src={`${domNode.children[0].attribs.src}`}
                //       frameBorder="0"
                //       allow=
                          "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                //       allowFullScreen
                //     />
                //   );
                // }


                /* show image data from wordpress
                ************************************************************************* */

                if (domNode.attribs && domNode.attribs['data-src']) {
                  if (domNode.attribs['data-srcset']) {
                    const imageSrc = `${domNode.attribs['data-src'].replace('https://blog.postman.com', 'https://edit.blog.postman.com')}`;

                    return (
                      <img
                        src={imageSrc}
                        sizes={domNode.attribs.sizes}
                        data-srcset={`${domNode.attribs['data-srcset']}`}
                        // height={domNode.attribs.height}
                        // width={domNode.attribs.width}
                        className={domNode.attribs.className}
                      />
                    );
                  } if (domNode.attribs && domNode.attribs.src) {
                    const imageSrc = `${domNode.attribs['data-src'].replace('https://blog.postman.com', 'https://edit.blog.postman.com')}`;
                    return (
                      <img
                        src={imageSrc}
                        sizes={domNode.attribs.sizes}
                        // data-srcset={`${domNode.attribs['data-srcset']}`}
                        // height={domNode.attribs.height}
                        // width={domNode.attribs.width}
                        className={domNode.attribs.className}
                      />
                    );
                  }
                  /* show gifs data from wordpress
                *************************************************************************** */
                  return (
                    <img
                      src={`${!domNode.attribs['data-src'].startsWith('edit.')}` ? `${domNode.attribs['data-src'].replace('blog.postman.com', 'edit.blog.postman.com')}` : `${domNode.attribs['data-src']}`}
                      alt={domNode.attribs.alt}
                      sizes={domNode.attribs.sizes}
                      className={domNode.attribs.className}
                    />

                  );
                }

                return null;
              },
            })}
          </div>
          <Bio authorBio={authorBio} name={name} avatar={avatar} authorSlug={authorSlug} />
          <PostForm postId={postId} />
          <CommentList comments={comments} />
        </div>
        <NewsLetterForm data={data} />
      </div>
    </Layout>
  );
};

export default BlogPostTemplate;

export const postPageQuery = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        comments(where: {status: "approved"}) {
          edges {
            node {
              approved
              content
              date
              children {
                edges {
                  node {
                    content
                    date
                    author {
                      ... on WPGraphQL_CommentAuthor {
                        id
                        name
                      }
                    }
                  }
                }
              }
              author {
                ... on WPGraphQL_CommentAuthor {
                  id
                  name
                  url
                }
              }
            }
          }
        }
        seo {
          metaDesc
          title
          canonical
          breadcrumbs {
            url
            text
          }
          opengraphImage {
            mediaItemUrl
          }
          twitterDescription
          twitterTitle
          twitterImage {
            mediaItemUrl
          }
          opengraphTitle
        }
        featuredImage {
          sourceUrl
          altText
        }
        id
        postId
        uri
        title
        slug
        content 
        excerpt
        author {
          avatar {
            url
          }
          name
          description
          slug
        }
        date
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
`;
