import React, { Suspense } from "react";
import moment from "moment";
import { useFederatedComponent } from "../Utils";
import useLogger, { getExtentedLogger } from "./useLogger";
import Dropdown from "dileep_dropdown";

export default function Widget() {
  const logger = getExtentedLogger("_APP", useLogger());

  logger.log("inside widget");
  const [{ module, scope, url }, setSystem] = React.useState({});
  function setApp3() {
    setSystem({
      url: "https://monorepoapp2.vercel.app/remoteEntry.js",
      scope: "app3",
      module: "./Widget"
    });
  }

  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(
    url,
    scope,
    module
  );
  return (
    <div
      style={{
        borderRadius: "4px",
        padding: "2em",
        backgroundColor: "green",
        color: "white"
      }}
    >
      <Dropdown
        options={[
          { label: "red", value: "1" },
          { label: "green", value: "2" }
        ]}
      />
      <h2>App 1 Widget</h2>
      <p>
        Moment shouldn't download twice, the host has no moment.js <br />{" "}
        {moment().format("MMMM Do YYYY, h:mm:ss a")}
      </p>
      <button onClick={setApp3}>Load app 3</button>
      {!errorLoading && (
        <Suspense fallback={"loading app3"}>
          {FederatedComponent && <FederatedComponent />}
        </Suspense>
      )}
    </div>
  );
}
