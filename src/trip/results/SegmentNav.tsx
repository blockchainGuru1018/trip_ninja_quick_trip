import React from 'react';

class SegmentNav extends React.Component {

  render() {
    const pathSequence = [
      "LON-CDG",
      "CDG-YUL",
      "YUL-LON"
    ];
    const segments = pathSequence.map((item, index) => (
      <div className="segment-nav-item">
        <a className="segment-nav-link" key={index} href={'/results/segment/'+ index}>{item}</a>
      </div>
    ));
    return (
      <div id="segment-nav">
        <h3>Itinerary</h3>
        <div className="segment-nav-item">
          <a className="segment-nav-link active" href="/results/itinerary">Overview</a>
        </div>
        {segments}
      </div>
    );
  }
}

export default SegmentNav;
