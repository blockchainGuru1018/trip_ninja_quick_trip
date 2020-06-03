
export interface AuthDetails {
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  authenticated: boolean;
  currency: string;
  dateType: string;
  studentAndYouth: string;
};

export const defaultAuth = {
  userEmail: '',
  userFirstName: 'Trip',
  userLastName: 'Ninja',
  authenticated: false,
  dateType: 'USA',
  studentAndYouth: false
};