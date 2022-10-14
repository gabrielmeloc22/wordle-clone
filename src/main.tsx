import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { AttemptProvider } from "./contexts/Attempt";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AttemptProvider>
      <App />
    </AttemptProvider>
  </React.StrictMode>
);
