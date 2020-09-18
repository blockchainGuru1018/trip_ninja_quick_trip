import React from 'react';
import './NavBar.css';
import logo from '../assets/images/trip_ninja_logo.png';
import { logout } from '../actions/AuthActions';
import UserMenu from '../common/UserMenu';
import { AuthDetails } from '../auth/AuthInterfaces';
import history from '../History';
import LanguageSelector from '../common/LanguageSelector';

interface NavBarProps {
  logout: typeof logout
  authDetails: AuthDetails
}

class NavBar extends React.Component<NavBarProps> {

  state = {
    lng: 'en'
  };

  render() {
    return (
      <nav className="navbar navbar-light navbar-expand-lg">
        <a className="navbar-brand" href="/">
          <img src={logo} width="106" height="32" alt="" loading="lazy" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="nav-link" onClick={() => history.push('/search/')}>Flight Search<span className="sr-only">(current)</span></div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={() => history.push('/bookings/')}>Bookings<span className="sr-only">(current)</span></div>
            </li>
          </ul>
        </div>
        <LanguageSelector />
        <UserMenu
          logout={() => this.logout()}
          authDetails={this.props.authDetails}
        />
      </nav>
    );
  }

  logout = () => {
    this.props.logout();
    history.push('/')
  }
}

export default NavBar;
