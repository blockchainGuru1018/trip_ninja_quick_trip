import React from 'react';
import CabinList from '../../assets/data/cabins.json';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { updateFlightValue } from '../../actions/SearchActions';
import { withTranslation, WithTranslation } from 'react-i18next';

interface CabinSelectProps extends WithTranslation {
  i: number;
  cabinClass: string;
  updateFlightValue: typeof updateFlightValue;
}

export class CabinSelect extends React.Component<CabinSelectProps> {
  render() {
    const cabins = CabinList.map((item, index) => (
      <MenuItem key={index} value={item.code}>{this.props.t('commonWords.cabins.'+item.code)}</MenuItem>
    ));

    return (
      <FormControl fullWidth>
        <Select
          id="cabin"
          value={this.getCabinClassByName()}
          variant="outlined"
          style={{padding: '6px 0'}}
          onChange={(event: any) =>
            this.props.updateFlightValue(
              this.props.i, 'cabinClass', event.target.value
            )
          }
        >
          {cabins}
        </Select>
      </FormControl>
    );
  }
  getCabinClassByName = () => {
    const cabinListIndex: number = CabinList.findIndex(
      (cabinClass: any) => cabinClass.code === this.props.cabinClass
    );
    return cabinListIndex >= 0
      ? CabinList[cabinListIndex].code
      : CabinList[0].code;
  }
}

export default withTranslation('common')(CabinSelect);
