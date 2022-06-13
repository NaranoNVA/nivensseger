import { gql } from '@apollo/client';

export const GET_USER = gql`
query getUser($email:String!) {
    user(where: {email: {_eq: $email}}) {
      id
      name
      password
      username
      image
      email
    }
  }
`;