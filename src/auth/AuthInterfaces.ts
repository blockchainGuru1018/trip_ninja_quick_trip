
export interface AuthDetails {
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  authenticated: boolean;
  currency: string;
  dateType: string;
  studentAndYouth: boolean;
  invalidAuth: boolean;
}

export const defaultAuth = {
  userEmail: '',
  userFirstName: '',
  userLastName: '',
  authenticated: false,
  dateType: 'MMM dd yyyy',
  studentAndYouth: false,
  invalidAuth: false
};