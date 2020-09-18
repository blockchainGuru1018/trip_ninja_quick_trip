import React from 'react';
import history from '../../History';
import { withTranslation, WithTranslation } from 'react-i18next';

interface SegmentNavProps extends WithTranslation {
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
        <h3>{this.props.t("results.segmentNav.title")}</h3>
        <div className="segment-nav-item">
          <button className={'segment-nav-link ' + (typeof this.props.currentIndex === 'undefined' ? 'active' : '')}
            onClick={() => history.push('/results/itinerary/')} 
            key="overview">
            {this.props.t("results.segmentNav.overview")}
          </button>
        </div>
        {segments}
      </div>
    );
  }
}

export default withTranslation('common')(SegmentNav);
