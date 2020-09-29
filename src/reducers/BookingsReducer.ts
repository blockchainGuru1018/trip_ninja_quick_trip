import { BookingsList, Booking } from '../bookings/BookingsInterfaces';

function bookingsReducer(state: BookingsList = {} as any, action: any) {
  switch(action.type) {    
    case 'SET_BOOKINGS_LIST':
      return setBookingsList(state, action);

    case 'SET_BOOKING_DETAILS':
      return setBookingDetails(state, action);
    
    case 'BOOKING_DETAILS_LOADING':
      return {...state, loading: action.value};

    case 'CANCEL_LOADING':
      return {...state, loading: action.value};

    case 'QUEUE_LOADING':
      return {...state, loading: action.value};

    case 'TICKET_LOADING':
      return {...state, loading: action.value};

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
  state.bookings.find((booking: Booking) => booking.trip_id === action.booking.trip_id).details = action.booking;
  return {...state};
}

function setBookingStatus(state: any, action: any) {
  let bookingToUpdate = state.bookings.find((booking: Booking) => booking.trip_id === action.booking.trip_id);
  bookingToUpdate.status = action.booking.status;
  return {...state};
}

export default bookingsReducer;
