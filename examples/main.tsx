import React from "react";
import ReactDOM from "react-dom/client";
import { BasicExample, CustomColorsExample } from "./BasicUsage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "3rem", padding: "2rem" }}>
      <BasicExample />
      <CustomColorsExample />
    </div>
  </React.StrictMode>
);

