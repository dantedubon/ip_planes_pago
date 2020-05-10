import React from "react";
import { useField } from "formik";

const InputIp = ({
  controlId,
  label,
  showFeedback = true,
  type,
  groupClassName = "form-group",
  inputClassName = "form-control",
  labelClassName = "",
  helpText,

  ...props
}) => {
  const [field, meta] = useField({ ...props, type: type });
  const isInvalidClass =
    meta.touched && meta.error ? "is-invalid" : "";

  return (
    <div className={groupClassName}>
      <label className={labelClassName} htmlFor={controlId}>{label}</label>

      <input
        className={`${inputClassName} ${isInvalidClass}`}
        id={controlId}
        type={type}
        {...field}
        {...props}
      />
      {helpText && <small className="form-text text-muted">{helpText}</small>}
      {showFeedback && <div className="invalid-feedback">{meta.error}</div>}
    </div>
  );
};

export default InputIp;
