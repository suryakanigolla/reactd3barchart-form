import React from "react";

const Button = ({ type, text, ...rest }) => {
  return (
    <button {...rest} type={type}>
      {text}
    </button>
  );
};

export default Button;
