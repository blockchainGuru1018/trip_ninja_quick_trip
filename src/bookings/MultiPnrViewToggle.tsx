import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import expandedIcon from '../assets/images/expanded_icon.svg';
import condensedIcon from '../assets/images/condensed_icon.svg';
import { useTranslation } from 'react-i18next';

interface MultiPnrViewToggleProps {
  pnrView: string;
  handlePnrView: any;
}

export default function MultiPnrViewToggle(props: MultiPnrViewToggleProps) {
  const [ t ] = useTranslation('common');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    props.handlePnrView(newValue);
  };

  return (
    <div className="float-right">
      <span className="text-bold multi-pnr-view-label">{t('bookings.multiPNRViewToggle.title')}</span>
      <ToggleButtonGroup
        value={props.pnrView}
        exclusive
        onChange={handleChange}
      >

        <ToggleButton value="condensed" aria-label="condensed">
          <Tooltip title={t('bookings.multiPNRViewToggle.pnrsByTrip').toString()} placement="top">
            <img src={condensedIcon} alt="condensed-icon" className="pnr-icon my-auto" />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="expanded" aria-label="expanded">
          <Tooltip title={t('bookings.multiPNRViewToggle.pnrsByEach').toString()} placement="top">
            <img src={expandedIcon} alt="expanded-icon" className="pnr-icon my-auto" />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}