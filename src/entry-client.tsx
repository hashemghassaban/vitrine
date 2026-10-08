import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ROUTER_BASENAME } from "./helpers/constants.ts";
import App from "./App.tsx";
import { SSRDataProvider, type SSRPageData } from "./contexts/ssrDataContext.tsx";

declare global {
  interface Window {
    __SSR_DATA__?: SSRPageData | null;
  }
}

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <Router basename={ROUTER_BASENAME}>
      <SSRDataProvider value={window.__SSR_DATA__ ?? null}>
        <App />
      </SSRDataProvider>
    </Router>
  </StrictMode>,
);
