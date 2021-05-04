import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { config } from "../../config";
import { setUser } from "../../store/Actionst";
import { DataContext } from "../../store/GlobalState";
import { dispatchNotify } from "../../utils/dispatchNotify";
import { request } from "../../utils/request";
import "./Form.scss";
interface RegisterFormProps {}

export const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;
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
  if (state.user) {
    return <Redirect to="/" />;
  }
  return (
    <div className="form-container">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        }}
        onSubmit={async (values) => {
          const res = await request({
            url: config.endpoints.register,
            method: "POST",
            body: values,
          });
          dispatchNotify(dispatch, res, notify);
          const { user } = res.data;
          return dispatch(setUser(user));
        }}
        validationSchema={SignUpValidationSchema}
      >
        {({ isSubmitting }) => (
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
            <button disabled={isSubmitting} type="submit">
              Sign Up
            </button>
            <div className="sign-in">
              Have an account? <Link to="/sign-in">Sign in</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
