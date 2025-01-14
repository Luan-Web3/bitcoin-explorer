import "./index.css";

import App from "./App.tsx";
import { StrictMode } from "react";
import Topnavbar from "./components/Topnavbar/Topnavbar.tsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <Topnavbar /> */}
    <App />
  </StrictMode>
);
