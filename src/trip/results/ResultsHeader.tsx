import React from 'react';
import './ItineraryResult.css';
import ItineraryPath from './ItineraryPath';
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

class ResultsHeader extends React.Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xl-10 col-lg-9">
            <ItineraryPath />
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
