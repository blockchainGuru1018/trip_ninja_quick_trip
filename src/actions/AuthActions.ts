import API from '../Api';
import { setValue, resetSearch } from './SearchActions';

export const login = (email: string, password: string) => {
  return function(dispatch: any) {
    API.post('/token/', {'email': email, 'password': password})
      .then(
        (response: any) => {
          localStorage.setItem('token', response.data.access)
          localStorage.setItem('refreshToken', response.data.refresh)
          dispatch(fetchUserParameters())
        }
      )
      .catch(
        
      )
  }
}

export const logout: any = () => {
  return function(dispatch: any) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    dispatch(authenticateUser(false));
    dispatch(resetAuth());
    dispatch(resetSearch());
  }
}

export const fetchUserParameters = () => (dispatch: any) => {
  dispatch(authenticateUser(true))
  API.get('/get_user_details/')
    .then((response: any) => {
      dispatch({
        type: 'SET_USER_PARAMETERS',
        parameters: response.data
      })
      dispatch(setValue('currency', response.data.currency));
    })
}

function resetAuth() {
  return {
    type: 'RESET_AUTH'
  }
}

function authenticateUser(authenticate: boolean) {
  return {
    type: 'AUTHENTICATE_USER',
    authenticate
  }
}

