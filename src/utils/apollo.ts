import {ApolloClient, ApolloLink, InMemoryCache, split} from '@apollo/client';
import {API_URL, WS_URL} from './config';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';
import {createUploadLink} from 'apollo-upload-client';
import {store} from './store';
import {getMainDefinition} from '@apollo/client/utilities';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({message, locations, path}) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const authLink = setContext((_, {headers}) => {
  const token = store.getState().auth.token;
  return {
    headers: {
      ...headers,
      token: token ? token : '',
      language: i18next.language,
    },
  };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: WS_URL,
    connectionParams: () => ({
      headers: {
        token: store.getState().auth.token,
      },
    }),
  }),
);
const uploadLink = createUploadLink({
  uri: API_URL,
}) as unknown as ApolloLink;

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  uploadLink,
);

const client = new ApolloClient({
  link: ApolloLink.from([authLink, splitLink, errorLink]),
  cache: new InMemoryCache(),
  name: 'Tellr Mobile App',
  version: '0.1',
});

export default client;
