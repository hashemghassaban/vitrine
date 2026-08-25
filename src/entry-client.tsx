import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ROUTER_BASENAME } from "./helpers/constants.ts";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router basename={ROUTER_BASENAME}>
      <App />
    </Router>
  </StrictMode>
);
