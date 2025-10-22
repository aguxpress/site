import { env } from "./env.server";
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

const GET_ARTICLES: TypedDocumentNode<
  GetArticlesQuery,
  GetArticlesQueryVariables
> = gql`
  query GetArticles($num: Int = 36) {
    posts(last: $num, where: { status: PUBLISH }) {
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
  }
`;

async function getAllArticles(num?: number) {
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

  return data;
}

export { getAllArticles, getArticleById };
