import React from "react";

const Button = ({ type, classname, value,onclick }) => {
  return (
    <button type={type} className={classname} onClick={onclick}>
      {value}
    </button>
  );
};

export default Button;
