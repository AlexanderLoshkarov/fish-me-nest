import axios from "axios";
import authActions from "./authActions";

axios.defaults.baseURL = "http://localhost:3000/";

/* POST @ /login
 * body: { email, password }
 * После успешного логина добавляем токен в HTTP-заголовок */

const logIn =
  ({ userName, password }) =>
  (dispatch) => {
    dispatch(authActions.loginRequest());
    axios
      .post("/login", { userName: userName, password: password })
      .then((response) => {
        dispatch(authActions.loginSuccess(response.data));
      })
      .catch((error) => {
        dispatch(authActions.loginError(error));
      });
  };

/* POST @ /logout
 * headers:
 *    Authorization: Bearer token
 * После успешного логаута, удаляем токен из HTTP-заголовка */

const logOut = () => (dispatch) => {
  dispatch(authActions.logoutRequest());
  dispatch(authActions.logoutSuccess());
  dispatch(authActions.logoutError());
};

export { logIn, logOut };
