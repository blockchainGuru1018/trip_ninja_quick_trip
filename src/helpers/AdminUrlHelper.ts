
export const getAdminUrl = () =>
  // TODO: Need to add the appropriate url for prod
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.2:8000/accounts/password_reset/'
    : ''