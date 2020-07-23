import API from '../Api';
import { Booking } from '../bookings/BookingsInterfaces';

export function setBookingsList(bookings: Array<Booking>) {
  return {
    type: 'SET_BOOKINGS_LIST',
    bookings
  };
}

export function setBookingDetails(booking: Booking) {
  return {
    type: 'SET_BOOKING_DETAILS',
    booking
  };
}


export const getBookingsList = (agent: string) => (dispatch: any) => {
  const url: string = '/book/trip/';

  return API.post(url, agent)
    .then((response: any) => {
      if (response.data.status) {
        throw 'error';
      } else {
        dispatch(setBookingsList(response.data));
        return {'success': true};
      }
    })
    .catch((error: any) => {
      return {'success': false};
    });
};

export const getBookingDetails = (trip_id: string) => (dispatch: any) => {
  const url: string = '/book/trip/' + trip_id;

  return API.get(url)
    .then((response: any) => {
      if (response.data.status) {
        throw 'error';
      } else {
        dispatch(setBookingDetails(response.data));
        return {'success': true};
      }
    })
    .catch((error: any) => {
      return {'success': false};
    });

};