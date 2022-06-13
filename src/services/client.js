import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

export const client = new ApolloClient({
    link : new WebSocketLink({
        uri : 'wss://cute-pika-46.hasura.app/v1/graphql',
        options: {
            reconnect: true,
            connectionParams : {
                headers : {'x-hasura-admin-secret' : '4jPyp5j9pBOq0217WXMTgKPbFGwlSSg5nrNHUjmyQDcf2EpU9TwX6iCS8Gff0xC2' },
            }
        }
    }),
    cache: new InMemoryCache()
});