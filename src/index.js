import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddlerware from "redux-promise";
import reduxThunk from "redux-thunk";
import reducer from "./reducers";
import App from "./app";
import KakaoSearch from "./service/kakaoSearch";
import Library from "./service/library";

const library = new Library();
const kakaoSearch = new KakaoSearch(process.env.REACT_APP_KAKAO_SEARCH_API_KEY);
const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddlerware,
  reduxThunk
)(createStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStoreWidthMiddleware(reducer)}>
      <App kakaoSearch={kakaoSearch} library={library} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
