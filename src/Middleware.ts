import { Middleware } from 'redux';
import jwt from 'jwt-decode';
import store from './Store';
import API from './Api';
import { logout } from './actions/AuthActions'

export const jwtMiddleware: Middleware = () => next => async action => {
  const token: string = localStorage.getItem('token') || '';
  if(token !== '') {
    const decoded: any = jwt(token);
    const expiration: Date = new Date(decoded.exp * 1000);
    if(expiration < new Date()) {
      await refreshToken()
      return next(action);
    }
    else {
      return next(action);
    }
  }
  else {
    return next(action);
  }
};

const refreshToken = async() => {
  const refreshToken: string = localStorage.getItem('refreshToken') || ''
  if(refreshToken !== '') {
    return await API.post('/token/refresh/', {'refresh': refreshToken})
      .then((response: any) => {
        localStorage.setItem('token', response.data.access);
      })
  }
  else {
    store.dispatch(logout())
  }
}