import React from 'react';
import logo from "../assets/images/trip_ninja_logo.png";
import rerouting from "../assets/images/rerouting_1.png"
import Button from "@material-ui/core/Button";
import history from '../History';
import './Common.css';

class Custom404 extends React.Component {
  render() {
    return (
        <div className="row four-o-four-container">
          <div className="col-xl-12 four-o-four-logo-container">
            <img src={logo} width="133" height="40" className="logo-img" alt="" loading="lazy" />
          </div>
          <div className='col-xl-12 four-o-four-content-container'>
            <div className='four-o-four-text-container'>
              <h1>404 - The page was not found</h1>
              <h4>
                Oops! We can’t find the page you are looking for. It’s not you, it’s us.
                Try starting from our <span><a href="https://help.tripninja.io/" className='hot-link'>Help Centre</a></span> to point you in the right direction.
              </h4>
              <h4>
                Is something not where it should be? <a href="mailto:hello@tripninja.io" className='hot-link'>Let us know.</a>
              </h4>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push('/search/')}
              >Back to home</Button>
            </div>
            <div className='four-o-four-image-container'>
              <img src={rerouting} width="492" height="405" className="logo-img" alt="" loading="lazy" />
            </div>
          </div>
        </div>
    );
  }
}

export default Custom404;