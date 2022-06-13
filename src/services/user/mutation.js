import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
mutation addUser($name: String!, $password: String!, $username: String!, $email: String!) {
    insert_user(objects: {name: $name, password: $password, username: $username, email: $email}) {
      returning {
        id
        name
        username
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
mutation updateUser($name: String = "", $username: String = "", $email: String = "", $id: uuid = "") {
  update_user(_set: {name: $name, username: $username, email: $email}, where: {id: {_eq: $id}}) {
    returning {
      id
      name
      email
      username
      password
    }
  }
}
`;

export const UPDATE_USER_PASSWORD = gql`
mutation updateUser($name: String = "", $username: String = "", $email: String = "", $password: String = "", $id: uuid = "") {
  update_user(_set: {name: $name, username: $username, email: $email, password: $password, }, where: {id: {_eq: $id}}) {
    returning {
      id
      name
      email
      username
      password
    }
  }
}
`;