import React from "react";
import FormGroup from "./FormGroup";
import FormCheck from "./FormCheck";
import Button from "./Button";
import styles from "./Form.module.scss";

const Form = () => {
  return (
    <form className={styles["form"]}>
      <h2 className={`text-heading ${styles["form__heading"]}`}>
        Create an account
      </h2>
      <div className={styles["form__inputs"]}>
        <FormGroup text="Your email address" name="email" inputType="text" />
        <FormGroup text="Your password" name="password" inputType="password" />
        <FormGroup
          text="Confirm your password"
          name="passwordConfirm"
          inputType="password"
        />
        <FormGroup text="Your full name" name="fullName" inputType="text" />
        <FormGroup
          text="Your phone number"
          name="phoneNumber"
          inputType="text"
        />
      </div>
      <div className={styles["form__terms"]}>
        <FormCheck
          name="termsCheck"
          inputType="checkbox"
          text={"I read and agree Terms and Conditions"}
        />
      </div>
      <div className={styles["form__submit"]}>
        <Button
          type="submit"
          text="Create account"
          className="button_unstyled bg-blue-button bg-blue-button-hover text-blue-button text-center"
        />
      </div>
    </form>
  );
};

export default Form;
