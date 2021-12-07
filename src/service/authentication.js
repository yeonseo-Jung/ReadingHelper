/* LOGIN */
export function loginRequest(username, password) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(login());
   
        // // API REQUEST
        // return axios.post('/api/account/signin', { username, password })
        // .then((response) => {
        //     // SUCCEED
        //     dispatch(loginSuccess(username));
        // }).catch((error) => {
        //     // FAILED
        //     dispatch(loginFailure());
        // });
    };
  }
   
  export function login() {
      return {
          type: "login"
      };
  }
   
//   export function loginSuccess(username) {
//       return {
//           type: AUTH_LOGIN_SUCCESS,
//           username
//       };
//   }
   
//   export function loginFailure() {
//       return {
//           type: AUTH_LOGIN_FAILURE
//       };
//   }
  