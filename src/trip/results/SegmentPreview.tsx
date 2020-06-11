import React from 'react';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class SegmentPreview extends React.Component {

  render() {
    return (
      <div className="row segment-preview">
        <div className="col-sm-2">
          <p>LGW-SIN</p>
          <p>May 16</p>
        </div>
        <div className="col-sm-2">
          <p>UA1234</p>
          <p>United</p>
        </div>
        <div className="col-sm-2">
          <p>15:00-16:00</p>
          <p>1 h 20 m</p>
        </div>
        <div className="col-sm-2">
          <p>Direct</p>
        </div>
        <div className="col-sm-2">
          <p>Pub. Fare</p>
          <p>X Class</p>
        </div>
        <div className="col-sm-1">
          <CardTravelIcon color="primary" fontSize="large"/><p>1 pc</p>
        </div>
        <div className="col-sm-1">
          <ExpandMoreIcon color="secondary" fontSize="large"/>
        </div>
      </div>
    );
  }
}

export default SegmentPreview;
