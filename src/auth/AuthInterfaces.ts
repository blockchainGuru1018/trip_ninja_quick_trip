
export interface AuthDetails {
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  authenticated: boolean;
  currency: string;
  dateType: string;
  studentAndYouth: string;
  invalidAuth: boolean;
}

export const defaultAuth = {
  userEmail: '',
  userFirstName: '',
  userLastName: '',
  authenticated: false,
  dateType: 'USA',
  studentAndYouth: false,
  invalidAuth: false
};