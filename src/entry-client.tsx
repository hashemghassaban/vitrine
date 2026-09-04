import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ROUTER_BASENAME } from "./helpers/constants.ts";
import App from "./App.tsx";

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <Router basename={ROUTER_BASENAME}>
      <App />
    </Router>
  </StrictMode>,
);
