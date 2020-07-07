import { PricingPayload } from '../trip/results/PricingInterfaces';
//import { setPricingResults } from './BookActions';
import API from '../Api';


export function pricingLoading(value: boolean) {
  return {
    type: 'PRICING_LOADING',
    value
  };
}

export function setPricingErrorDetails(value: boolean) {
  return {
    type: 'SET_PRICING_ERROR_DETAILS',
    value
  };
}

export const priceFlights = (pricingPayload: PricingPayload) => (dispatch: any) => {
  dispatch(pricingLoading(true));
  const url: string = '/confirmflight/';

  return API.post(url, pricingPayload)
    .then((response: any) => {
      dispatch(pricingLoading(false));
      console.log("response:", response);
      //dispatch(setPricingResults(response.data));
      //dispatch(setPricingErrorDetails(false));
      return {'success': true};
    })
    .catch((error: any) => {
      dispatch(pricingLoading(false));
      dispatch(setPricingErrorDetails(true));
      return {'success': false};
    });
};
  
