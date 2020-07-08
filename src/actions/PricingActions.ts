import { PricingDetails } from '../trip/results/PricingInterfaces';
//import { setPricingResults } from './BookActions';
import API from '../Api';
import { setErrorDetails } from './ResultsActions';


export function pricingLoading(value: boolean) {
  return {
    type: 'PRICING_LOADING',
    value
  };
}

export const priceFlights = (pricingPayload: PricingDetails) => (dispatch: any) => {
  dispatch(pricingLoading(true));
  const url: string = '/confirmflight/';

  return API.post(url, pricingPayload)
    .then((response: any) => {
      if (response.data.status) {
        throw 'error';
      } else {
        dispatch(pricingLoading(false));
        dispatch(setErrorDetails(false, 'pricing'));
        console.log("response:", response);
        //dispatch(setPricingResults(response.data));
        return {'success': true};
      }
    })
    .catch((error: any) => {
      dispatch(pricingLoading(false));
      dispatch(setErrorDetails(true, 'pricing'));
      return {'success': false};
    });
};

