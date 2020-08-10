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

export const priceFlights = (pricingPayload: PricingRequestInterface) => (dispatch: any) => {
  dispatch(pricingLoading(true));
  const url: string = '/confirmflight/';

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

