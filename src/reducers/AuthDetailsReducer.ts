import { AuthDetails } from '../auth/AuthInterfaces';

function authDetailsReducer(state: AuthDetails = {} as any, action: any) {
  switch(action.type) {

    case 'LOGIN':
      return {
        ...state,
        items: action.payload
      }
  }
}