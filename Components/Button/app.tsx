import App from "./index";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <App text={"Click me"} onClick={() => alert("Hello!")} />,
  document.getElementById("root")
);
