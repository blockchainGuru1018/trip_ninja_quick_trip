import React from 'react';
import WifiIcon from '@material-ui/icons/Wifi';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import AirlineSeatLegroomNormalOutlinedIcon from '@material-ui/icons/AirlineSeatLegroomNormalOutlined';
import LanguageIcon from '@material-ui/icons/Language';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ClassIcon from '@material-ui/icons/Class';
import { Segment, FlightResultsDetails, FlightResult } from '../trip/results/ResultsInterfaces';
import { currencySymbol } from '../helpers/CurrencySymbolHelper';
import { firstLetterCapital } from '../helpers/MiscHelpers';
import { baggageLabel } from '../helpers/BaggageHelper';
import { BookingSegment } from '../bookings/BookingsInterfaces';
import { withTranslation, WithTranslation } from 'react-i18next';
import FlightIcon from '@material-ui/icons/Flight';

interface FareRulesProps extends WithTranslation {
  segment?: Segment;
  bookingSegment?: BookingSegment
  flightDetails: Array<FlightResultsDetails>;
  currency: string;
  itineraryDisplay?: boolean;
  index?: number;
  bookingDrawer?: boolean;
}

class FareRulesPreview extends React.Component<FareRulesProps> {

  state = {
    numBaggage: -1,
    changePenalty: undefined,
    cancelPenalty: undefined,
    wifi: undefined,
    carryOn: -1,
    seatAssignment: undefined,
    platingCarrier: undefined
  }

  constructor(props: FareRulesProps) {
    super(props);
    this.setBaseFareRulesDetails();
  }

  render() {
    return(
      <div key={this.props.index?.toString()}>
        {!this.props.itineraryDisplay && 
          <div>
            <p className="text-center text-bold">{this.props.t("common.fareRulesPreview.title")}</p>
            <p className="text-center text-small">
              {
                this.props.t("common.fareRulesPreview.selectedFareFamily") + ': ' +
                (this.props.segment!.brands
                  ? firstLetterCapital(this.getBrand().name)
                  : 'Default')
              }
            </p>
          </div>
        }
        <div className="row fare-family-row">
          <div className={this.props.bookingDrawer ? 'col-md-12' : 'col-md-8 offset-md-2'}>
            <div className="row">
              <div className="col-lg-3 fare-rules-type">
                <CardTravelIcon color={this.setIconColor(this.state.numBaggage >= 0)}/>                  
                <div className="fare-rule">
                  <span className="fare-rule-label">{this.props.t("common.fareRulesPreview.checkedBags")}</span>
                  <p className="text-small">{this.state.numBaggage >= 0 ? baggageLabel(this.state.numBaggage) : this.informationNotAvailable()}</p>
                </div>
              </div>
              <div className="col-lg-3 fare-rules-type">
                <BusinessCenterIcon color={this.setIconColor(this.state.carryOn >= 0)}/>
                <div className="fare-rule">
                  <span className="fare-rule-label">{this.props.t("common.fareRulesPreview.cabinBaggage")}</span>
                  <p className="text-small">{this.state.carryOn >= 0 ? this.props.t("common.fareRulesPreview.included") : this.informationNotAvailable()}</p>
                </div>
              </div>
              <div className="col-lg-3 fare-rules-type">
                <CancelOutlinedIcon color={this.setIconColor(this.state.cancelPenalty)}/>
                <div className="fare-rule">
                  <span className="fare-rule-label">{this.props.t("common.fareRulesPreview.cancellationPenalty")}</span>
                  <p className="text-small">{this.state.cancelPenalty ? this.state.cancelPenalty : this.informationNotAvailable()}</p>
                </div>
              </div>
              <div className="col-lg-3 fare-rules-type">
                <SwapHorizontalCircleIcon color={this.setIconColor(this.state.changePenalty)}/>
                <div className="fare-rule">
                  <span className="fare-rule-label">{this.props.t("common.fareRulesPreview.changePenalty")}</span>
                  <p className="text-small">{this.state.changePenalty ? this.state.changePenalty : this.informationNotAvailable()}</p>
                </div>
              </div>
              <div className="col-lg-3 fare-rules-type">
                <ConfirmationNumberOutlinedIcon color="primary"/>
                <div className="fare-rule">
                  <span className="fare-rule-label">{this.props.t("common.fareRulesPreview.fareType")}</span>
                  <p className="text-small">{this.props.segment ? this.props.segment!.fare_type: this.informationNotAvailable()}</p>
                </div>
              </div>
              <div className="col-lg-3 fare-rules-type">
                <WifiIcon color={this.setIconColor(this.state.wifi !== undefined)}/>
                <div className="fare-rule">
                  <span className="fare-rule-label">{this.props.t("common.fareRulesPreview.wifiTitle")}</span>
                  <p className="text-small">{this.state.wifi ? this.props.t("common.fareRulesPreview.available") : this.props.t("common.fareRulesPreview.unavailable")}</p>
                </div>
              </div>
              <div className="col-lg-3 fare-rules-type">
                <AirlineSeatLegroomNormalOutlinedIcon color={this.setIconColor(this.state.seatAssignment)}/>
                <div className="fare-rule">
                  <span className="fare-rule-label">{this.props.t("common.fareRulesPreview.seatSelection")}</span>
                  <p className="text-small">{this.state.seatAssignment ? this.state.seatAssignment : this.informationNotAvailable()}</p>
                </div>
              </div>             
              <div className="col-lg-3 fare-rules-type">
                <LanguageIcon color="primary"/>
                <div className="fare-rule">
                  <span className="fare-rule-label">{this.props.t("common.fareRulesPreview.fareSource")}</span>
                  <p className="text-small">{this.props.segment ? firstLetterCapital(this.props.segment!.source) : firstLetterCapital(this.props.bookingSegment!.source)}</p>
                </div>
              </div>
              <div className="col-lg-3 fare-rules-type">
                <ClassIcon color="primary"/>
                <div className="fare-rule">
                  <span className="fare-rule-label">{this.props.t("common.fareRulesPreview.bookingCode")}</span>
                  <p className="text-small">{this.props.segment ? this.getFlightsBookingCodeString() : this.props.bookingSegment?.flight_details[0].booking_code}</p>
                </div>
              </div>
              <div className="col-lg-3 fare-rules-type">
                <FlightIcon color={this.setIconColor(this.state.platingCarrier)}/>
                <div className="fare-rule">
                  <span className="fare-rule-label">{this.props.t("common.fareRulesPreview.platingCarrier")}</span>
                  <p className="text-small">{this.state.platingCarrier ? this.state.platingCarrier : this.informationNotAvailable()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!this.props.itineraryDisplay &&
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <p className="text-small">{this.props.t("common.fareRulesPreview.editFareFamily")}</p>
            </div>
          </div>
        }
      </div>
    );
  }

  informationNotAvailable = () => {
    return <span className="no-info">{this.props.t("common.fareRulesPreview.infoNotAvailable")}</span>;
  }

  getPlatingCarrier = () => {
    if (this.props.segment) {
      return this.props.segment.plating_carrier ? this.props.segment.plating_carrier : undefined;
    } else if (this.props.bookingSegment) {
      return this.props.bookingSegment.plating_carrier ? this.props.bookingSegment.plating_carrier : undefined;
    }
  }

  getBrand = () => {
    const brands = this.props.segment!.brands;
    if (this.props.segment!.source === 'travelport') {
      return brands![0].fare_info[0].brand;
    } else {
      const brandSegment: any = brands ? Object.values(brands)[0][0] : '';
      const fareInfo: any = Object.values(brandSegment.fare_info)[0];
      return fareInfo.brand;
    }
  }

  getBookingSegmentBrandServices = () => {
    return this.props.bookingSegment!.brands[0] ? this.props.bookingSegment!.brands[0].brand_services : '';
  }

  setIconColor = (propType: any) => propType ? "primary" : "disabled"

  getFlightsBookingCodeString = () =>
    this.props.segment!.flights.reduce((total: string, flight: FlightResult, index: number) => {
      total += flight.booking_code;
      return index !== this.props.segment!.flights.length - 1
        ? total += ', '
        : total += ' '+ this.props.t("common.fareRulesPreview.bookingClass");
    }, '');

  setNumBaggage = () => {
    if (this.props.bookingSegment) { 
      return this.props.bookingSegment.baggage.applicable_bags;
    } else {
      return this.props.segment!.baggage.number_of_pieces;
    }
  }

  setBrandServices = () => {
    return this.props.segment ? this.getBrand().brand_services : this.getBookingSegmentBrandServices();
  }

  setBaseFareRulesDetails = () => {
    const segment = this.props.segment ? this.props.segment! : this.props.bookingSegment!;
    const additionalDetails = segment.additional_details;
    const brands = segment.brands;
    let wifi: boolean = false;
    let seatAssignment: string | undefined = undefined;
    let carryOn: number = -1;
    const numBaggage: any = this.setNumBaggage();
    let platingCarrier: string | undefined = this.getPlatingCarrier();

    const changePenalty = additionalDetails.change_penalty.amount
      ? currencySymbol(this.props.currency)! + additionalDetails.change_penalty.amount + this.props.currency
      : additionalDetails.change_penalty.percentage
        ? additionalDetails.change_penalty.percentage + " %"
        : undefined;

    const cancelPenalty = additionalDetails.cancel_penalty
      ? additionalDetails.cancel_penalty.amount
        ? currencySymbol(this.props.currency)! + additionalDetails.cancel_penalty.amount + this.props.currency
        : additionalDetails.cancel_penalty.percentage
          ? additionalDetails.cancel_penalty.percentage + " %"
          : undefined
      : undefined;

    if (brands) {
      const brandServices: any = this.setBrandServices();
      wifi = brandServices.wifi || false;
      seatAssignment = brandServices.seat_assignment
        ? brandServices.seat_assignment === '$'
          ? this.props.t("common.fareRulesPreview.atACost")
          : this.props.t("common.fareRulesPreview.available")
        : this.props.t("common.fareRulesPreview.unavailable");
      carryOn = brandServices.carry_on_hand_baggage || -1;
    }
    this.setState({
      numBaggage,
      changePenalty,
      cancelPenalty,
      wifi,
      seatAssignment,
      carryOn,
      platingCarrier
    });
  }
}

export default withTranslation('common')(FareRulesPreview);
