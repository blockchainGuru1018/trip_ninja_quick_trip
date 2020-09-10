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

export function setBookingStatus(booking: Booking) {
  return {
    type: 'SET_BOOKING_STATUS',
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

export function bookingDetailsLoading(value: boolean) {
  return {
    type: 'BOOKING_DETAILS_LOADING',
    value
  };
}


export const getBookingsList = (queryType: string) => (dispatch: any) => {
  const url: string = 'book/list/?'+ queryType + '&offset=0&limit=1000';

  return API.get(url)
    .then((response: any) => {
      if (response.data.status) {
        throw Error;
      } else {
        dispatch(setBookingsList(response.data.bookings));
        return {'success': true};
      }
    })
    .catch((Error: any) => {
      return {'success': false};
    });
};

export const getBookingDetails = (trip_id: string, agency: string) => (dispatch: any) => {
  dispatch(bookingDetailsLoading(true));
  const url: string = 'book/trip/' + trip_id + '/' + agency;
  return API.get(url)
    .then((response: any) => {
      if (response.data.status) {
        throw Error;
      } else {
        dispatch(setBookingDetails(response.data));
        dispatch(bookingDetailsLoading(false));
        return {'success': true};
      }
    })
    .catch((Error: any) => {
      dispatch(bookingDetailsLoading(false));
      return {'success': false};
    });

};


export const cancelBooking = (booking: Booking) => (dispatch: any) => {
  dispatch(cancelLoading(true));
  const url: string = '/cancel_booking/';

  return API.post(url, {trip_id: booking.trip_id})
    .then((response: any) => {
      if (response.data.status) {
        throw Error;
      } else {
        booking.status = "cancelled";
        dispatch(setErrorDetails(false, 'cancelling'));
        dispatch(setBookingStatus(booking));
        dispatch(cancelLoading(false));
        return {'success': true};
      }
    })
    .catch((Error: any) => {
      dispatch(cancelLoading(false));
      dispatch(setErrorDetails(true, 'cancelling'));
      return {'success': false};
    });
};


export const queueBooking = (authDetails: AuthDetails, booking: Booking) => (dispatch: any) => {
  dispatch(queueLoading(true));
  const url: string = '/queue/'; 

  return API.post(url, {trip_id: booking.trip_id, queue: authDetails.ticketing_queue})
    .then((response: any) => {
      if (response.data.status) {
        throw Error;
      } else {
        booking.status = "ticketed";
        dispatch(setErrorDetails(false, 'queueing'));
        dispatch(setBookingStatus(booking));
        dispatch(queueLoading(false));
        return {'success': true};
      }
    })
    .catch((Error: any) => {
      dispatch(queueLoading(false));
      dispatch(setErrorDetails(true, 'queueing'));
      return {'success': false};
    });
};
