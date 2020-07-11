import { Passenger } from '../trip/search/SearchInterfaces';

export function updatePassengerInfo(index: number, key: string, value: string) {
  return {
    type: 'UPDATE_PASSENGER_INFO',
    index,
    key,
    value
  };
}

export function setPassengerInfo(value: Array<Passenger>) {
  return {
    type: 'SET_PASSENGERS',
    value
  };
}



