import { gql } from "@apollo/client";

export const CREATE = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      access_token
    }
  }
`;

export const GET = gql`
  query user {
    user {
      id
      username
      createdAt
      userType {
        id
        label
        isAdmin
        isDefaulUserType
      }
    }
  }
`;
