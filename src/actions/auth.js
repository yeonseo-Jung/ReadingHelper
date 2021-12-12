import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from "./types";
import AuthService from "../service/auth_service";
// AuthService를 통해 서버와 통신을 하고,
// sdispatch를 이용해 reducer에게 해당 결과에 대한 작업을 요청

// 자체 로그인
export const login = (userInfo) => (dispatch) => {
  return AuthService.login(userInfo).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

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
};

// 카카오, 네이버의 소셜 로그인
export const socialLogin =
  ({ type, params }) =>
  (dispatch) => {
    return AuthService.socialLogin(type, params).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });

        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

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
  };

// 로그아웃
export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

// 로그인 화면 Url 받기
export const getNaverUrl = () => {
  AuthService.getNaverUrl();
};

export const getKakaoUrl = () => {
  AuthService.getKakaoUrl();
};

// 회원 가입
export const register = (userInfo) => (dispatch) => {
  return AuthService.register(userInfo).then(
    (data) => {
      console.log("regi, ", data);
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

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
