import React from 'react';
import ListIcon from '@material-ui/icons/List';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

interface MultiplePnrToggleProps {
  pnrView: string;
  handlePnrView: any;
}

export default function MultiplePnrToggle(props: MultiplePnrToggleProps) {

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
        aria-label="text alignment"
      >
        <ToggleButton value="condensed" aria-label="condensed">
          <ListIcon fontSize="small" />
          Condensed
        </ToggleButton>
        <ToggleButton value="expanded" aria-label="expanded">
          <AspectRatioIcon fontSize="small" />
          Expanded
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};