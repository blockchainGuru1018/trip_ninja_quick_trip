import React from 'react';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class SegmentPreview extends React.Component {

  render() {
    return (
      <div className="row segment-preview">
        <div className="col-sm-2">
          <p className="text-bold">LGW-SIN</p>
          <p className="text-small">May 16</p>
        </div>
        <div className="col-sm-2">
          <p className="text-bold">UA1234</p>
          <p className="text-small">United</p>
        </div>
        <div className="col-sm-2">
          <p className="text-bold">15:00-16:00</p>
          <p className="text-small">1 h 20 m</p>
        </div>
        <div className="col-sm-2">
          <p className="text-bold">Direct</p>
        </div>
        <div className="col-sm-2">
          <p className="text-bold">Pub. Fare</p>
          <p className="text-small">X Class</p>
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
