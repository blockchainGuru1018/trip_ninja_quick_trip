import React from 'react';
import { firstLetterCapital } from '../../helpers/MiscHelpers';

interface SegmentSourceProps {
  source: string
}

class SegmentSource extends React.Component<SegmentSourceProps> {
  render() {
    return (
      <div className="col-sm-2">
        <p className="text-bold">{firstLetterCapital(this.props.source)}</p>
      </div>
    );
  }

}

export default SegmentSource;