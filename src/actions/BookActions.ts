import { Passenger } from '../trip/search/SearchInterfaces';
import { BookingDetails } from '../trip/book/BookInterfaces';
import { Dispatch } from 'redux';

export function updatePassengerInfo(index: number, key: string, value: string) {
  console.log("update passenger info action");
  return {
    type: 'UPDATE_PASSENGER_INFO',
    index,
    key,
    value
  };
}

export function setPassengerInfo(value: Array<Passenger>) {
  console.log("call reducerr!!!");
  return {
    type: 'SET_PASSENGERS',
    value
  };
}



