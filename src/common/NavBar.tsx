import React from 'react';
import './NavBar.css';
import logo from './trip_ninja_logo.png';

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/">
          <img src={logo} width="106" height="32" alt="" loading="lazy" />
        </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/">Flight Search<span className="sr-only">(current)</span></a>
              </li>
            </ul>
          </div>
      </nav>
    )
  }
}

export default NavBar