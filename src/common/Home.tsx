import React from 'react';
import { Redirect } from 'react-router-dom';
import { AuthDetails } from '../auth/AuthInterfaces';

interface HomeProps {
  auth: AuthDetails;
}

class Home extends React.Component<HomeProps> {
  state = {
    loggedIn: true
  }
  render() {
    return this.props.auth.authenticated
      ? <Redirect to='/search/' />
      : <Redirect to='/login/' />
  }
}

export default Home;
