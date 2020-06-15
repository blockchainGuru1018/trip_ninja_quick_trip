
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