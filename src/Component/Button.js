import React from "react";

const Button = ({ onSave }) => {
  return (
    <button
      style={{ margin: "20px", padding: "0px 15px 0px 15px" }}
      onClick={onSave}
    >
      Save
    </button>
  );
};

export default Button;
