import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RegisterUserVariables } from '../../generated/components';

const validationSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(8)
    .required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')]),
});

export function RegistrationForm() {
  const handleSubmit = () => null;
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      render={formProps => {
        return (
          <Form className="form">
            <label>
              First name
              <Field type="text" name="firstName" placeholder="First Name" />
              <ErrorMessage name="firstName" />
            </label>
            <label>
              Last name
              <Field type="text" name="lastName" placeholder="First Name" />
              <ErrorMessage name="lastName" />
            </label>
            <label>
              Email
              <Field type="text" name="email" placeholder="Email address" />
              <ErrorMessage name="email" />
            </label>
            <div className="u-row">
              <label className="u-x1of2">
                Password
                <Field type="password" name="password" />
                <ErrorMessage name="password" />
              </label>
              <label className="u-x1of2">
                Confirm password
                <Field type="password" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" />
              </label>
            </div>

            <button type="submit" disabled={formProps.isSubmitting}>
              Submit Form
            </button>
          </Form>
        );
      }}
    />
  );
}
