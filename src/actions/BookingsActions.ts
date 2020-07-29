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

export function bookingDetailsLoading(value: boolean) {
  return {
    type: 'BOOKING_DETAILS_LOADING',
    value
  };
}


export const getBookingsList = (queryType: string) => (dispatch: any) => {
  const url: string = 'book/list/?'+ queryType;

  return API.get(url)
    .then((response: any) => {
      if (response.data.status) {
        throw 'error';
      } else {
        dispatch(setBookingsList(response.data.bookings));
        return {'success': true};
      }
    })
    .catch((error: any) => {
      return {'success': false};
    });
};

export const getBookingDetails = (trip_id: string) => (dispatch: any) => {
  dispatch(bookingDetailsLoading(true));
  const url: string = 'book/trip/' + trip_id + '/';
  return API.get(url)
    .then((response: any) => {
      if (response.data.status) {
        throw 'error';
      } else {
        console.log("Response acquired");
        dispatch(setBookingDetails(response.data));
        dispatch(bookingDetailsLoading(false));
        return {'success': true};
      }
    })
    .catch((error: any) => {
      dispatch(bookingDetailsLoading(false));
      return {'success': false};

    });

};