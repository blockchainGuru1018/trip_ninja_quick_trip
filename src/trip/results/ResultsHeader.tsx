import React from 'react';
import './ItineraryResult.css';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

const ChangeSearchButton = styled(Button)({
  backgroundColor: '#ffffff',
  color: '#45565E',
  border: 'solid 2px #45565E',
  '&:hover': {
    backgroundColor: '#45565E',
    color: '#ffffff',
  }
});

interface ResultsHeaderProps {
  tripInfo: any
}

class ResultsHeader extends React.Component<ResultsHeaderProps> {

  render() {
    //const segmentPath = this.props.tripInfo.map((item: string, index: number) => (
    //  <span>{item.origin}-{item.destination}•May 19 | </span>
    //));

    const segmentPath = this.props.tripInfo;
    return (
      <div>
        <div className="row">
          <div className="col-xl-10 col-lg-9">
            <div className="float-right itinerary-path">
              <p>{segmentPath}</p>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3">
            <div className="float-right">
              <ChangeSearchButton
                variant="contained"
                href="/search">
                Change Search
              </ChangeSearchButton>
            </div>
          </div>
        </div>
        <hr/>
      </div>  
    );
  }
}

export default ResultsHeader;
