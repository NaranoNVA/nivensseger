import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
mutation addUser($name: String!, $password: String!, $username: String!, $email: String!) {
    insert_user(objects: {name: $name, password: $password, username: $username, email: $email}) {
      returning {
        id
        name
        username
        image
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
mutation updateUser($name: String = "", $image: String = "", $id: uuid = "") {
  update_user(_set: {name: $name, image: $image}, where: {id: {_eq: $id}}) {
    returning {
      id
      name
      password
      username
      image
    }
  }
}
`;