import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import DoctorHome from "./DoctorHome";
import App from "./App"; // Other page/component, e.g., your Todos page
import "./index.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

// Configure Amplify with your backend outputs
Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DoctorHome />} />
          <Route path="/todos" element={<App />} />
          {/* Add additional routes here if needed */}
        </Routes>
      </BrowserRouter>
    </Authenticator>
  </React.StrictMode>
);
