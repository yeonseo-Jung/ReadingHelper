import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";
  
  import AuthService from "../service/auth_service";
  
  export const register = (username, password) => (dispatch) => {
    return AuthService.register(username, password).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  // 자체 로그인
  export const login = (type, username, password) => {
    console.log(type);
    switch(type){
        case 'own':
            return ownLogin(username, password);
        case 'kakao':
            kakaoLogin();
            break;
        case 'naver':
            naverLogin();
            break;
        default:
            console.log('error');

    }
  };

  const ownLogin = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        (data) => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: data },
          });
    
          return Promise.resolve();
        },
        (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
    
          dispatch({
            type: LOGIN_FAIL,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
    
          return Promise.reject();
        }
      );
  }
  const kakaoLogin = (username, password) => (dispatch) => {
  
  }

  const naverLogin = () => {
    return axios({
		method: 'GET',
		url: 'http://localhost:8080/login/naver',
	})
		.then((res) => {
			console.log('requestToken:', res.data);
			window.location.href = `${res.data}`;
		})
		.catch((err) => {
			console.error('requestToken error:', err);
		});
}
  

  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };