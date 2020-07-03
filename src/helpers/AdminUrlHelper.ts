
export const getAdminUrl = () =>
  // TODO: Need to add the appropriate url for prod
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:8001/accounts/password_reset/'
    : ''