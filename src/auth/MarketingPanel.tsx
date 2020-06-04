import React from 'react';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import marketingImage from '../assets/images/login_marketing_image.png';

const MarketingButton = styled(Button)({
  margin: '10px 0px',
  backgroundColor: '#45565E',
  color: '#ffffff',
  textTransform: 'none',
  width: '100%',
  fontFamily: 'NeuzeitGro-Bol'
});


class MarketingPanel extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-xl-6">
          <h1>How efficient is your booking process?</h1>
          <div className="row">
            <div className="col-xl">
              <h4>Empower travel agents to find the best complex itineraries in seconds, so your team can do more with less.</h4>
              <MarketingButton
                variant="contained"
                id="website-link-button"
                size="large"
                href="https://www.tripninja.io/book-a-demo">
                See how Trip Ninja increases agent efficiency
              </MarketingButton>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <img src={marketingImage} width="100%" alt="" />
        </div>        
      </div>
    )
  }
}

export default MarketingPanel;