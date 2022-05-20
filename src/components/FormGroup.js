import React from "react";
import classNames from "classnames";

import styles from "./FormGroup.module.scss";

const FormGroup = ({
  text,
  name,
  inputType,
  value,
  onChange,
  isInvalid,
  isValid,
  invalidFeedback,
}) => {
  const inputClassname = classNames({
    [`${styles["form-group__input"]}`]: true,
    [`${styles["form-group__input--valid"]}`]: isValid,
    [`${styles["form-group__input--invalid"]}`]: isInvalid,
  });

  const feedbackClassname = classNames({
    [`${styles["form-group__feedback"]}`]: true,
    [`${styles["form-group__feedback--invalid"]}`]: isInvalid,
  });

  return (
    <div className={styles["form-group"]}>
      <label htmlFor={name} className={styles["form-group__label"]}>
        {text}
      </label>
      <input
        name={name}
        className={inputClassname}
        value={value}
        onChange={onChange}
        type={inputType}
      />
      <div className={`fs-100 ${feedbackClassname}`}>{invalidFeedback}</div>
    </div>
  );
};

export default FormGroup;
