import React from 'react';
import Paper from '@material-ui/core/Paper';

interface ItineraryProps {

}

class Itinerary extends React.Component<ItineraryProps> {

  render() {

    return (
      <div>
        <h5>Itinerary</h5>
        <Paper>
          <div className="paper-container">
            <p>Flights go here!</p>
          </div>
        </Paper>
      </div>
    );
  }

}

export default Itinerary;
