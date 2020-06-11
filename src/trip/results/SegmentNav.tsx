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
        <a key={index} href="/results/segment/0">{item}</a>
      </div>
    ));
    return (
      <div id="segment-nav">
        <h4>Itinerary</h4>
        <p>Overview</p>
        {segments}
      </div>
    );
  }
}

export default SegmentNav;
