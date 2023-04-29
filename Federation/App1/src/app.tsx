import LocalButton from "./Widget";
import React from "react";
import useLogger, { getExtentedLogger } from "./useLogger";
const App = () => {
  const logger = getExtentedLogger("_APP", useLogger());
  logger.log("Inside app");
  return (
    <div>
      <h2>App 1</h2>
      <LocalButton />
    </div>
  );
};

export default App;
