import React from 'react';
import Paper from '@material-ui/core/Paper';

interface FareBreakdownProps {

}

class FareBreakdown extends React.Component<FareBreakdownProps> {

  render() {

    return (
      <div>
        <h5>Fare Breakdown</h5>
        <Paper>
          <div className="paper-container">
            <p>Fare Breakdown goes here!</p>
          </div>
        </Paper>
      </div>
    );
  }

}

export default FareBreakdown;
