// https://docs.github.com/es/graphql/overview/explorer
import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`  
  query Repositories($cursor: String, $username: String!) {
    user(login: $username) {
      name
      avatarUrl
      repositories(
        first: 5
        after: $cursor
        orderBy: {field: CREATED_AT, direction: DESC}
      ) {
        total: totalCount
        edges {
          cursor
          node {
            id
            name
            description
            url
            licenseInfo {
              spdxId
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;