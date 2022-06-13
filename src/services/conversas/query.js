import { gql } from '@apollo/client';

export const GET_USER_TALKS = gql`
query pegarConversas($userId: uuid!) {
    talks(where: {_or: [{userId_1: {_eq: $userId}}, {userId_2: {_eq: $userId}}] }) {
      id
      user_2 {
        id
        name
        username
        image
      }
      user_1 {
        id
        name
        username
        image
      }
    }
  }
`;

export const GET_TALK = gql`
query pegarConversas($id: uuid!) {
    talks(where: {id: {_eq: $id}}) {
      id
      user_2 {
        id
        name
        username
        image
      }
      user_1 {
        id
        name
        username
        image
      }
    }
  }
`;

export const GET_MESSAGES_TALK = gql`
query pegarMensagens($talkId: uuid!) {
    messages(where: {talkId: {_eq: $talkId}}, order_by: {dataEnvio: asc}) {
        id
        message
        userId
        dataEnvio
    }
  }
`;