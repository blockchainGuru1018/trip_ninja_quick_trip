import { BookingsList, Booking } from '../bookings/BookingsInterfaces';

function bookingsReducer(state: BookingsList = {} as any, action: any) {
  switch(action.type) {    
    case 'SET_BOOKINGS_LIST':
      return setBookingsList(state, action);

    case 'SET_BOOKING_DETAILS':
      return setBookingDetails(state, action);

    case 'SET_BOOKING_STATUS':
      return setBookingStatus(state, action);

    default:
      return state;
  }
}

function setBookingsList(state: any, action: any) {
  state.bookings = action.bookings;
  return {...state};
}

function setBookingDetails(state: any, action: any) {
  let bookingToUpdate = state.bookings.find((booking: Booking) => booking.trip_id === action.booking.trip_id);
  bookingToUpdate.booking_details = action.booking;
  return {...state};
}

function setBookingStatus(state: any, action: any) {
  console.log("Running reducer!");
  let bookingToUpdate = state.bookings.find((booking: Booking) => booking.trip_id === action.booking.trip_id);
  console.log("BookingToUpdate:", bookingToUpdate);
  bookingToUpdate.status = action.booking.status;
  return {...state};
}

export default bookingsReducer;