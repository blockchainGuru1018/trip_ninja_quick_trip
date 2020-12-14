import React from 'react';
import history from '../../History';
import { withTranslation, WithTranslation } from 'react-i18next';
import { setResultsLoading } from "../../actions/ResultsActions";

interface SegmentNavProps extends WithTranslation {
  pathSequence: Array<string>;
  currentIndex?: number;
  setResultsLoading: typeof setResultsLoading;
}

class SegmentNav extends React.Component<SegmentNavProps> {
  render() {
    const segments = this.props.pathSequence.map((item: string, index: number) => (
      <div className="segment-nav-item" key={index.toString()}>
        <button className={'segment-nav-link ' + (this.props.currentIndex === index ? 'active' : '')}
          onClick={() => this.changeUrl('/results/segment/'+ index)}>
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
                onClick={() => this.changeUrl('/results/itinerary/')}
                key="overview">
                {this.props.t("results.segmentNav.overview")}
              </button>
            </div>
            {segments}
          </div>
        </div>
      </div>
    );
  }

  changeUrl = (url: string) => {
    this.props.setResultsLoading(true);
    console.log('starting this')
    setTimeout(() => history.push(url), 2000);
    console.log('finishing this')
  }
}

export default withTranslation('common')(SegmentNav);
