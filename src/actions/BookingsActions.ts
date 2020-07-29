import API from '../Api';
import { Booking } from '../bookings/BookingsInterfaces';
import { setErrorDetails } from './ResultsActions';
import { AuthDetails } from '../auth/AuthInterfaces';

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

export function cancelLoading(value: boolean) {
  return {
    type: 'CANCEL_LOADING',
    value
  };
}

export function queueLoading(value: boolean) {
  return {
    type: 'QUEUE_LOADING',
    value
  };
}

export const getBookingsList = (queryType: string, queryValue: string) => (dispatch: any) => {
  const url: string = 'book/list/?'+ queryType +'='+ queryValue;

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
  const url: string = 'book/trip/' + trip_id;

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


export const cancelBooking = (trip_id: string) => (dispatch: any) => {
  dispatch(cancelLoading(true));
  const url: string = '/cancel_booking/';

  return API.post(url, {trip_id: trip_id})
    .then((response: any) => {
      if (response.data.status) {
        throw 'error';
      } else {
        dispatch(setErrorDetails(false, 'cancellation'));
        dispatch(cancelLoading(false));
        return {'success': true};
      }
    })
    .catch((error: any) => {
      dispatch(cancelLoading(false));
      dispatch(setErrorDetails(true, 'cancellation'));
      return {'success': false};
    });
};


export const queueBooking = (trip_id: string, authDetails: AuthDetails) => (dispatch: any) => {
  dispatch(queueLoading(true));
  const url: string = '/queue/'; // <<-- Set the right place

  return API.post(url, {trip_id: trip_id, queue: authDetails.ticketing_queue})
    .then((response: any) => {
      if (response.data.status) {
        throw 'error';
      } else {
        dispatch(setErrorDetails(false, 'queueing'));
        dispatch(queueLoading(false));
        return {'success': true};
      }
    })
    .catch((error: any) => {
      dispatch(queueLoading(false));
      dispatch(setErrorDetails(true, 'queueing'));
      return {'success': false};
    });
};