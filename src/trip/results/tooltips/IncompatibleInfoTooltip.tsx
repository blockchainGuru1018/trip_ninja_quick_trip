import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, Theme } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import { Segment } from '../ResultsInterfaces';

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: '500px',
    padding: '20px;',
    fontFamily: 'NeuzeitGro-Reg',
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

interface IncompatibleInfoTooltipProps {
  activeSegment: Segment;
  segment: Segment;
  pathSequence: Array<string>;
}
export default function IncompatibleInfoTooltip(props: IncompatibleInfoTooltipProps) {

  const removeValue = (array: Array<number>, item: number) => {
    var index = array.indexOf(item);
    if (index !== -1) array.splice(index, 1);
  };

  let activeItineraryStructure: Array<number> = JSON.parse(props.activeSegment.itinerary_structure);
  let incompatibleItineraryStructure: Array<number> = JSON.parse(props.segment.itinerary_structure);
  removeValue(activeItineraryStructure, props.activeSegment.segment_position);
  removeValue(incompatibleItineraryStructure, props.segment.segment_position);
  const segmentDifferences: Array<number> = [...activeItineraryStructure, ...incompatibleItineraryStructure];

  const getDifferenceHTML = (difference: number) => {
    return (
      <div>
        <h5 className='standard-text'>
          {`Segment ${difference}: ${props.pathSequence[difference]}`}
        </h5>
      </div>
    );
  };

  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <h5 className='bold-text'>Selecting this segment will effect the following segments:</h5>
          {segmentDifferences.map((difference: number) => getDifferenceHTML(difference))}
        </React.Fragment>
      }
    >
      <InfoIcon className='incompatible-info-icon' color='primary'/>
    </HtmlTooltip>
  );
}
