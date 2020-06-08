import { Middleware } from 'redux';
import jwt from 'jwt-decode';
import store from './Store';
import API from './Api';
import { logout } from './actions/AuthActions'

const tokenExpired = (token: string) => {
  if (token === '') {
    return true
  }
  const decoded: any = jwt(token);
  const expiration: Date = new Date(decoded.exp * 1000);
  return expiration < new Date();
}

export const jwtMiddleware: Middleware = () => next => async action => {
  const token: string = localStorage.getItem('token') || '';
  if (token === '') {
    return next(action)
  }
  else if(tokenExpired(token)) {
    await getRefreshToken()
    return next(action);
  }
  else {
    return next(action);
  }
};

const getRefreshToken = async() => {
  const refreshToken: string = localStorage.getItem('refreshToken') || ''
  if(!tokenExpired(refreshToken)) {
    return await API.post('/token/refresh/', {'refresh': refreshToken})
      .then((response: any) => {
        localStorage.setItem('token', response.data.access);
      })
  }
  else {
    store.dispatch(logout())
  }
}