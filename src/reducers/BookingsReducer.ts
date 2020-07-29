import { BookingsList, Booking } from '../bookings/BookingsInterfaces';

function bookingsReducer(state: BookingsList = {} as any, action: any) {
  switch(action.type) {    
    case 'SET_BOOKINGS_LIST':
      return setBookingsList(state, action);

    case 'SET_BOOKING_DETAILS':
      return setBookingDetails(state, action);
    
    case 'BOOKING_DETAILS_LOADING':
      return {...state, loading: action.value};

    default:
      return state;
  }
}

function setBookingsList(state: any, action: any) {
  state.bookings = action.bookings;
  return {...state};
}

function setBookingDetails(state: any, action: any) {
  state.bookings.find((booking: Booking) => booking.trip_id === action.booking.trip_id).details = action.booking;
  console.log(state);
  return {...state};
}

export default bookingsReducer;