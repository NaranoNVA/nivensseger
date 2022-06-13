import { gql } from '@apollo/client';

export const GET_USER = gql`
query getUser($email:String!) {
    user(where: {email: {_eq: $email}}) {
      id
      name
      password
      username
      email
    }
  }
`;

export const GET_USERS = gql`
query getUsers($name: String = "") {
  user(where: {name: {_iregex: $name}}) {
    id
    email
    name
    username
  }
}
`;
