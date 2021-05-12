import { Formik, Form, ErrorMessage, Field } from "formik";
import { parse } from "query-string";
import { config } from "../../config/";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { setUser } from "../../store/Actionst";
import { DataContext } from "../../store/GlobalState";
import { dispatchNotify } from "../../utils/dispatchNotify";
import { request } from "../../utils/request";
import "./Form.scss";
import { Redirect } from "react-router";
interface ResetPasswordFormProps {}

interface IValues {
  password: string;
  confirm_password: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({}) => {
  const { dispatch, state } = useContext(DataContext);
  const { notify } = state;
  const { token } = parse(window.location.search);
  const [success, setSuccess] = useState<boolean>(false);
  const ValidationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be at least 8 charecters long"),
    confirm_password: Yup.string()
      .required("Confirm password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleSubmit = async (values: IValues) => {
    const res = await request({
      url: config.endpoints.reset_password,
      method: "PUT",
      body: { password: values.password, token },
    });
    dispatchNotify(dispatch, res, notify);
    if (res.success) setSuccess(true);
    return;
  };
  const initialValues: IValues = {
    password: "",
    confirm_password: "",
  };
  if (success) return <Redirect to="/" />;
  return (
    <div className="form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={ValidationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="field-container">
              <label htmlFor="password">Enter new password</label>
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
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
