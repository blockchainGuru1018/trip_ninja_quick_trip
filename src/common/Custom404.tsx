import React from 'react';
import logo from "../assets/images/trip_ninja_logo.png";
import rerouting from "../assets/images/rerouting_1.png"
import Button from "@material-ui/core/Button";
import history from '../History';
import './Common.css';
import { withTranslation, WithTranslation } from 'react-i18next';

class Custom404 extends React.Component<WithTranslation> {
  render() {
    return (
      <div className="row four-o-four-container">
        <div className="col-xl-12 four-o-four-logo-container">
          <a href='/'>
            <img src={logo} width="133" height="40" className="logo-img" alt="" loading="lazy" />
          </a>
        </div>
        <div className='col-xl-12 four-o-four-content-container'>
          <div className='row four-o-four-content-row'>
            <div className='col-xl-6 col-lg-12 order-0 four-o-four-image-container order-xl-1'>
              <img src={rerouting} width="492" height="405" className="logo-img" alt="" loading="lazy" />
            </div>
            <div className='col-xl-6 col-lg-12 order-1 four-o-four-text-container order-xl-0' >
              <h1>{this.props.t("common.custom404.title")}</h1>
              <h4>
                {this.props.t("common.custom404.subHeader")}
                <span><a href="https://help.tripninja.io/" className='hot-link'>{this.props.t("common.custom404.helpCentre")}</a></span>
                {this.props.t("common.custom404.subHeaderEnding")}
              </h4>
              <h4>
                {this.props.t("common.custom404.missingLinkPrompt")}<a href="mailto:hello@tripninja.io" className='hot-link'>{this.props.t("common.custom404.missingLinkCTA")}</a>
              </h4>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push('/search/')}
              >{this.props.t("common.custom404.back")}</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(Custom404);
