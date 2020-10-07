import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { loadState, saveState } from "./localStorage/localStorage";
import { throttle } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import thunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState(); //loading data from local storage

//creating Redux store and initialize it with data from the local storage and adding Thunk enhancer
const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

//Saving state data to local storage every 1 second
store.subscribe(
  throttle(() => {
    saveState({
      currentUser: store.getState().currentUser,
      accessToken: store.getState().accessToken,
    });
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
