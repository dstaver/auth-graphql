import React from 'react';
import { client } from '../../ApolloClient';
import { Redirect } from 'react-router';

export function Logout() {
  client.resetStore();
  localStorage.removeItem('token');

  return <Redirect to="/" />;
}
