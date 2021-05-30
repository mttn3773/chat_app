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
import { InputField } from "./InputField";

interface RegisterFormProps {}

interface IValues {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

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
  const handleSubmit = async (values: IValues) => {
    const res = await request({
      url: config.endpoints.register,
      method: "POST",
      body: values,
    });
    dispatchNotify(dispatch, res, notify);
    const { user } = res.data;
    return dispatch(setUser(user));
  };
  const initialValues: IValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  return (
    <div className="form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignUpValidationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" />
            <InputField name="email" />
            <InputField name="password" type="password" />
            <InputField name="confirm_password" type="password" />
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
