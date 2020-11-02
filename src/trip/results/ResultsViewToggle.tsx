import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


interface ResultsViewToggleProps {
  viewType: string;
  handleViewChange: any;
}

export default function ResultsViewToggle(props:ResultsViewToggleProps) {

  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    props.handleViewChange(newValue);
  };

  return (
    <div className="row">
      <div className="col no-pad-left">
        <span className="text-bold">View by: </span>
        <ToggleButtonGroup
          value={props.viewType}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="normal" aria-label="normal">
            Itinerary
          </ToggleButton>
          <ToggleButton value="pnr" aria-label="pnr">
            PNR
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}