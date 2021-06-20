import { ErrorMessage, useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import "./InputField.scss";
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export const InputField: React.FC<InputFieldProps> = ({ name, ...props }) => {
  const [field, {}] = useField(name);
  return (
    <div className="field-container">
      <label htmlFor={name}>{name.toCapitalize()}</label>
      <ErrorMessage name={name} component="div" className="error-message" />
      <input {...field} {...props} name={name} />
    </div>
  );
};
