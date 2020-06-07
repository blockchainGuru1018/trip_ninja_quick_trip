import React from 'react';
import './NavBar.css';
import logo from '../assets/images/trip_ninja_logo.png';
import { logout } from '../actions/AuthActions';
import UserMenu from '../common/UserMenu';
import { AuthDetails } from '../auth/AuthInterfaces';

interface NavBarProps {
  logout: typeof logout
  authDetails: AuthDetails
}

class NavBar extends React.Component<NavBarProps> {
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
              <a className="nav-link" href="/search/">Flight Search<span className="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
        <UserMenu
          logout={this.props.logout}
          authDetails={this.props.authDetails}
        />
      </nav>
    )
  }
}

export default NavBar;
