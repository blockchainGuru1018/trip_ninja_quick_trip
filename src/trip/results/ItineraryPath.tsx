import React from 'react';

class ItineraryPath extends React.Component {

  render() {

    const segmentPath = <p>LGW-DXB•May 19 | DXB-LGW•May 24 | LGW-DXB•May 27 | DXB-LGW•May 29|LGW-DXB•May 35</p>; 

    return (
      <div className="float-right itinerary-path">
        {segmentPath}
      </div>
    );
  }
}

export default ItineraryPath;
