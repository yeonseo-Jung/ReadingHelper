import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";

// 서버에서 통신 결과에 대한 메세지를 보냈을 때 처리하는 코드
export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
