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
} from "@/types/__generated__/graphql";
import { env } from "./env.server";

const client = new ApolloClient({
  link: new HttpLink({ uri: env.WP_GRAPHQL_URI }),
  cache: new InMemoryCache(),
});

const GET_ARTICLES: TypedDocumentNode<
  GetArticlesQuery,
  GetArticlesQueryVariables
> = gql`
  query GetArticles {
    posts(last: 2, where: { status: PUBLISH }) {
      nodes {
        id
        title
        date
        excerpt
        slug
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

async function getAllArticles() {
  const { data } = await client.query({ query: GET_ARTICLES });

  return data;
}

export { getAllArticles };
