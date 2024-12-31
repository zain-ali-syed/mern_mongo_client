import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ExerciseContextProvider } from "./contexts/ExerciseContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ExerciseContextProvider>
      <App />
    </ExerciseContextProvider>
  </StrictMode>
);
