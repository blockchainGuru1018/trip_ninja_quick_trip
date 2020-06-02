import React from 'react';
import './Login.css';
import LoginForm from './LoginForm';
import MarketingPanel from './MarketingPanel';
import { AuthDetails } from './AuthInterfaces';
import { login } from '../actions/AuthActions';

interface LoginProps {
  authDetails: AuthDetails
  login: typeof login
}

class Login extends React.Component<LoginProps> {
  render() {
    return (
      <div className="row">
        <div className="col-xl-4 col-lg-6 login-form">
          <LoginForm
            login={this.props.login}
          />
        </div>
        <div className="col-xl-8 col-lg-6 marketing-panel">
          <MarketingPanel />
        </div>
      </div>
    )
  }
}

export default Login;
