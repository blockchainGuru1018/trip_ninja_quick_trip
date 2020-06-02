import { AuthDetails } from '../auth/AuthInterfaces';

function authDetailsReducer(state: AuthDetails = {} as any, action: any) {
  console.log(state)
  switch(action.type) {

    case 'SET_USER':
      return {
        ...state,
        items: action.payload
      }

    case 'SET_AUTH_TOKEN':
      console.log('setting token')
      return {
        ...state,
        authToken: action.authToken
      }

    default:
      return state;
  }
}

export default authDetailsReducer;