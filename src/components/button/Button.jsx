import React from "react";

const Button = ({ type, classname, value, onclick, disabled }) => {
  return (
    <button
      type={type}
      className={classname}
      onClick={onclick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;
