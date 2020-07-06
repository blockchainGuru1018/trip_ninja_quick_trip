import React from 'react';

interface FareBreakdownProps {

}

class FareBreakdown extends React.Component<FareBreakdownProps> {

  render() {

    return (
      <div>
        <h5>Fare Breakdown</h5>       
        <div className="book-container">
          <p>Fare Breakdown goes here!</p>
        </div>
      </div>
    );
  }

}

export default FareBreakdown;
