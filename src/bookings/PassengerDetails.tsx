import React from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Moment from 'react-moment';
import {FrequentFlyerCard, PassengerInfo} from '../trip/book/BookInterfaces';
import CountryList from '../assets/data/countries.json';
import { withTranslation, WithTranslation } from 'react-i18next';

interface PassengerDetailsProps extends WithTranslation {
  passengers?: Array<PassengerInfo>
}

class PassengerDetails extends React.Component<PassengerDetailsProps> {

  render() {
    return (
      <div>
        <h5 className="section-header">{this.props.t("bookings.passengerDetails.title")}</h5>
        {this.passengersInfo()}
      </div>
    );
  }

  getFrequentFlyerCardList = (frequentFlyerCards: Array<FrequentFlyerCard>) => {
    const frequentFlyerCardString = frequentFlyerCards.reduce(
      (total: string, frequentFlyerCard: FrequentFlyerCard) => total + `${frequentFlyerCard.card_number} ,`, ''
    );
    return frequentFlyerCardString.slice(0, -2);
  }

  passengersInfo = () => {
    const passengers = this.props.passengers ? this.props.passengers : [];
    return passengers.map((passenger, index) => (
      <div className="row" key={index.toString()}>
        <div className="col-sm-2 no-pad-left my-auto">
          <div className="float-left passenger-icon">
            <PersonOutlineIcon color="primary" fontSize="large" />
            <p className="text-small text-center">{passenger.passenger_type}</p>
          </div>
          <div>
            <p className="text-bold">{passenger.first_name} {passenger.last_name}</p>
          </div>
        </div>
        <div className="col-sm-2 border-left">
          <p className="passenger-field">{this.props.t("commonWords.gender")}</p>
          <p className="passenger-field">{this.props.t("commonWords.nationality")}</p>
          <p className="passenger-field">{this.props.t("commonWords.passportNumber")}</p>
          <p className="passenger-field">{this.props.t("commonWords.passportExpiry")}</p>
        </div>
        <div className="col-sm-1 no-pad-left">
          <p>{this.getPassengerGender(passenger.gender)}</p>
          <p>{passenger.passport_country ? this.getCountryName(passenger.passport_country): '-'}</p>
          <p>{passenger.passport_number ? passenger.passport_number : '-'}</p>
          <p>{passenger.passport_expiration ? <Moment format="DD/MM/YYYY">{passenger.passport_expiration}</Moment> : '-'}</p>
        </div>
        <div className="col-sm-2">
          <p className="passenger-field">{this.props.t("commonWords.phone")}</p>
          <p className="passenger-field">{this.props.t("commonWords.email")}</p>
          <p className='passenger-field'>{this.props.t("commonWords.frequentFlyerCards")}</p>
          <p className='passenger-field'>{this.props.t("commonWords.mealPreference")}</p>
        </div>
        <div className="col-sm-2 no-pad-left">
          <p>{passenger.phone_number ? passenger.phone_number : '-'}</p>
          <p>{passenger.email ? passenger.email : '-'}</p>
          <p>{passenger.frequent_flyer_cards ? this.getFrequentFlyerCardList(passenger.frequent_flyer_cards) : '-'}</p>
          <p>{passenger.meals.length > 0 ? passenger.meals[0].meal_choice : '-'}</p>
        </div>
      </div>
    ));
  }

  getCountryName = (countryCode: string) => {
    let countryObject = CountryList.find((country: any) => country.code === countryCode);
    return countryObject ? countryObject.name: '-';
  }

  getPassengerGender = (gender: string) => {
    if (gender === 'F') {
      return this.props.t("commonWords.female");
    } else if (gender === 'M') {
      return this.props.t("commonWords.male");
    } else {
      return '-';
    }
  }
}

export default withTranslation('common')(PassengerDetails);
