import React from 'react';
import { RegisterUserComponent } from '../../generated/components';
export function RegisterUser() {
  const firstNameField = React.createRef<HTMLInputElement>();
  const lastNameField = React.createRef<HTMLInputElement>();
  const emailField = React.createRef<HTMLInputElement>();
  const passwordField = React.createRef<HTMLInputElement>();

  return (
    <RegisterUserComponent>
      {(registerUser, { loading, error }) => {
        const handleSubmit: React.FormEventHandler = e => {
          e.preventDefault();
          const firstName = firstNameField.current
            ? firstNameField.current.value
            : null;
          const lastName = lastNameField.current
            ? lastNameField.current.value
            : null;
          const email = emailField.current ? emailField.current.value : null;
          const password = passwordField.current
            ? passwordField.current.value
            : null;

          if (firstName && lastName && email && password) {
            return registerUser({
              variables: {
                firstName,
                lastName,
                email,
                password,
              },
            });
          }
        };
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Error: {String(error)}</div>;
        }
        return (
          <form onSubmit={handleSubmit}>
            <label>
              First name
              <input ref={firstNameField} type="text" name="firstName" />
            </label>
            <label>
              Last name
              <input ref={lastNameField} type="text" name="lastName" />
            </label>
            <label>
              Email
              <input ref={emailField} type="email" name="email" />
            </label>
            <label>
              Password
              <input ref={passwordField} type="password" name="password" />
            </label>
            <input type="submit" value="Registrer bruker" />
          </form>
        );
      }}
    </RegisterUserComponent>
  );
}
