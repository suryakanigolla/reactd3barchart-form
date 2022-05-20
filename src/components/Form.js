import React, { useState, forwardRef } from "react";
import classNames from "classnames";
import FormGroup from "./FormGroup";
import FormCheck from "./FormCheck";
import Button from "./Button";
import { validEmail, validPhone } from "constants/regexHelpers";
import styles from "./Form.module.scss";

const initialFormState = {
  email: "",
  password: "",
  passwordConfirm: "",
  fullName: "",
  phoneNumber: "",
  termsCheck: false,
};

const initialFormErrorState = {
  emailError: "",
  passwordError: "",
  passwordConfirmError: "",
  fullNameError: "",
  phoneNumberError: "",
  termsCheckError: "",
};

const Form = forwardRef(({ handleAnimation }, ref) => {
  const [formBody, setFormBody] = useState(initialFormState);
  const [formError, setFormError] = useState(initialFormErrorState);

  const buttonClassnames = classNames({
    [`${styles["form__submit"]}`]: true,
    [`${styles["form__submit--disabled"]}`]: !formBody.termsCheck,
  });

  const handleChange = (e) => {
    if (e.target.name !== "termsCheck") {
      setFormBody((prev) => ({
        ...prev,
        [`${e.target.name}`]: e.target.value,
      }));
      handleValidate(e.target.name, e.target.value);
    } else {
      const value = e.target.checked;
      setFormBody((prev) => ({ ...prev, termsCheck: value }));
    }
  };

  const handleValidate = (name, value) => {
    switch (name) {
      case "email":
        if (!validEmail.test(value)) {
          setFormError((prev) => ({
            ...prev,
            [`${name}Error`]: "Invalid Email Address",
          }));
        } else {
          setFormError((prev) => ({ ...prev, [`${name}Error`]: "" }));
        }
        break;
      case "password":
        if (value.length < 6) {
          setFormError((prev) => ({
            ...prev,
            [`${name}Error`]: "Password should be atleast 6 characters long",
          }));
        } else {
          setFormError((prev) => ({ ...prev, [`${name}Error`]: "" }));
        }
        break;
      case "passwordConfirm":
        if (value !== formBody.password || value.length < 1) {
          setFormError((prev) => ({
            ...prev,
            [`${name}Error`]: "Password mismatch",
          }));
        } else {
          setFormError((prev) => ({ ...prev, [`${name}Error`]: "" }));
        }
        break;
      case "fullName":
        if (value.length < 3) {
          setFormError((prev) => ({
            ...prev,
            [`${name}Error`]: "Name should be atleast 6 characters long",
          }));
        } else {
          setFormError((prev) => ({ ...prev, [`${name}Error`]: "" }));
        }
        break;
      case "phoneNumber":
        if (!validPhone.test(value)) {
          setFormError((prev) => ({
            ...prev,
            [`${name}Error`]: "Invalid Phone Number",
          }));
        } else {
          setFormError((prev) => ({ ...prev, [`${name}Error`]: "" }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const property in formBody) {
      if (
        formBody[property].length < 1 ||
        formError[`${property}Error`].length > 0
      ) {
        handleValidate(property, formBody[property]);
        return;
      }
    }
    handleAnimation(true);
  };

  return (
    <form className={styles["form"]} onSubmit={handleSubmit} ref={ref}>
      <h2 className={`text-heading ${styles["form__heading"]}`}>
        Create an account
      </h2>
      <div className={styles["form__inputs"]}>
        <FormGroup
          text="Your email address"
          name="email"
          inputType="text"
          onChange={handleChange}
          value={formBody.email}
          invalidFeedback={formError.emailError}
          isInvalid={formError.emailError.length > 0}
          isValid={
            formError.emailError.length === 0 && formBody.email.length > 0
          }
        />
        <FormGroup
          text="Your password"
          name="password"
          inputType="password"
          onChange={handleChange}
          value={formBody.password}
          invalidFeedback={formError.passwordError}
          isInvalid={formError.passwordError.length > 0}
          isValid={
            formError.passwordError.length === 0 && formBody.password.length > 0
          }
        />
        <FormGroup
          text="Confirm your password"
          name="passwordConfirm"
          inputType="password"
          onChange={handleChange}
          value={formBody.passwordConfirm}
          invalidFeedback={formError.passwordConfirmError}
          isInvalid={formError.passwordConfirmError.length > 0}
          isValid={
            formError.passwordConfirmError.length === 0 &&
            formBody.passwordConfirm.length > 0
          }
        />
        <FormGroup
          text="Your full name"
          name="fullName"
          inputType="text"
          onChange={handleChange}
          value={formBody.fullName}
          invalidFeedback={formError.fullNameError}
          isInvalid={formError.fullNameError.length > 0}
          isValid={
            formError.fullNameError.length === 0 && formBody.fullName.length > 0
          }
        />
        <FormGroup
          text="Your phone number"
          name="phoneNumber"
          inputType="tel"
          onChange={handleChange}
          value={formBody.phoneNumber}
          invalidFeedback={formError.phoneNumberError}
          isInvalid={formError.phoneNumberError.length > 0}
          isValid={
            formError.phoneNumberError.length === 0 &&
            formBody.phoneNumber.length > 0
          }
        />
      </div>
      <div className={styles["form__terms"]}>
        <FormCheck
          name="termsCheck"
          inputType="checkbox"
          text={"I read and agree Terms and Conditions"}
          onChange={handleChange}
          value={formBody.termsCheck}
        />
      </div>
      <div className={buttonClassnames}>
        <Button
          type="submit"
          text="Create account"
          disabled={!formBody.termsCheck}
          className="button_unstyled bg-blue-button bg-blue-button-hover text-blue-button text-center"
        />
      </div>
    </form>
  );
});

export default Form;
