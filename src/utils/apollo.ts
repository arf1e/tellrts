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
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const uploadLink = createUploadLink({uri: API_URL});

const client = new ApolloClient({
  link: ApolloLink.from([uploadLink, httpLink, authLink]),
  cache: new InMemoryCache(),
});

export default client;
