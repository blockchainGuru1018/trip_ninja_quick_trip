import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useTranslation } from 'react-i18next';

interface MealPreferenceProps {

}


export default function MealPreference(props: MealPreferenceProps) {
  const [mealsIncluded, setMealsIncluded] = React.useState(false);
  const [ t ] = useTranslation('common');

  return(
    <div>
      <h5>Meal Preferences</h5>
      {mealsIncluded &&
        <div>
          <p>Preferred meal for flights ABC, XYZ</p>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="gender-label">Preference</InputLabel>
            <Select
              id="meal-preference"
              value={}
              label="Preference"
              labelId="meal-preference-label"
              onChange={(event: any) =>
                props.updatePassengerInfo(
                  props.index, 'meals', event.target.value
                )
              }
            >
              <MenuItem value="F">1</MenuItem>
              <MenuItem value="M">2</MenuItem>
            </Select>
          </FormControl>
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