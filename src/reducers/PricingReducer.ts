import { PricingDetails } from '../trip/results/PricingInterfaces';

function pricingReducer(state: PricingDetails = {} as any, action: any) {
  switch(action.type) {

    case 'PRICING_LOADING':
      return {...state, loading: action.value};

    default:
      return state;
  }
}


export default pricingReducer;
