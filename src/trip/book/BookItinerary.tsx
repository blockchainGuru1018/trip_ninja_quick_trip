import React from 'react';
import SegmentPreviews from '../results/SegmentPreviews';

interface BookItineraryProps {

}

class BookItinerary extends React.Component<BookItineraryProps> {

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

export default BookItinerary;
