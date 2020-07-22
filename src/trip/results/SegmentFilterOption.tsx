import React from 'react';
import TuneIcon from '@material-ui/icons/Tune';
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


class SegmentFilterOption extends React.Component {
  state = {
    open: false,
  }
  render () {
    const filterOptionsList: Array<string> = ['Checked Bags', 'Fare Type', 'Airline', 'Stops', 'Refundability']
    const filterOptions = filterOptionsList.map((item, index) => (
      <MenuItem className="capitalize" key={index} value={item}>{item}</MenuItem>
    ));

    return (
      <div className='segment-filter-container'>
        <div className='segment-icon-container'><TuneIcon color="primary" />
          <Button className='text-bold' onClick={() => this.setState({open: true})}>Filter Flights:</Button>
        </div>
        <Dialog open={this.state.open}>
          <DialogTitle>Fill the form</DialogTitle>
      </Dialog>
      </div>
    );
  }
}

export default SegmentFilterOption;