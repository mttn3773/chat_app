import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";
import "./Form.scss";
interface FormProps {}

export const UserForm: React.FC<FormProps> = ({}) => {
  const SignUpValidationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be at least 8 charecters long"),
    confirm_password: Yup.string()
      .required("Confirm password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  return (
    <div className="form-container">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        }}
        onSubmit={() => {}}
        validationSchema={SignUpValidationSchema}
      >
        {({}) => (
          <Form>
            <div className="field-container">
              <label htmlFor="username">Username</label>
              <ErrorMessage
                name="username"
                component="div"
                className="error-message"
              />
              <Field name="username"></Field>
            </div>
            <div className="field-container">
              <label htmlFor="email">Email</label>
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
              <Field name="email"></Field>
            </div>
            <div className="field-container">
              <label htmlFor="password">Password</label>
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
              <Field name="password" type="password"></Field>
            </div>
            <div className="field-container">
              <label htmlFor="confirm_password">Confirm Password</label>
              <ErrorMessage
                name="confirm_password"
                component="div"
                className="error-message"
              />
              <Field name="confirm_password" type="password"></Field>
            </div>
            <button type="submit"> Sign Up </button>
            <div className="sign-in">
              Have an account? <a href="#">Sign in</a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
