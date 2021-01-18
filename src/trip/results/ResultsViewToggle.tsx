import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '7px 10px',
      lineHeight: '1'
    }
  }),
);

interface ResultsViewToggleProps {
  viewType: string;
  handleViewChange: any;
}

export default function ResultsViewToggle(props:ResultsViewToggleProps) {
  const [ t ] = useTranslation('common');
  const classes = useStyles();
  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    props.handleViewChange(newValue);
  };

  return (
    <div className="row">
      <div className="col no-pad-left">
        <span className="text-bold">{t('results.resultsViewToggle.viewBy')} </span>
        <ToggleButtonGroup
          value={props.viewType}
          exclusive
          onChange={handleChange}
          size="small"
        >
          <ToggleButton className={classes.root} value="itinerary" aria-label="itinerary">
            {t('results.segmentNav.title')}
          </ToggleButton>
          <ToggleButton className={classes.root} value="pnr" aria-label="pnr">
            {t('commonWords.ticket')}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}