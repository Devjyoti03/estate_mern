import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: redirectUri,
        }}
        audience={audience}
        scope="openid profile email"
      >
        <App />
      </Auth0Provider>
    </MantineProvider>
  </React.StrictMode>
);
