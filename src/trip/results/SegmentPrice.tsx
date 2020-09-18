import React from 'react';
import { Segment } from './ResultsInterfaces';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import { withTranslation, WithTranslation } from 'react-i18next';

interface SegmentPriceProps extends WithTranslation {
  segment: Segment;
  currency: string;
  activeSegment?: Segment;
  totalPrice: number;
}

class SegmentPrice extends React.Component<SegmentPriceProps> {
  render() {
    const relativePrice: number = this.props.activeSegment
      ? this.props.segment.relativePrice! - this.props.activeSegment.relativePrice!
      : 0;
    return (
      <div className="col-sm-2 my-auto">
        <p className="text-bold text-center segment-price">{this.setRelativePriceString(Math.round(relativePrice))}</p>
        <p className='text-small text-center'>{this.props.t("commonWords.total")}: {currencySymbol(this.props.currency)}{Math.round(this.props.totalPrice + relativePrice)}</p>
        <p className='text-small text-center'>{this.props.t("results.segmentPrice.source")}: {this.props.segment.source} - {this.props.segment.credential_info.pcc}</p>
      </div>
    );
  }

  setRelativePriceString = (relativePrice: number) =>
    `${relativePrice >= 0 ? '+ ' : '- '} ${currencySymbol(this.props.currency)}${Math.abs(relativePrice)}`
}

export default withTranslation('common')(SegmentPrice);
