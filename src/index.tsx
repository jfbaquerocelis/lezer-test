import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { github } from './config';
import App from './App';
import './custom.scss';
import { relayStylePagination } from '@apollo/client/utilities';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination()
      }
    }
  }
})

const client = new ApolloClient({
  uri: github.baseURL,
  headers: github.headers,
  cache,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App /> 
    </ApolloProvider>
  </React.StrictMode>
);
