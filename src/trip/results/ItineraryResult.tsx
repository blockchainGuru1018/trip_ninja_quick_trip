import React from 'react';
import './ItineraryResult.css';
import ItineraryPath from './ItineraryPath';
import SegmentNav from './SegmentNav';
import PricingRequest from './PricingRequest';
import { CurrencySymbol } from '../../helpers/CurrencySymbolHelper';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

const ChangeSearchButton = styled(Button)({
  backgroundColor: '#ffffff',
  color: '#45565E',
  border: 'solid 2px #45565E',
  '&:hover': {
    backgroundColor: '#45565E',
    color: '#ffffff',
  }
});

class ItineraryResult extends React.Component {

  render() {
    return (
      <div id="itinerary-result">
        <div className="itinerary-header">
          <div className="row">
            <div className="col-xl-10 col-lg-9">
              <ItineraryPath />
            </div>
            <div className="col-xl-2 col-lg-3">
              <div className="float-right">
                <ChangeSearchButton
                  color="secondary"
                  variant="contained"
                  href="/search">
                  Change Search
                </ChangeSearchButton>
              </div>
            </div>
          </div>
          <hr/>
          <h1>Your Itinerary</h1>
          <h4><strong>Total:</strong>{CurrencySymbol("CAD")} $10,000 | 1 ADT</h4>
          <div className="row">
            <div className="col-md-8">

            </div>
            <div className="col-md-4">
              <PricingRequest />
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-sm-3">
            <SegmentNav />
          </div>
          <div className="col-sm-9">
            
          </div>
        </div>
      </div>
    );
  }
}

export default ItineraryResult;
