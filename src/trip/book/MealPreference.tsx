import React, { useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { updatePassengerInfo } from '../../actions/BookActions';
import { useTranslation } from 'react-i18next';
import { PricedItinerary, SegmentPricingInfo, PricedFlightDetails } from '../results/PricingInterfaces';
import { MealPreferences } from './BookInterfaces';
import mealCodes from '../../assets/data/mealCodes.json';


interface MealPreferenceProps {
  index: number;
  updatePassengerInfo: typeof updatePassengerInfo;
  meals?: Array<MealPreferences> | undefined;
  pricedItineraries: Array<PricedItinerary>
}

export default function MealPreference(props: MealPreferenceProps) {
  const [mealsIncluded, setMealsIncluded] = React.useState(false);
  const [flightsWithMeals, setFlightsWithMeals] = React.useState([] as Array<string>);
  const [itinerariesWithMeals, setItinerariesWithMeals] = React.useState([] as Array<number>);
  const [ t ] = useTranslation('common');

  useEffect(() => { 
    let flightList: Array<string> = [];
    let itineraryList: Array<number> = [];
    const mealsOffered: Array<string> = ["Meal", "Dinner", "Lunch", "Breakfast"];
    
    props.pricedItineraries.forEach((itinerary: PricedItinerary) => {
      itinerary.segments.forEach((segment: SegmentPricingInfo) => {
        segment.flight_details.forEach((flight: PricedFlightDetails) => {
          if (flight.meals.some(x => mealsOffered.includes(x))) {
            flightList.push(flight.flight_number);
            itineraryList.push(itinerary.itinerary_reference);
          }
        });
      });
    });

    setMealsIncluded(flightList.length > 0);
    setFlightsWithMeals(flightList);
    setItinerariesWithMeals([...new Set(itineraryList)]);
  }, [props.pricedItineraries, setMealsIncluded, setFlightsWithMeals, setItinerariesWithMeals]);

  const addMealToItinerary = (value: any) => {
    let meals: Array<MealPreferences> = [];
    itinerariesWithMeals.forEach((itinerary: number) => {
      meals.push({"itinerary_reference": itinerary.toString(), "meal_choice": value});
    });
    props.updatePassengerInfo(props.index, 'meals', meals);
  };

  return(
    <div>
      <h5>{t('book.passengerDetailsModal.mealPreferences')}</h5>
      <div className="row meal-preference-container">
        <div className="col">
          {mealsIncluded &&
          <div>
            <p>{t('book.passengerDetailsModal.mealsForFlights')} {flightsWithMeals.join(', ')}</p>
            <div className="col-sm-3 no-pad-left">
              <FormControl variant="outlined" fullWidth>
                <Select
                  id="meal-preference"
                  value={props.meals ? props.meals[0].meal_choice : 'Any'}
                  labelId="meal-label"
                  onChange={(event: any) => addMealToItinerary(event.target.value)}
                >
                  {mealCodes.map((item, index) => (
                    <MenuItem key={index} value={item.code}>{item.label}</MenuItem>
                  ))};
                </Select>
              </FormControl>
            </div>
          </div>
          }
          {!mealsIncluded &&
          <div>
            <p>{t('book.passengerDetailsModal.noMealsAvailable')}</p>
          </div>
          }
        </div>
      </div>
    </div>
  );
}