import { env } from "@utils/env.server";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
  type TypedDocumentNode,
} from "@apollo/client";
import type {
  GetArticlesQuery,
  GetArticlesQueryVariables,
  GetArticleByIdQuery,
  GetArticleByIdQueryVariables,
} from "@/types/__generated__/graphql";

const client = new ApolloClient({
  link: new HttpLink({ uri: env.WP_GRAPHQL_URI }),
  cache: new InMemoryCache(),
});

async function getPublishedArticles(num: number = 36) {
  const { data } = await client.query({
    query: GET_ARTICLES,
    variables: { num },
  });
  return data;
}

async function getArticleById(slug: string) {
  const { data } = await client.query({
    query: GET_ARTICLE_BY_ID,
    variables: { postId: slug },
  });

  return data?.page || data?.post;
}

// WPGraphQL Queries
const GET_ARTICLES: TypedDocumentNode<
  GetArticlesQuery,
  GetArticlesQueryVariables
> = gql`
  query GetArticles($num: Int) {
    posts(first: $num, where: { status: PUBLISH }) {
      nodes {
        id
        title
        date
        excerpt
        slug
        author {
          node {
            name
            id
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

const GET_ARTICLE_BY_ID: TypedDocumentNode<
  GetArticleByIdQuery,
  GetArticleByIdQueryVariables
> = gql`
  query GetArticleById($postId: ID!) {
    post(id: $postId, idType: SLUG) {
      id
      slug
      date
      title
      excerpt
      content
      author {
        node {
          avatar {
            url
          }
          description
          slug
          name
          id
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          id
        }
      }
    }
    page(id: $postId, idType: URI) {
      id
      slug
      modified
      title
      content
    }
  }
`;

export { getPublishedArticles, getArticleById };
