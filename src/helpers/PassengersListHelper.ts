import { Passenger } from '../trip/search/SearchInterfaces';

export function createPassengersString(segments: any) {
  const pricedPassengers: Array<string>  = segments[0].priced_passengers;
  const potentialPassengers = ['ADT', 'CHD', 'YTH', 'STU', 'INF'];
  return potentialPassengers.reduce((total: string, potentialPassenger: string) => {
    const nPassengersOfType: Array<any> = pricedPassengers.filter((pricedPassenger: string) =>
      pricedPassenger === potentialPassenger
    );
    return total += nPassengersOfType.length > 0
      ? ' ' + nPassengersOfType.length + ' ' + potentialPassenger
      : '';
  }, '');
}

export const createPassengerPayload = (passengers: Array<Passenger>)  => {
  let passengerPayload = {};
  passengers.forEach((passenger: Passenger) => passengerPayload[passenger.type.toLowerCase()] = passenger.count);
  return passengerPayload;
}

export const passengerAbbrevMap = {
  adult: 'ADT',
  child: 'CHD',
  youth: 'YTH',
  student: 'STD',
  infant: 'INF'
}

export const createPassengerStringFromPayload = (passengers: Array<Passenger>) => {
  const passengersPayload = createPassengerPayload(passengers);
  const passengerValues: Array<number> = Object.values(passengersPayload);
  const passengerKeys: Array<string> = Object.keys(passengersPayload);
  const passengerString: string = passengerValues.reduce((total: string, passengerCount: number, index: number) =>
    total += passengerCount > 0
      ? `${total === '' ? '' : ', '}${passengerCount} ${passengerAbbrevMap[passengerKeys[index]]}`
      : '', ''
  );
  return passengerString;
}