import React from 'react';

interface ItineraryProps {

}

class Itinerary extends React.Component<ItineraryProps> {

  render() {

    return (
      <div>
        <h5>Itinerary</h5>
        <div className="book-container">
          <p>Flights go here!</p>
        </div>
      </div>
    );
  }

}

export default Itinerary;
