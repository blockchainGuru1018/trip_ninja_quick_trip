import { PricingDetails, PricingRequestInterface } from '../trip/results/PricingInterfaces';
import API from '../Api';
import { setErrorDetails } from './ResultsActions';


export function pricingLoading(value: boolean) {
  return {
    type: 'PRICING_LOADING',
    value
  };
}

function setPricingResults(data: PricingDetails) {
  return {
    type: 'SET_PRICING_RESULTS',
    data
  };
}


export function updateAdditionalMarkup(additionalMarkup: number) {
  return {
    type: 'UPDATE_ADDITIONAL_MARKUP',
    additionalMarkup
  };
}

export function updateAncillariesAmount(amount: number) {
  return {
    type: 'UPDATE_ANCILLARIES_AMOUNT',
    amount
  };
}

export const priceFlights = (pricingPayload: PricingRequestInterface) => (dispatch: any) => {
  const url: string = '/price/';
  dispatch(pricingLoading(true));
  return API.post(url, pricingPayload)
    .then((response: any) => {
      if (response.data.status) {
        throw Error;
      } else {
        dispatch(setErrorDetails(false, 'pricing'));
        dispatch(setPricingResults(response.data));
        return {'success': true};
      }
    })
    .catch((Error: any) => {
      dispatch(pricingLoading(false));
      dispatch(setErrorDetails(true, 'pricing'));
      return {'success': false};
    });
};
