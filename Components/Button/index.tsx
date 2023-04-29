import React from "react";
import "./style.css";
const Button = function ({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
};

export default Button;
