import React from 'react';
import WifiIcon from '@material-ui/icons/Wifi';
import FlightIcon from '@material-ui/icons/Flight';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import AirlineSeatLegroomNormalOutlinedIcon from '@material-ui/icons/AirlineSeatLegroomNormalOutlined';
import LanguageIcon from '@material-ui/icons/Language';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import CardTravelIcon from '@material-ui/icons/CardTravel';

interface FareRulesProps {

}

class FareRulesPreview extends React.Component<FareRulesProps> {
  render() {
    return(
      <div>
        <p className="text-center text-bold">Fare Rules</p>
        <p className="text-center text-small">Selected Fare Family: Flex</p>
        <div className="row fare-family-row">
          <div className="col-sm-2 offset-sm-2">
            <BusinessCenterIcon color="primary"/>
            <span className="icon-label">1 pc</span>
          </div>
          <div className="col-sm-2">
            <SwapHorizontalCircleIcon color="primary"/>
            <span className="icon-label">$102 CAD</span>
          </div>
          <div className="col-sm-2">
            <ConfirmationNumberOutlinedIcon color="primary"/>
            <span className="icon-label">SATA Fare</span>
          </div>
          <div className="col-sm-2">
            <WifiIcon color="primary"/>
            <span className="icon-label">Wifi</span>
          </div>
          <div className="col-sm-2">
            <AirlineSeatLegroomNormalOutlinedIcon color="primary"/>
            <span className="icon-label">$10</span>
          </div>
        </div>
        <div className="row fare-family-row">
          <div className="col-sm-2 offset-sm-2">
            <CardTravelIcon color="primary"/>
            <span className="icon-label">1 pc</span>
          </div>
          <div className="col-sm-2">
            <CancelOutlinedIcon color="primary"/>
            <span className="icon-label">No cancellation</span>
          </div>
          <div className="col-sm-2">
            <LanguageIcon color="primary"/>
            <span className="icon-label">Travelport</span>
          </div>
          <div className="col-sm-2">
            <FlightIcon color="primary"/>
            <span className="icon-label">Boeing 787</span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-10 offset-sm-2">
            <p className="text-small">*Edit fare family from the flight selection</p>
          </div>
        </div>
      </div>
    );
  }
}

export default FareRulesPreview;