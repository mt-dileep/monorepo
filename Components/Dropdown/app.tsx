import App from "./src/index";
import React from "react";
import ReactDOM from "react-dom";

const options = [
  { label: "red", value: "1" },
  { label: "green", value: "2" }
];
ReactDOM.render(<App options={options} />, document.getElementById("root"));
