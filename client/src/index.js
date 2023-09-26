import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ShowContextProvider } from "./context/ShowContext";
import ThemeContextProvider from "./context/ThemeContext";
import { AuthContextProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import store from "./store";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <ShowContextProvider>
        <AuthContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthContextProvider>
      </ShowContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
