import { BookingDetails, PassengerInfo } from '../trip/book/BookInterfaces';

function bookReducer(state: BookingDetails = {} as any, action: any) {
  switch(action.type) {    
    case 'SET_PASSENGERS':
      console.log('set passenger info!!!');
      return setNewPassengerInfo(state, action);

    case 'UPDATE_PASSENGER_INFO':
      console.log("update pass info!!!!!");
      return updatePassengersWithValue(state, action);

    default:
      return state;
  }
}

function setNewPassengerInfo(state: any, action: any) {
  console.log("in the function");
  let passengerInfo: Array<PassengerInfo> = [];
  console.log(state);
  console.log(state.searchDetails);
  for (let i = 0; i < action.value.passengers.length; i++) {
    if (action.value.passengers[i].count > 0) {
      for (let j = 0; j < action.value.passengers[i].count; j++) {
        let newPassenger: PassengerInfo = {'passenger_type': action.value.passengers[i].type, 'updated': false};
        passengerInfo.push(newPassenger);
      }
    }
  }
  console.log(passengerInfo);
  state.bookingDetails.passengers = passengerInfo;
  return {...state};
}

function updatePassengersWithValue(state: any, action: any) {
  const currentPassenger = state.bookingDetails.passengers[action.index];
  currentPassenger[action.key] = action.value;
  const updatedPassengers = [
    ...state.bookingDetails.passengers.slice(0, action.index),
    {...currentPassenger},
    ...state.bookingDetails.passengers.slice(action.index + 1)
  ];
  return {...state, passengers: updatedPassengers};
}

export default bookReducer;
