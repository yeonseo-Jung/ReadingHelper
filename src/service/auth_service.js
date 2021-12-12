import axios from "axios";
const API_URL = "http://localhost:8080/login/callback/";
// 서버와 통신, API_URL + "필요한 동작"으로 이뤄진 url로 서버와 REST API 통신을 수행

// 로그인: accessToken을 발급 받았다면 유저 정보를 localStorage에 "user"로 저장
const login = (userInfo) => {
  return axios({
    method: "POST",
    url: API_URL + "own",
    params: userInfo,
  }).then((response) => {
    console.log("response", response);
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

// 소셜 로그인: 로그인과 로직 동일
const socialLogin = (type, params) => {
  return axios({
    method: "POST",
    url: API_URL + type,
    params,
  }).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    console.log("response", response.data);
    return response.data;
  });
};

// 로그아웃: localStorage에서 "user"를 삭제
const logout = () => {
  console.log("logout");
  localStorage.removeItem("user");
  console.log("current user auth: ", localStorage.getItem("user"));
};

// 네이버는 서버로부터 로그인 url을 받아야 함
const getNaverUrl = () => {
  return axios({
    method: "GET",
    url: API_URL + "naverUrl",
  }).then((response) => {
    console.log("response", response.data);
    window.location.href = response.data;
  });
};

const getKakaoUrl = () => {
  window.location.href = process.env.REACT_APP_KAKAO_AUTH_URL;
};

const register = (userInfo) => {
  return axios({
    method: "POST",
    url: API_URL + "own/sign",
    params: userInfo,
  }).then((response) => {
    console.log("response", response);
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

export default { register, login, logout, getNaverUrl, getKakaoUrl, socialLogin };
