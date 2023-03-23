import React from "react";
import { useFederatedComponent } from "../../Utils";
import "./styles.css";

function App() {
  const [{ module, scope, url }, setSystem] = React.useState<any>({});

  function setApp1() {
    setSystem({
      url: "http://localhost:3001/remoteEntry.js",
      scope: "app1",
      module: "./Widget"
    });
  }

  function setApp2() {
    setSystem({
      url: "http://localhost:3002/remoteEntry.js",
      scope: "app2",
      module: "./Widget"
    });
  }

  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(
    url,
    scope,
    module
  );

  return (
    <div>
      <h2>Shell App </h2>
      <p>
        The Dynamic System will take advantage Module Federation{" "}
        <strong>remotes</strong> and <strong>exposes</strong>. It will no load
        components that have been loaded already.
      </p>
      <button class="btn" onClick={setApp1}>
        Load App 1 Widget
      </button>
      <button class="btn" onClick={setApp2}>
        Load App 2 Widget
      </button>
      <div style={{ marginTop: "2em" }}>
        <React.Suspense fallback="Loading System">
          {errorLoading
            ? `Error loading module "${module}"`
            : FederatedComponent && <FederatedComponent />}
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
