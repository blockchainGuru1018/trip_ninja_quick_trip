import React from 'react';
import './Login.css';
import LoginForm from './LoginForm';
import MarketingPanel from './MarketingPanel';

class Login extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-4">
          <LoginForm />
        </div>
        <div className="col-sm-8">
          <MarketingPanel />
        </div>
      </div>
    )
  }
}

export default Login;
