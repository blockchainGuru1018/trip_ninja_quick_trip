export default [
  {
    title: "Your Preferences",
    children: [
      {
        name: 'Basic Information',
        link: '/admin',
        access_level: 0,
      },
    ]
  },
  {
    title: "Company Defaults",
    children: [
      {
        name: 'General Info',
        link: '/admin/general-info',
        access_level: 1,
      },
      {
        name: 'Content Sources',
        link: '/admin/content-sources',
        access_level: 1,
      },
      {
        name: 'Search/ Booking Details',
        link: '/admin/search-booking-detail',
        access_level: 1,
      },
      {
        name: 'Billing and Account Management',
        link: '/admin/billing-account-management',
        access_level: 1,
      },
    ]
  },
  {
    title: "Settings",
    children: [
      {
        name: 'Users',
        link: '/admin/users',
        access_level: 1,
      },
      {
        name: 'Teams',
        link: '/admin/teams',
        access_level: 1,
      },
      {
        name: 'Agency Accounts',
        link: '/admin/agency-accounts',
        access_level: 2,
      },
    ]
  },
];