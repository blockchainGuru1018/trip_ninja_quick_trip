import { Passenger } from '../trip/search/SearchInterfaces';
import API from '../Api';
import { BookingDetails } from '../trip/book/BookInterfaces';
import { setErrorDetails } from './ResultsActions';


export function updatePassengerInfo(index: number, key: string, value: string) {
  return {
    type: 'UPDATE_PASSENGER_INFO',
    index,
    key,
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

function setBookingResults(data: BookingDetails) {
  return {
    type: 'SET_BOOKING_RESULTS',
    data
  };
}

export const bookFlights = (bookingPayload: BookingDetails) => (dispatch: any) => {
  dispatch(bookingLoading(true));
  const url: string = '/create_pnr/';

  return API.post(url, bookingPayload)
    .then((response: any) => {
      if (response.data.status) {
        throw Error;
      } else {
        dispatch(setErrorDetails(false, 'booking'));
        dispatch(setBookingResults(response.data));
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

