import API from '../Api'
import store from '../Store'
import { setValue } from './SearchActions'

export const login = (email: string, password: string) => {
  return function(dispatch: any) {
    API.post('/token/', {'email': email, 'password': password})
      .then(
        (response: any) => {
          localStorage.setItem('token', response.data.access)
        }
      )
      .then(() => dispatch(fetchUserParameters()))
      .catch(

      )
  }
}

export function logout() {
  localStorage.removeItem('token')
  return {
    type: 'AUTHENTICATE_USER',
    authenticated: false
  }
}

export const fetchUserParameters = () => (dispatch: any) => {
  dispatch({type: 'AUTHENTICATE_USER', authenticated: true})
  API.get('/get_user_details/')
    .then((response: any) => {
      dispatch({
        type: 'SET_USER_PARAMETERS',
        parameters: response.data
      })
      dispatch(setValue('currency', response.data.currency));
    })
}

function setUser(email: string) {
  return {
    type: 'SET_USER',
    email
  }
}

function setAuthToken(authToken: string) {
  localStorage.setItem('token', authToken)
}

