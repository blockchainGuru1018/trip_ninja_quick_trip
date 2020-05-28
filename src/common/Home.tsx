import React from 'react';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  state = {
    loggedIn: true
  }
  render() {
    return this.state.loggedIn
      ? <Redirect to='/search/' />
      : <Redirect to='/login/' />
  }
}

export default Home;
