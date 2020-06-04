import { AuthDetails, defaultAuth } from '../auth/AuthInterfaces';

function authDetailsReducer(state: AuthDetails = {} as any, action: any) {

  switch(action.type) {

    case 'SET_USER':
      return {
        ...state,
        userEmail: action.email
      }

    case 'SET_AUTH_TOKEN':
      console.log('setting token')
      return {
        ...state,
        authToken: action.authToken
      }

    case 'AUTHENTICATE_USER':
      return {
        ...state,
        authenticated: action.authenticate
      }

    case 'SET_USER_PARAMETERS':
      return {
        ...state,
        userEmail: action.parameters.user_email,
        userFirstName: action.parameters.first_name,
        userLastName: action.parameters.last_name,
        dateType: action.parameters.date_type,
        studentAndYouth: action.parameters.student_and_youth
      }

    case 'SET_AUTH_INVALID':
      return {
        ...state,
        invalidAuth: action.status
      }

    case 'RESET_AUTH':
      return defaultAuth

    default:
      return state;
  }
}

export default authDetailsReducer;