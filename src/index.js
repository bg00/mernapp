import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//Now import your Router for your routes and wrap your app in it.
import { BrowserRouter } from "react-router-dom";
//import Provider to connect your app component to the store,  by wrapping your BrowserRouter
import { Provider } from "react-redux";
//import the store that will be your store for your app .
import store from "./redux/store";
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById("root")
// );
// registerServiceWorker();


// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();