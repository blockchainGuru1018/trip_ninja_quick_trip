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
      <div className="col">
        <ToggleButtonGroup
          value={props.viewType}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="normal" aria-label="normal">
            Normal View
          </ToggleButton>
          <ToggleButton value="pnr" aria-label="pnr">
            PNR View
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}