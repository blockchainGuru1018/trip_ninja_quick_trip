
export function updatePassengerValue(index: number, key: string, value: string) {
  return {
    type: 'UPDATE_FLIGHT_VALUE',
    index,
    key,
    value
  };
}

//TODO: Set the proper type for pricingResults once that interface is built
export const setPricingResults = (pricingResults: any) => (dispatch: any) => {
  dispatch(setResults());
};
  

//TODO: Set the proper type for pricingResults once that interface is built
export function setResults() {
  return "";
}


