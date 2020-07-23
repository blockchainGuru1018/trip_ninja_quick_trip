import { BookingsList } from '../bookings/BookingsInterfaces';

function bookingsReducer(state: BookingsList = {} as any, action: any) {
  switch(action.type) {    
    case 'SET_BOOKINGS_LIST':
      return setBookingsList(state, action);

    case 'SET_BOOKING_DETAILS':
      return setBookingDetails(state, action);

    default:
      return state;
  }
}

function setBookingsList(state: any, action: any) {
  return {...state};
}

function setBookingDetails(state: any, action: any) {
  // Find booking in booking list with that trip id
  // set response data into bookinglist at that index
  return {...state};
}

export default bookingsReducer;