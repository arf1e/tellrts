import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {API_URL} from './config';
import {setContext} from '@apollo/client/link/context';
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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
