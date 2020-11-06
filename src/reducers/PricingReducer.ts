import { PricingDetails } from '../trip/results/PricingInterfaces';

function pricingReducer(state: PricingDetails = {} as any, action: any) {
  switch(action.type) {

    case 'PRICING_LOADING':
      return {...state, loading: action.value};

    case 'SET_PRICING_ERROR_DETAILS':
      return {...state, errors: {errorFound: action.value}};

    case 'SET_PRICING_RESULTS':
      return {
        ...action.data,
        loading: false
      };

    case 'UPDATE_ADDITIONAL_MARKUP':
      let additionalMarkup = action.additionalMarkup === '' ? 0 : parseFloat(action.additionalMarkup);
      console.log(action.additionalMarkup)
      state.pricing!.additional_markup = additionalMarkup;
      return {...state};

    default:
      return state;
  }
}


export default pricingReducer;
