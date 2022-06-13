import { gql } from '@apollo/client';

export const ENVIAR_MENSAGEM = gql`
mutation enviarMensagem($userId: uuid!, $talkId: uuid!, $message: String!) {
    insert_messages(objects: {message: $message, userId: $userId, talkId: $talkId}) {
      affected_rows
    }
  }
`;

export const INICIAR_CONVERSA = gql`
mutation inicarConversa($userId_1: uuid!, $userId_2: uuid!) {
    insert_talks(objects: {userId_1: $userId_1, userId_2: $userId_2}) {
      affected_rows
    }
  }
`;