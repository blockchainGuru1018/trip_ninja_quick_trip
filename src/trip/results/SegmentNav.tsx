import React from 'react';

interface SegmentNavProps {
  pathSequence: string[]
}

class SegmentNav extends React.Component<SegmentNavProps> {
  render() {
    const segments = this.props.pathSequence.map((item: string, index: number) => (
      <div className="segment-nav-item" key={index.toString()}>
        <a className="segment-nav-link" href={'/results/segment/'+ index}>{item}</a>
      </div>
    ));
    return (
      <div id="segment-nav">
        <h3>Itinerary</h3>
        <div className="segment-nav-item">
          <a className="segment-nav-link active" href="/results/itinerary/" key="overview">Overview</a>
        </div>
        {segments}
      </div>
    );
  }
}

export default SegmentNav;
