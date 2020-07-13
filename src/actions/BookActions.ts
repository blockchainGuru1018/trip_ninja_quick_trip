import { Passenger } from '../trip/search/SearchInterfaces';

export function updatePassengerInfo(index: number, key: string, value: string) {
  console.log("update passenger info action");
  return {
    type: 'UPDATE_PASSENGER_INFO',
    index,
    key,
    value
  };
}

export function setPassengerInfo(passengers: Array<Passenger>) {
  return {
    type: 'SET_PASSENGERS',
    passengers
  };
}



