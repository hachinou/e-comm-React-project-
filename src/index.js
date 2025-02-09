import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./css/components/button.css";
import "./css/components/Alerts.css";
import "./css/components/loading.css";
import "./css/components/google.css";
import "./Pages/Auth/AuthOperations/Auth.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import "react-loading-skeleton/dist/skeleton.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import MenuContext from "./Context/MenuContext";
import WindowContext from "./Context/WindowContext";
import CartChangercontext from "./Context/CartChangerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <CartChangercontext>
          <Router>
            <App />
          </Router>
        </CartChangercontext>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);
