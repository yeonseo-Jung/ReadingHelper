import axios from "axios";
const API_URL = "http://localhost:8080/login/callback/";

const login = (email, password) => {
  const data = {
    type: "login",
    email,
    password,
  };
  return axios({
    method: "POST",
    url: API_URL + "own",
    params: data,
  }).then((response) => {
    console.log("response", response);
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

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

const register = (email, password) => {
  console.log("register", email);
};

const logout = () => {
  console.log("logout");
  localStorage.removeItem("user");
  console.log("current user auth: ", localStorage.getItem("user"));
};
export default { register, login, logout, getNaverUrl, getKakaoUrl, socialLogin };
