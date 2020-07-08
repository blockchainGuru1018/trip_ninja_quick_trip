
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
  provider: ''
};