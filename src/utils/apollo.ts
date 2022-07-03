import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import {API_URL} from './config';
import {setContext} from '@apollo/client/link/context';
import {createUploadLink} from 'apollo-upload-client';
import {store} from './store';

const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = setContext((_, {headers}) => {
  const token = store.getState().auth.token;
  return {
    headers: {
      ...headers,
      token: token ? token : '',
    },
  };
});

const uploadLink = createUploadLink({
  uri: API_URL,
}) as unknown as ApolloLink;

const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink, httpLink]),
  cache: new InMemoryCache(),
  name: 'Tellr Mobile App',
  version: '0.1',
});

export default client;
