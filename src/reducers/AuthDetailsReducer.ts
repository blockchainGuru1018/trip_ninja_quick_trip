import { AuthDetails, defaultAuth } from '../auth/AuthInterfaces';
import { dateFormats } from '../helpers/DateHelpers';

function authDetailsReducer(state: AuthDetails = {} as any, action: any) {

  switch(action.type) {

    case 'SET_USER':
      return {
        ...state,
        userEmail: action.email
      };

    case 'SET_AUTH_TOKEN':
      return {
        ...state,
        authToken: action.authToken
      };

    case 'AUTHENTICATE_USER':
      return {
        ...state,
        authenticated: action.authenticate
      };

    case 'SET_USER_PARAMETERS':
      window.analytics.identify(action.parameters.user_email, {
        userEmail: action.parameters.user_email,
        userFirstName: action.parameters.first_name,
        agency: action.parameters.agency,
      });

      window.analytics.group(action.parameters.agency);

      return {
        ...state,
        userEmail: action.parameters.user_email,
        userFirstName: action.parameters.first_name,
        userLastName: action.parameters.last_name,
        dateType: dateFormats[action.parameters.date_type] || 'dd/MM/yyyy',
        studentAndYouth: action.parameters.student_and_youth,
        pcc: action.parameters.pcc,
        provider: action.parameters.provider,
        agency: action.parameters.agency,
        ticketing_queue: action.parameters.ticketing_queue,
        isAgencyAdmin: action.parameters.is_group_admin,
        isSuperUser: action.parameters.is_superuser,
        bookingDisabled: action.parameters.booking_disabled,
        virtualInterliningAccess: action.parameters.virtual_interlining,
        markupVisible: action.parameters.markup_visible,
        viewPnrPricing: action.parameters.view_pnr_pricing
      };

    case 'SET_AUTH_INVALID':
      return {
        ...state,
        invalidAuth: action.status
      };

    case 'RESET_AUTH':
      return defaultAuth;

    default:
      return state;
  }
}

export default authDetailsReducer;