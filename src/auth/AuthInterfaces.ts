
export interface AuthDetails {
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  authenticated: boolean;
  currency: string;
  dateType: string;
  studentAndYouth: boolean;
  invalidAuth: boolean;
  agency: string;
  ticketing_queue: string;
  isAgencyAdmin: boolean;
  isSuperUser: boolean;
  bookingDisabled: boolean;
  virtualInterliningAccess: boolean;
  markupVisible: boolean;
  viewPnrPricing: boolean;
}

export const defaultAuth = {
  userEmail: '',
  userFirstName: '',
  userLastName: '',
  authenticated: false,
  dateType: 'MMM dd yyyy',
  studentAndYouth: false,
  invalidAuth: false,
  isAgencyAdmin: false,
  isSuperUser: false,
  bookingDisabled: false,
  currency: 'CAD',
  agency: '',
  ticketing_queue: '',
  virtualInterliningAccess: false,
  markupVisible: false,
  viewPnrPricing: false
};