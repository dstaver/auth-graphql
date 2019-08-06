import React from 'react';
import { LoginComponent } from '../generated/components';
import { LoginForm } from '../Components/Auth/LoginForm';
import { client } from '../ApolloClient';

export function Login() {
  return (
    <LoginComponent>
      {(login, { error, loading, data, called }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>An error occurred {error.message}</p>;
        if (called) {
          if (data && data.authenticate && data.authenticate.jwt) {
            localStorage.setItem('token', data.authenticate.jwt);
            client.writeData({ data: { isLoggedIn: true } });
            return <p>Login successful</p>;
          } else {
            return <p>Login failed</p>;
          }
        }

        return <LoginForm login={login} />;
      }}
    </LoginComponent>
  );
}
