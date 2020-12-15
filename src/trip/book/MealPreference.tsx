import React, { useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { updatePassengerInfo } from '../../actions/BookActions';
import { useTranslation } from 'react-i18next';
import { PricedItinerary, SegmentPricingInfo, PricedFlightDetails } from '../results/PricingInterfaces';
import mealCodes from '../../assets/data/mealCodes.json';


interface MealPreferenceProps {
  index: number;
  updatePassengerInfo: typeof updatePassengerInfo;
  meal?: string;
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
    
    props.pricedItineraries.forEach((itinerary: PricedItinerary) => {
      itinerary.segments.forEach((segment: SegmentPricingInfo) => {
        segment.flight_details.forEach((flight: PricedFlightDetails) => {
          if (flight.meals.includes("Meal")) {
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
    return itinerariesWithMeals.map((itinerary: number) => {
      return {"itinerary": itinerary, "meal_choice": value};
    });
  };

  return(
    <div>
      <h5>Meal Preferences</h5>
      {mealsIncluded &&
        <div>
          <p>Preferred meal for flights: {flightsWithMeals.join(', ')}</p>
          <div className="col-sm-3">
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="meal-label">Meal Preference</InputLabel>
              <Select
                id="meal-preference"
                value={props.meal}
                label="Meal Preference"
                labelId="meal-label"
                onChange={(event: any) =>
                  props.updatePassengerInfo(
                    props.index, 'meal', event.target.value
                  )
                }
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
          <p>No meals available on these flights. Food may be available for purchase.</p>
        </div>
      }
    </div>
  );
}