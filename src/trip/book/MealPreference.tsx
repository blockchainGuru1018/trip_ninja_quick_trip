import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { updatePassengerInfo } from '../../actions/BookActions';
import { useTranslation } from 'react-i18next';

interface MealPreferenceProps {
  index: number;
  updatePassengerInfo: typeof updatePassengerInfo;
  meal?: string;
}

export default function MealPreference(props: MealPreferenceProps) {
  const [mealsIncluded, setMealsIncluded] = React.useState(false);
  const [flightsWithMeals, setFlightsWithMeals] = React.useState([] as Array<string>);
  const [ t ] = useTranslation('common');

  const checkMealAvailability = () => {
    let flights: Array<string> = [];

    if (flights.length > 0) {
      setMealsIncluded(true);
      setFlightsWithMeals(flights);
    }
  };

  return(
    <div>
      <h5>Meal Preferences</h5>
      {mealsIncluded &&
        <div>
          <p>Preferred meal for flights ABC, XYZ</p>
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
                <MenuItem value="F">1</MenuItem>
                <MenuItem value="M">2</MenuItem>
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