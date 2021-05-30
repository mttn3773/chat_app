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
import { InputField } from "./InputField";
import { parse } from "query-string";

interface LoginFormProps {}

interface IValues {
  email: string;
  password: string;
}

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
  const handleSubmit = async (values: IValues) => {
    const res = await request({
      url: config.endpoints.login,
      method: "POST",
      body: values,
    });
    dispatchNotify(dispatch, res, notify);
    const { user } = res.data;
    return dispatch(setUser(user));
  };
  const initialValues: IValues = {
    email: "",
    password: "",
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignInValidationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="email" />
            <InputField name="password" type="password" />
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
