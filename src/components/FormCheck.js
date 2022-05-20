import React from "react";
import classNames from "classnames";
import styles from "./FormCheck.module.scss";

const FormCheck = ({ text, name, inputType, value, onChange, isInvalid }) => {
  const checkboxClassname = classNames({
    [`${styles["form-check__input"]}`]: true,
  });

  const checkboxTermsClassname = classNames({
    [`${styles["form-check__terms"]}`]: true,
  });
  return (
    <div className={styles["form-check"]}>
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        className={checkboxClassname}
        name={name}
        id={name}
      />
      <label htmlFor={name} className={checkboxTermsClassname}>
        {text}
      </label>
    </div>
  );
};

export default FormCheck;
