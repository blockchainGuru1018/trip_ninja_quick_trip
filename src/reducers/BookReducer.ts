import { BookingDetails, PassengerInfo, defaultPassengerInfo } from '../trip/book/BookInterfaces';

function bookReducer(state: BookingDetails = {} as any, action: any) {
  switch(action.type) {    
    case 'SET_PASSENGERS':
      return setNewPassengerInfo(state, action);

    case 'UPDATE_PASSENGER_INFO':
      return updatePassengersWithValue(state, action);

    case 'BOOKING_LOADING':
      return {...state, loading: action.value};

    case 'UPDATE_FREQUENT_FLYER_CARDS':
      const currentPassenger = state.passengers[action.passengerIndex];
      currentPassenger.frequent_flyer_cards.splice(
        action.cardIndex, 1, action.value
      );
      return updatePassengersWithValue(state, {"index": action.passengerIndex,
        "key": "frequent_flyer_cards", "value": currentPassenger.frequent_flyer_cards});

    case 'RESET_BOOKING_DETAILS':
      state.passengers = [defaultPassengerInfo];
      return {...state};

    default:
      return state;
  }
}

function setNewPassengerInfo(state: any, action: any) {
  let passengerInfo: Array<PassengerInfo> = [];
  for (let i = 0; i < action.passengers.length; i++) {
    if (action.passengers[i].count > 0) {
      for (let j = 0; j < action.passengers[i].count; j++) {
        let newPassenger: PassengerInfo = JSON.parse(JSON.stringify(defaultPassengerInfo));
        newPassenger.passenger_type = action.passengers[i].code;
        newPassenger.passenger_type_name = action.passengers[i].type;
        passengerInfo.push(newPassenger);
      }
    }
  }
  state.passengers = passengerInfo;
  return {...state};
}

function updatePassengersWithValue(state: any, action: any) {
  const currentPassenger = state.passengers[action.index];
  currentPassenger[action.key] = action.value;
  const updatedPassengers = [
    ...state.passengers.slice(0, action.index),
    {...currentPassenger},
    ...state.passengers.slice(action.index + 1)
  ];
  return {...state, passengers: updatedPassengers};
}

export default bookReducer;
