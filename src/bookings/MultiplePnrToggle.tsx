import React from 'react';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

interface MultiplePnrToggleProps {

}

export default function MultiplePnrToggle(props: MultiplePnrToggleProps) {
  const [pnrView, setPnrView] = React.useState<string | null>('true');

  const handlePnrView = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setPnrView(newAlignment);
  };

  return (
    <div className="float-right">
      <span className="text-bold multi-pnr-view-label">Multiple PNRs</span>
      <ToggleButtonGroup
        value={pnrView}
        exclusive
        onChange={handlePnrView}
        aria-label="text alignment"
      >
        <ToggleButton value="false" aria-label="condensed">
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton value="true" aria-label="expanded">
          <FormatAlignCenterIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};