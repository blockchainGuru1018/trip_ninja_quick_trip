import React from 'react';

class TripPath extends React.Component {
  render() {
    let path: string = "YHZ - YOW";
    return (
      <div className="float-right">
        <p>{path}</p>
      </div>
    )
  }
}

export default TripPath;