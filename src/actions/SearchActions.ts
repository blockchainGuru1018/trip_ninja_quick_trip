import { SearchPayload, PriceGraphPayload } from '../trip/search/SearchInterfaces';
import { setResults, setErrorDetails, setActiveSegments }
  from './ResultsActions';
import API from '../Api';
import { Dispatch } from "react";


export function fetchSearch(tripDetails: Object) {
  return {
    type: 'FETCH_SEARCH',
    tripDetails
  };
}

export function newSearch(searchDetails: Object) {
  return {
    type: 'NEW_SEARCH',
    searchDetails
  };
}

export function resetSearch() {
  return {
    type: 'RESET_SEARCH'
  };
}

export function setValue(valueType: string, value: any) {
  return {
    type: 'SET_VALUE',
    valueType,
    value
  };
}

export const addFlight = (flight: object) => async (dispatch: any) => {
  await dispatch({
    type: 'ADD_FLIGHT',
    flight
  });
  return Promise.resolve();
};

export function updateFlightValue(index: number, key: string, value: string) {
  return {
    type: 'UPDATE_FLIGHT_VALUE',
    index,
    key,
    value
  };
}

export function updatePassengers(passengerType: string, value: number) {
  return {
    type: 'UPDATE_PASSENGERS',
    passengerType,
    value
  };
}

export function removeFlight(flightIndex: number) {
  return {
    type: 'REMOVE_FLIGHT',
    flightIndex
  };
}

export function searchLoading(value: boolean) {
  return {
    type: 'SEARCH_LOADING',
    value
  };
}

export const searchFlights = (searchPayload: SearchPayload) => (dispatch: Dispatch<any>) => {
  dispatch(searchLoading(true));
  const url: string = '/multicitysearch/';
  return API.post(url, searchPayload)
    .then((response: any) => {
      if (response.status === 200 && response.data.fare_structure) {
        return setSearchSuccess(dispatch, response);
      }
      else {
        return setSearchFailed(dispatch);
      }
    })
    .catch((error: any) => {
      return setSearchFailed(dispatch);
    });
};

export const getPriceGraph = (priceGraphPayload: PriceGraphPayload) => (dispatch: any) => {
  API.post('/price-map/', priceGraphPayload)
    .then((response: any) => {
      let prices = {};
      if (response.status === 200) {
        prices = response.data;
      }
      dispatch(setPriceGraph(prices));
    })
    .catch((error: any) => {
      dispatch(setPriceGraph({}));
    });
};


function setPriceGraph (prices: any) {
  return {
    type: 'SET_PRICE_GRAPH',
    prices
  };
}


const setSearchSuccess = (dispatch: Dispatch<any>, response: any) => {
  dispatch(setResults(response.data));
  dispatch(setActiveSegments());
  dispatch(setErrorDetails(false, 'search'));
  dispatch(searchLoading(false));
  return {'success': true, 'flex_trip': response.data.flex_trip ? true : false};
};

const setSearchFailed = (dispatch: any) => {
  dispatch(searchLoading(false));
  dispatch(setErrorDetails(true, 'search'));
  return {'success': false};
};
