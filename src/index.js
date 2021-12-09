import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./app";
import KakaoSearch from "./service/kakaoSearch";

const kakaoSearch = new KakaoSearch(process.env.REACT_APP_KAKAO_SEARCH_API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <App kakaoSearch={kakaoSearch} />
  </React.StrictMode>,
  document.getElementById("root")
);
