import { Dispatch } from "redux";

import axios from "../../../Api";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./actionTypes";

function loginRequest() {
  return { type: LOGIN_REQUEST };
}

function loginSuccess() {
  return { type: LOGIN_SUCCESS };
}

function loginFailure() {
  return { type: LOGIN_FAILURE };
}

export function login(data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(loginRequest());
    try {
      const resp = await axios.post('/api/v1/settings/', data);
      dispatch(loginSuccess());
      localStorage.setItem('authInfo', JSON.stringify(resp.data.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };
}