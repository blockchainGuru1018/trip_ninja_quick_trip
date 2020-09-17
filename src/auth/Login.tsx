import React from 'react';
import './Login.css';
import LoginForm from './LoginForm';
import MarketingPanel from './MarketingPanel';
import { AuthDetails } from './AuthInterfaces';
import { login } from '../actions/AuthActions';
import logo from '../assets/images/trip_ninja_logo.png';

interface LoginProps{
  authDetails: AuthDetails
  login: typeof login
}

class Login extends React.Component<LoginProps> {
  render() {
    return (
      <div className="row">
        <div className="col-xl-4 col-lg-6 login-col">
          <img src={logo} width="133" height="40" className="logo-img" alt="" loading="lazy" />
          <LoginForm
            login={this.props.login}
            authenticated={this.props.authDetails.authenticated}
            invalidAuth={this.props.authDetails.invalidAuth}
          />
        </div>
        <div className="col-xl-8 col-lg-6 marketing-panel">
          <MarketingPanel />
        </div>
      </div>
    );
  }
}

export default Login;
