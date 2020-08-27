
export interface AuthDetails {
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  authenticated: boolean;
  currency: string;
  dateType: string;
  studentAndYouth: boolean;
  invalidAuth: boolean;
  pcc: string;
  provider: string;
  agency: string;
  ticketing_queue: string;
  isAgencyAdmin: boolean;
  isSuperUser: boolean;
  bookingDisabled: boolean;
}

export const defaultAuth = {
  userEmail: '',
  userFirstName: '',
  userLastName: '',
  authenticated: false,
  dateType: 'MMM dd yyyy',
  studentAndYouth: false,
  invalidAuth: false,
  pcc: '',
  provider: '',
  isAgencyAdmin: false,
  isSuperUser: false,
  bookingDisabled: false,
  currency: 'CAD',
  agency: '',
  ticketing_queue: ''
};