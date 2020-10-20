import React from 'react';
import { Segment } from './ResultsInterfaces';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import { withTranslation, WithTranslation } from 'react-i18next';
import { firstLetterCapital } from '../../helpers/MiscHelpers';

interface SegmentPriceProps extends WithTranslation {
  segment: Segment;
  currency: string;
  activeSegment?: Segment;
  totalPrice: number;
  viLinkedSegment?: Segment;
}

class SegmentPrice extends React.Component<SegmentPriceProps> {
  render() {
    const relativePrice: number = this.props.activeSegment
      ? this.props.segment.relativePrice! - this.props.activeSegment.relativePrice!
      : 0;
    const segmentSource: string = this.props.segment.virtual_interline
      ? this.setViSegmentSource(this.props.segment)
      : this.makePrettySegmentSource(this.props.segment);

    return (
      <div className="col-sm-2 my-auto">
        <p className="text-bold text-center segment-price">{this.setRelativePriceString(Math.round(relativePrice))}</p>
        <p className='text-small text-center'>{this.props.t("commonWords.total")}: {currencySymbol(this.props.currency)}{Math.round(this.props.totalPrice + relativePrice)}</p>
        <p className='text-small text-center'>{segmentSource}</p>
      </div>
    );
  }

  setViSegmentSource(segment: Segment) {
    return this.props.viLinkedSegment && segment.source === this.props.viLinkedSegment.source
      ? this.makePrettySegmentSource(segment)
      : 'Multiple Data Sources';
  }

  makePrettySegmentSource(segment: Segment) {
    return `${firstLetterCapital(segment.source)} - ${segment.credential_info.pcc}`
  }

  setRelativePriceString = (relativePrice: number) =>
    `${relativePrice >= 0 ? '+ ' : '- '} ${currencySymbol(this.props.currency)}${Math.abs(relativePrice)}`
}

export default withTranslation('common')(SegmentPrice);
