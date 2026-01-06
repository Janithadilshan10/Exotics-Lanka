import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./components/ErrorBoundary";
import App from "./App.tsx";
import "./index.css";

// SEO Provider - install with: npm install react-helmet-async
// import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      {/* Uncomment when react-helmet-async is properly installed:
      <HelmetProvider> */}
        <App />
      {/* </HelmetProvider> */}
    </ErrorBoundary>
  </StrictMode>
);
