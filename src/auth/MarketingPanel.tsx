import React from 'react';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import marketingImage from '../assets/images/login_marketing_image.png';
import { withTranslation, WithTranslation } from 'react-i18next';

const MarketingButton = styled(Button)({
  '&:hover': {
    color: "#ffffff",
  }
});


class MarketingPanel extends React.Component<WithTranslation> {
  render() {
    return (
      <div className="row">
        <div className="col-xl-6">
          <h1>{this.props.t("auth.marketingPanel.header")}</h1>  
          <div className="row">
            <div className="col-sm-9 marketing-description">
              <h4>{this.props.t("auth.marketingPanel.description")}</h4>
            </div>
          </div>
          <MarketingButton
            color="secondary"
            variant="contained"
            id="website-link-button"
            size="large"
            href="https://www.tripninja.io/book-a-demo"
          >
            {this.props.t("auth.marketingPanel.callToAction")}
          </MarketingButton>

        </div>
        <div className="col-xl-6">
          <img src={marketingImage} width="100%" alt="trip-ninja-marketing" />
        </div>        
      </div>
    );
  }
}

export default withTranslation('common')(MarketingPanel);
