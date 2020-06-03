
export interface AuthDetails {
  userEmail: string;
  authenticated: boolean;
  currency: string;
  dateType: string;
  studentAndYouth: string;
};

export const defaultAuth = {
  userEmail: '',
  authenticated: false,
  dateType: 'USA',
  studentAndYouth: false
};