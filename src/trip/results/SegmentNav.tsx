import React from 'react';

class SegmentNav extends React.Component {

  render() {
    const pathSequence = [
      "LON-CDG",
      "CDG-YUL",
      "YUL-LON"
    ];
    const segments = pathSequence.map((item, index) => (
      <div>
        <a className="segment-nav-link" key={index} href="/results/segment/0">{item}</a>
      </div>
    ));
    return (
      <div id="segment-nav">
        <h3>Itinerary</h3>
        <a className="segment-nav-link" href="/results/itinerary">Overview</a>
        {segments}
      </div>
    );
  }
}

export default SegmentNav;
