import React from "react";
import ReactDOM from "react-dom/client";
import { QueryProvider } from "./providers/QueryProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/toaster";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
    </QueryProvider>
  </React.StrictMode>
);
