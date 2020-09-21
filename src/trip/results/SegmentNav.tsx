import React from 'react';
import history from '../../History';

interface SegmentNavProps {
  pathSequence: Array<string>
  currentIndex?: number
}

class SegmentNav extends React.Component<SegmentNavProps> {
  render() {
    const segments = this.props.pathSequence.map((item: string, index: number) => (
      <div className="segment-nav-item" key={index.toString()}>
        <button className={'segment-nav-link ' + (this.props.currentIndex === index ? 'active' : '')}
          onClick={() => history.push('/results/segment/'+ index)}>
          {item}
        </button>
      </div>
    ));
    return (
      <div id="segment-nav">
        <h3>Itinerary</h3>
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <div className="segment-nav-item justify-content-start">
              <button className={'segment-nav-link ' + (typeof this.props.currentIndex === 'undefined' ? 'active' : '')}
                onClick={() => history.push('/results/itinerary/')} 
                key="overview">
                Overview
              </button>
            </div>
            {segments}
          </div>
        </div>
      </div>
    );
  }
}

export default SegmentNav;
