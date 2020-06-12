import React from 'react';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import FlightLand from '@material-ui/icons/FlightLand';
import './Results.css';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { Results, Segment } from './ResultsInterfaces';
import { numberOfDaysDifference } from '../../helpers/DateHelpers';

interface PreResultsFlightSectionsProps {
  searchResults: Results | null
}

class PreResultsFlightSections extends React.Component {
  componentDidMount() {
    // const results: Results = this.props.searchResults;
    // const locations = results.segments.map((segment: Segment) => {
    //   const origin = segment.origin_name.split(',')[0];
    //   const destination = segment.origin_name.split(',')[0];
    // })

  }
  render() {
    const locations = ['Singapore', 'London', 'Doncaster'];

    return (<div>
      {
        locations.map((location: string, index: number) => {
          let flightTakeOff = index === 0;
          let flightLanding = index === locations.length - 1;

          return (
            <div
              className="standard-text bold-text flight-section"
              key={"flight-section" + index}
            >
              {
                flightTakeOff
                  ? <FlightTakeoff className="flight-icon" color="primary" />
                  : flightLanding
                    ? <FlightLand className="flight-icon" color="primary" />
                    : <RadioButtonUncheckedIcon className="flight-icon" />
              }
              {location}
              {
                flightLanding
                  ? ''
                  : <div className="dotted-connector"></div>
              }
            </div>
          );
        })
      }
    </div>
    );
  }
}

export default PreResultsFlightSections;
