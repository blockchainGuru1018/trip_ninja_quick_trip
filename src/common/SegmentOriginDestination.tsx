import React from 'react';
import { Segment } from '../trip/results/ResultsInterfaces';
import i18n from '../i18n';
import { withTranslation, WithTranslation } from 'react-i18next';
import { dateLocaleMap } from '../localeMap';
import { format } from 'date-fns';
import { noTimeZoneOffsetDate } from '../helpers/DateHelpers';

interface SegmentOriginDestinationProps extends WithTranslation {
  segment: Segment
  departure?: string
  itineraryDisplay?: boolean
  linkedViSegment?: Segment
}

class SegmentOriginDestination extends React.Component<SegmentOriginDestinationProps> {
  render() {
    return (
      <div className={(this.props.itineraryDisplay ? ' col-sm-3 no-pad-left' : 'col-sm-2') + ' my-auto'}>
        <p className={'origin-destination flight-preview-grey-border' + (this.props.itineraryDisplay ? ' text-center' : '')} >{this.props.segment.origin}
          <span className="circle-divider">•</span>{this.props.linkedViSegment ? this.props.linkedViSegment.destination : this.props.segment.destination} 
        </p>
        {this.props.departure &&
          <p className="text-small flight-preview-grey-border">
            {format(new Date(noTimeZoneOffsetDate(this.props.departure)), this.props.t("results.resultsHeader.dateFormat"), {locale:dateLocaleMap[i18n.language]})}
          </p>
        }
      </div>
    );
  }

}

export default withTranslation('common')(SegmentOriginDestination);
