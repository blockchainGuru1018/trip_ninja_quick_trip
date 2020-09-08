import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import expandedIcon from '../assets/images/expanded_icon.svg';
import condensedIcon from '../assets/images/condensed_icon.svg';

interface MultiPnrViewToggleProps {
  pnrView: string;
  handlePnrView: any;
}

export default function MultiPnrViewToggle(props: MultiPnrViewToggleProps) {

  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    props.handlePnrView(newValue);
  };

  return (
    <div className="float-right">
      <span className="text-bold multi-pnr-view-label">Multiple PNRs</span>
      <ToggleButtonGroup
        value={props.pnrView}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="condensed" aria-label="condensed">
          <img src={condensedIcon} alt="condensed-icon" className="pnr-icon my-auto" />
        </ToggleButton>
        <ToggleButton value="expanded" aria-label="expanded">
          <img src={expandedIcon} alt="expanded-icon" className="pnr-icon my-auto" />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};