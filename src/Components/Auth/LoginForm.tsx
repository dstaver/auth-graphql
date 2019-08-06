import React from 'react';
import { LoginMutationFn } from '../../generated/components';

export function LoginForm({ login }: { login: LoginMutationFn }) {
  const emailField = React.createRef<HTMLInputElement>();
  const passwordField = React.createRef<HTMLInputElement>();
  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = e => {
    if (emailField.current && passwordField.current) {
      const email = emailField.current.value;
      const password = passwordField.current.value;
      console.log('Logging in', email, password);
      login({
        variables: {
          email,
          password,
        },
      });
    }
  };
  return (
    <form>
      <label>
        Email
        <input ref={emailField} type="email" name="email" />
      </label>
      <label>
        Password
        <input ref={passwordField} type="password" name="password" />
      </label>
      <button onClick={handleLogin}>Logg inn</button>
    </form>
  );
}
