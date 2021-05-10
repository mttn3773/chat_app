import { Field, Form, Formik, ErrorMessage } from "formik";
import { Link, Redirect } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import "./Form.scss";
import { request } from "../../utils/request";
import { config } from "../../config";
import { DataContext } from "../../store/GlobalState";
import { setUser } from "../../store/Actionst";
import { dispatchNotify } from "../../utils/dispatchNotify";
interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const { dispatch, state } = useContext(DataContext);
  const { notify } = state;
  const SignInValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be at least 8 charecters long"),
  });

  if (state.user) {
    return <Redirect to="/" />;
  }
  return (
    <div className="form-container">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          const res = await request({
            url: config.endpoints.login,
            method: "POST",
            body: values,
          });
          dispatchNotify(dispatch, res, notify);
          const { user } = res.data;
          return dispatch(setUser(user));
        }}
        validationSchema={SignInValidationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
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
            <button disabled={isSubmitting} type="submit">
              Sign In
            </button>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
            <div className="sign-in">
              Don't have an account? <Link to="/sign-up">Sign up</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
