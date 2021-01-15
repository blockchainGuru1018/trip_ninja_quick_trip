import { Passenger } from '../trip/search/SearchInterfaces';
import API from '../Api';
import { BookingDetails, FrequentFlyerCard } from '../trip/book/BookInterfaces';
import { setErrorDetails } from './ResultsActions';


export function updatePassengerInfo(index: number, key: string, value: any) {
  return {
    type: 'UPDATE_PASSENGER_INFO',
    index,
    key,
    value
  };
}

export function updateFrequentFlyerCards(passengerIndex: number, cardIndex: number, value: FrequentFlyerCard) {
  return {
    type: 'UPDATE_FREQUENT_FLYER_CARDS',
    passengerIndex,
    cardIndex,
    value
  };
}

export function setPassengerInfo(passengers: Array<Passenger>) {
  return {
    type: 'SET_PASSENGERS',
    passengers
  };
}

export function bookingLoading(value: boolean) {
  return {
    type: 'BOOKING_LOADING',
    value
  };
}

export const bookFlights = (bookingPayload: BookingDetails) => (dispatch: any) => {
  dispatch(bookingLoading(true));
  const url: string = '/book/';

  return API.post(url, bookingPayload)
    .then((response: any) => {
      if (response.data.status) {
        throw Error;
      } else {
        dispatch(setErrorDetails(false, 'booking'));
        dispatch(bookingLoading(false));
        return {'success': true};
      }
    })
    .catch((Error: any) => {
      dispatch(bookingLoading(false));
      dispatch(setErrorDetails(true, 'booking'));
      return {'success': false};
    });
};

export function resetAppropriateBookingDetails() {
  return {
    type: 'RESET_BOOKING_DETAILS',
  };
}

