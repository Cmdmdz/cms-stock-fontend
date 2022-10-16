// import { history } from "../index";
import {
  OK,
  LOGIN_FAILED,
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  server,
  AUTH,
  LOGOUT,
} from "../Constants";
import { User } from "../types/user.type";
import { httpClient } from "../utils/httpclient";
import { LoginResult } from "../types/authen.type";

export const setLoginFetchingToState = () => ({
  type: LOGIN_FETCHING,
});

export const setLoginSuccessToState = (payload: LoginResult) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const setLoginFailedToState = () => ({
  type: LOGIN_FAILED,
});

export const setLogoutToState = () => ({
  type: LOGOUT,
});

export const login = (user: User, navigate: any) => {
  return async (dispatch: any) => {
    try {
      // begin connecting...
      dispatch(setLoginFetchingToState());
      // connect
      const result = await httpClient.post<LoginResult>(server.LOGIN_URL, user);
      if (result.status === 200) {

        localStorage.setItem(AUTH, result.data.auth!);
        dispatch(setLoginSuccessToState(result.data));
        navigate("/stock");

      } else {
        dispatch(setLoginFailedToState());
      }
    } catch (error) {
      // error
      dispatch(setLoginFailedToState());
    }
  };
};

export const restoreLogin = () => {
  return (dispatch: any) => {
    const auth = localStorage.getItem(AUTH);
    if (auth) {
      dispatch(
        setLoginSuccessToState({
          result: OK,
          auth,
          message: "Login successfully",
        })
      );
    }
  };
};

export const logout = (navigate: any) => {
  return (dispatch: any) => {
    localStorage.removeItem(AUTH);
    dispatch(setLogoutToState());
    navigate("/login");
  };
};
