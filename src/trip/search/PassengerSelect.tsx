import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';

class PassengerSelect extends React.Component {
  render() {
    return (
      <div>
        <FormControl fullWidth>
          <Input
            id="input-with-icon-adornment"
            placeholder="Passengers"
            startAdornment={
              <InputAdornment position="start">
                <PersonAddOutlinedIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    )
  }
}

export default PassengerSelect;