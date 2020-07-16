import React from 'react';
import WifiIcon from '@material-ui/icons/Wifi';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import AirlineSeatLegroomNormalOutlinedIcon from '@material-ui/icons/AirlineSeatLegroomNormalOutlined';
import LanguageIcon from '@material-ui/icons/Language';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import { Segment, FlightResultsDetails } from './ResultsInterfaces';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import { firstLetterCapital } from '../../helpers/MiscHelpers';
import { baggageLabel } from '../../helpers/BaggageHelper';

interface FareRulesProps {
  segment: Segment;
  flightDetails: Array<FlightResultsDetails>;
  currency: string;
  itineraryDisplay?: boolean;
  bookingDrawer?: boolean;
}

class FareRulesPreview extends React.Component<FareRulesProps> {

  state = {
    numBaggage: 0,
    changePenalty: undefined,
    cancelPenalty: undefined,
    wifi: false,
    carryOn: -1,
    seatAssignment: undefined
  }

  componentDidMount() {
    this.setBaseFareRulesDetails();
  }

  render() {
    return(
      <div>
        {!this.props.itineraryDisplay && 
          <div>
            <p className="text-center text-bold">Fare Rules</p>
            <p className="text-center text-small">
              {
                'Selected Fare Family: ' +
                (this.props.segment.brands
                  ? firstLetterCapital(this.getBrand().name)
                  : 'Default')
              }
            </p>
          </div>
        }
        <div className="row fare-family-row">
          <div className={this.props.bookingDrawer ? 'col-md-12' : 'col-md-8 offset-md-2'}>
            <div className='row text-small'>
              {this.state.carryOn >= 0
                && <div className={"col-lg-3 " + (this.props.bookingDrawer ? "booking-drawer-rules" : "fare-rules-type")}>
                  <BusinessCenterIcon color="primary"/>
                  <span className="icon-label">
                    {baggageLabel(this.state.carryOn)}
                  </span>
                </div>
              }
              {this.state.changePenalty
                && <div className={"col-lg-3 " + (this.props.bookingDrawer ? "booking-drawer-rules" : "fare-rules-type")}>
                  <SwapHorizontalCircleIcon color="primary"/>
                  <span className="icon-label">{this.state.changePenalty}</span>
                </div>
              }
              <div className={"col-lg-3 " + (this.props.bookingDrawer ? "booking-drawer-rules" : "fare-rules-type")}>
                <ConfirmationNumberOutlinedIcon color="primary"/>
                <span className="icon-label">{this.props.segment.fare_type}</span>
              </div>
              {this.state.wifi
                && <div className={"col-lg-3 " + (this.props.bookingDrawer ? "booking-drawer-rules" : "fare-rules-type")}>
                  <WifiIcon color="primary"/>
                  <span className="icon-label">Wifi</span>
                </div>
              }
              {this.state.seatAssignment
                && <div className={"col-lg-3 " + (this.props.bookingDrawer ? "booking-drawer-rules" : "fare-rules-type")}>
                  <AirlineSeatLegroomNormalOutlinedIcon color="primary"/>
                  <span className="icon-label">{this.state.seatAssignment}</span>
                </div>
              }
              <div className={"col-lg-3 " + (this.props.bookingDrawer ? "booking-drawer-rules" : "fare-rules-type")}>
                <CardTravelIcon color="primary"/>
                <span className="icon-label">
                  {baggageLabel(this.state.numBaggage)}
                </span>
              </div>
              {this.state.cancelPenalty
                && <div className={"col-lg-3 " + (this.props.bookingDrawer ? "booking-drawer-rules" : "fare-rules-type")}>
                  <CancelOutlinedIcon color="primary"/>
                  <span className="icon-label">{this.state.cancelPenalty}</span>
                </div>
              }
              <div className={"col-lg-3 " + (this.props.bookingDrawer ? "booking-drawer-rules" : "fare-rules-type")}>
                <LanguageIcon color="primary"/>
                <span className="icon-label">{firstLetterCapital(this.props.segment.source)}</span>
              </div>
            </div>
          </div>
        </div>
        {!this.props.itineraryDisplay &&
          <div className="row">
            <div className="col-md-10 offset-md-2">
              <p className="text-small">*Edit fare family from the flight selection</p>
            </div>
          </div>
        }
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
    let carryOn: number = -1;
    const cancelPenalty = additionalDetails.cancel_penalty
      ? additionalDetails.cancel_penalty.amount
        ? currencySymbol(this.props.currency)! + additionalDetails.cancel_penalty.amount + this.props.currency
        : additionalDetails.cancel_penalty.percentage
          ? additionalDetails.cancel_penalty.percentage + " %"
          : undefined
      : undefined;
    if (brands) {
      const brandServices: any = this.getBrand().brand_services;
      wifi = brandServices.wifi || false;
      seatAssignment = brandServices.seat_assignment
        ? brandServices.seat_assignment === '$'
          ? 'At a cost'
          : 'Available'
        : 'Unavilable';
      carryOn = brandServices.carry_on_hand_baggage || -1;
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