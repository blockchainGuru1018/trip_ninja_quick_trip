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
import { Segment, FlightResultsDetails, FlightResult } from './ResultsInterfaces';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import { firstLetterCapital } from '../../helpers/MiscHelpers';

interface FareRulesProps {
  segment: Segment;
  flightDetails: Array<FlightResultsDetails>;
  currency: string;
}

class FareRulesPreview extends React.Component<FareRulesProps> {

  state = {
    numBaggage: 0,
    changePenalty: undefined,
    cancelPenalty: undefined,
    wifi: false,
    carryOn: undefined,
    seatAssignment: undefined
  }

  componentDidMount() {
    this.setBaseFareRulesDetails();
  }

  render() {
    return(
      <div>
        <p className="text-center text-bold">Fare Rules</p>
        <p className="text-center text-small">
          {
            'Selected Fare Family: ' +
            this.props.segment.brands
              ? firstLetterCapital(this.getBrand().name)
              : 'Default'
          }
        </p>
        <div className="row fare-family-row">
          <div className='col-md-8 offset-md-2'>
            <div className='row text-small'>
              {this.state.carryOn
                ? <div className="col-lg-3 fare-rules-type">
                  <BusinessCenterIcon color="primary"/>
                  <span className="icon-label">
                    {this.state.carryOn + (this.state.carryOn! > 1 ? 'pcs' : 'pc')}
                  </span>
                </div>
                : ''
              }
              {this.state.changePenalty
                ? <div className="col-lg-3 fare-rules-type">
                  <SwapHorizontalCircleIcon color="primary"/>
                  <span className="icon-label">{this.state.changePenalty}</span>
                </div>
                : ''
              }
              <div className="col-lg-3 fare-rules-type">
                <ConfirmationNumberOutlinedIcon color="primary"/>
                <span className="icon-label">{this.props.segment.fare_type}</span>
              </div>
              {this.state.wifi
                ? <div className="col-lg-3 fare-rules-type">
                  <WifiIcon color="primary"/>
                  <span className="icon-label">Wifi</span>
                </div>
                : ''
              }
              {this.state.seatAssignment
                ? <div className="col-lg-3 fare-rules-type">
                  <AirlineSeatLegroomNormalOutlinedIcon color="primary"/>
                  <span className="icon-label">{this.state.seatAssignment}</span>
                </div>
                : ''
              }
              <div className="col-lg-3 fare-rules-type">
                <CardTravelIcon color="primary"/>
                <span className="icon-label">
                  {this.state.numBaggage + (this.state.numBaggage > 1 ? 'pcs' : 'pc')}
                </span>
              </div>
              {this.state.cancelPenalty
                ? <div className="col-lg-3 fare-rules-type">
                  <CancelOutlinedIcon color="primary"/>
                  <span className="icon-label">{this.state.cancelPenalty}</span>
                </div>
                : ''
              }
              <div className="col-lg-3 fare-rules-type">
                <LanguageIcon color="primary"/>
                <span className="icon-label">{firstLetterCapital(this.props.segment.source)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 offset-md-2">
            <p className="text-small">*Edit fare family from the flight selection</p>
          </div>
        </div>
      </div>
    );
  }

  getBrand = () => {
    const brands = this.props.segment.brands;
    const brandSegment: any = Object.values(brands!)[0][0];
    const fareInfo: any = Object.values(brandSegment.fare_info)[0];
    return fareInfo.brand;
  }

  setBaseFareRulesDetails = () => {
    const segment = this.props.segment;
    const additionalDetails = segment.additional_details;
    const numBaggage: number = segment.baggage.number_of_pieces;
    const changePenalty = additionalDetails.change_penalty.amount
      ? currencySymbol(this.props.currency)! + additionalDetails.change_penalty.amount + this.props.currency
      : additionalDetails.change_penalty.percentage
        ? additionalDetails.change_penalty.percentage + " %"
        : undefined;
    const brands = segment.brands;
    let wifi: boolean = false;
    let seatAssignment: string | undefined = undefined;
    let carryOn = undefined;
    const cancelPenalty = additionalDetails.cancel_penalty
      ? additionalDetails.cancel_penalty.amount
        ? currencySymbol(this.props.currency)! + additionalDetails.cancel_penalty.amount + this.props.currency
        : additionalDetails.cancel_penalty.percentage
          ? additionalDetails.cancel_penalty + " %"
          : undefined
      : undefined;
    if(brands) {
      const brandServices: any = this.getBrand().brand_services;
      wifi = brandServices.wifi || false;
      seatAssignment = brandServices.seat_assignment || undefined;
      carryOn = brandServices.carry_on_hand_baggage || undefined;

    }
    this.setState({
      numBaggage,
      changePenalty,
      cancelPenalty,
      wifi,
      seatAssignment,
      carryOn
    });
  }
}

export default FareRulesPreview;