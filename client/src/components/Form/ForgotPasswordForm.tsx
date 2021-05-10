import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { config } from "../../config";
import { DataContext } from "../../store/GlobalState";
import { dispatchNotify } from "../../utils/dispatchNotify";
import { request } from "../../utils/request";
import "./Form.scss";
interface ForgotPasswordFormProps {}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({}) => {
  const { dispatch, state } = useContext(DataContext);
  const { notify } = state;
  const ValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),
  });
  return (
    <div className="form-container">
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={async (values) => {
          const res = await request({
            url: config.endpoints.sendForgotPasswordEmail,
            method: "POST",
            body: values,
          });
          dispatchNotify(dispatch, res, notify);
        }}
        validationSchema={ValidationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2>Forget Password?</h2>
            <div className="field-container">
              <label htmlFor="email">Enter your email</label>
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
              <Field name="email"></Field>
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
