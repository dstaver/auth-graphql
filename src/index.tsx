import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import './Styles/index.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';

import { client } from './ApolloClient';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
