import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from "./store/index";
import { Provider } from "react-redux";
import Login from "./pages/Login/Login.jsx";
let render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="" component={App} />
        </Switch>
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
render();
store.subscribe(render);
reportWebVitals();
