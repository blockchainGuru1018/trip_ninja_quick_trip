import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { BrandInfo, Segment } from './ResultsInterfaces';
import { styled } from '@material-ui/core/styles';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Tooltip from '@material-ui/core/Tooltip';
import { updateFareFamily } from '../../actions/ResultsActions';
import { withTranslation, WithTranslation } from 'react-i18next';

const FareTableCell = styled(TableCell)({
  border: 'solid 1px #CACDD6',
});

const FareTableLabelCell = styled(TableCell)({
  border: 'solid 1px #CACDD6',
  fontWeight: 'bold',
});

const FareTableHeader = styled(TableCell)({
  backgroundColor: 'var(--secondary)',
  color: '#ffffff',
  border: 'solid 1px #CACDD6',
});


interface FareSelectProps extends WithTranslation {
  brands: Array<BrandInfo> | undefined;
  currency: string;
  segment: Segment;
  updateActives: () => void;
  updateFareFamily?: typeof updateFareFamily;
  totalPrice: number;
  activeSegment?: Segment;
}

class FareSelect extends React.Component<FareSelectProps> {

  render() {
    const brandsList =  this.props.brands!;

    return(
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="fare select table">
            <TableHead>
              <TableRow>
                <FareTableHeader>{this.props.t("results.fareSelect.features")}</FareTableHeader>
                {this.brandNamesRow(brandsList)}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <FareTableLabelCell align="left">{this.props.t("results.fareSelect.description")}</FareTableLabelCell>
                {this.brandDescriptionRow(brandsList)}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">{this.props.t("results.fareSelect.checkedBags")}</FareTableLabelCell>
                {this.checkedBagsRow(brandsList)}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">{this.props.t("results.fareSelect.cabinBags")}</FareTableLabelCell>
                {this.cabinBagsRow(brandsList)}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">{this.props.t("results.fareSelect.seatSelection")}</FareTableLabelCell>
                {this.seatSelectionRow(brandsList)}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">{this.props.t("results.fareSelect.changes")}</FareTableLabelCell>
                {this.changesRow(brandsList)}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">{this.props.t("results.fareSelect.refundable")}</FareTableLabelCell>
                {this.refundableRow(brandsList)}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">{this.props.t("results.fareSelect.bookingCode")}</FareTableLabelCell>
                {this.bookingCodeRow(brandsList)}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">{this.props.t("results.fareSelect.fareBasis")}</FareTableLabelCell>
                {this.fareBasisRow(brandsList)}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">{this.props.t("results.fareSelect.price")}</FareTableLabelCell>
                {this.priceRow(brandsList)}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left"/>
                {this.fareSelectionButtonRow(brandsList)}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>  
      </div>
    );
  }
  
  brandNamesRow = (brandsList: Array<BrandInfo>) => {
    return brandsList.map((brand: BrandInfo, index) => (
      <FareTableHeader key={index} align="center">{brand.fare_info[0].brand.name}</FareTableHeader>
    ));
  }

  brandDescriptionRow = (brandsList: Array<BrandInfo>) => {
    return brandsList.map((brand: BrandInfo, index) => (
      brand.fare_info[0].brand.tag_line
        ? <FareTableCell key={index} align="center">
          {brand.fare_info[0].brand.tag_line}
        </FareTableCell>
        : this.brandNotAvailableCell(index)       
    ));
  }

  checkedBagsRow = (brandsList: Array<BrandInfo>) => {
    return brandsList.map((brand: BrandInfo, index) => (
      <FareTableCell key={index} align="center">{brand.baggage_info.pieces} {brand.baggage_info.units}</FareTableCell>
    ));
  }
  
  cabinBagsRow = (brandsList: Array<BrandInfo>) => {
    return brandsList.map((brand: BrandInfo, index) => (
      brand.fare_info[0].brand.brand_services.carry_on_hand_baggage
        ? <FareTableCell key={index} align="center">
          {this.brandedFaresIcon(brand.fare_info[0].brand.brand_services.carry_on_hand_baggage)}
        </FareTableCell>
        : this.brandNotAvailableCell(index)
    ));
  }
  
  seatSelectionRow = (brandsList: Array<BrandInfo>) => {
    return brandsList.map((brand: BrandInfo, index) => (
      brand.fare_info[0].brand.brand_services.seat_assignment
        ? <FareTableCell key={index} align="center">{this.brandedFaresIcon(brand.fare_info[0].brand.brand_services.seat_assignment)}</FareTableCell>
        : this.brandNotAvailableCell(index)
    ));
  }
  
  changesRow = (brandsList: Array<BrandInfo>) => {
    return brandsList.map((brand: BrandInfo, index) => (
      brand.fare_info[0].brand.brand_services.rebooking
        ? <FareTableCell key={index} align="center">{this.brandedFaresIcon(brand.fare_info[0].brand.brand_services.rebooking)}</FareTableCell>
        : this.brandNotAvailableCell(index)
    ));
  }

  refundableRow = (brandsList: Array<BrandInfo>) => {
    return brandsList.map((brand: BrandInfo, index) => (
      brand.fare_info[0].brand.brand_services.refund
        ? <FareTableCell key={index} align="center">{this.brandedFaresIcon(brand.fare_info[0].brand.brand_services.refund)}</FareTableCell>
        : this.brandNotAvailableCell(index)
    ));
  }
  
  bookingCodeRow = (brandsList: Array<BrandInfo>) => {
    return brandsList.map((brand: BrandInfo, index) => (
      <FareTableCell key={index} align="center">{brand.fare_info[0].booking_code}</FareTableCell>
    ));
  }

  fareBasisRow = (brandsList: Array<BrandInfo>) => {
    return brandsList.map((brand: BrandInfo, index) => (
      <FareTableCell key={index} align="center">{brand.fare_info[0].fare_basis}</FareTableCell>
    ));
  }

  priceRow = (brandsList: Array<BrandInfo>) => {
    let activeBrandIndex = this.props.segment.selected_brand_index ? this.props.segment.selected_brand_index : 0;
    return brandsList.map((brand: BrandInfo, index: number) => {
      const relativePrice = this.calculateRelativePrice(brand.price, Number(brandsList[activeBrandIndex].price));
      const relativePriceNum = Number(relativePrice.substr(3,));
      return (
        <FareTableCell key={index} align="center">
          <p className="text-bold text-center">
            {relativePrice}
          </p>
          <p className="text-small text-center">
            {this.props.t("commonWords.total")} : {currencySymbol(this.props.currency)}{relativePrice[0] === '+'
              ? Math.round(this.props.totalPrice + relativePriceNum)
              : Math.round(this.props.totalPrice - relativePriceNum)}
          </p>
        </FareTableCell>
      );
    });
  }

  fareSelectionButtonRow = (brandsList: Array<BrandInfo>) =>
    brandsList.map((brand: BrandInfo, index) => (
      <FareTableCell key={index} align="center">
        <Button
          disableElevation
          variant="contained"
          color="secondary"
          onClick={() => this.updateSegmentFareFamily(brandsList, index)}>
          {this.props.t("results.fareSelect.selectSegment")}
        </Button>
      </FareTableCell>
    ));

  brandNotAvailableCell = (index: number) => {
    return <Tooltip key={index.toString()} title={this.props.t("results.fareSelect.informationNotAvailable").toString()} placement="top">
      <FareTableCell key={index.toString()} align="center" className="no-brand-info">
        {this.props.t("results.fareSelect.na")}
      </FareTableCell>
    </Tooltip>;
  }

  brandedFaresIcon = (value: string) => {
    const icons = {"false": <CloseIcon />, "true": <CheckIcon />, "$": <AttachMoneyIcon/>};
    return icons[value];
  }

  calculateRelativePrice = (currentPrice: number, lowestPrice: number) => {
    const relativePrice = this.props.activeSegment ? this.props.segment.relativePrice! - this.props.activeSegment.relativePrice! : 0;
    const brandPrice = currentPrice - lowestPrice;
    const combinedPrice = relativePrice + brandPrice;
    const absCombinedPrice = Math.abs(Math.round(combinedPrice));
    return (combinedPrice >= 0 ? '+ ' : '- ') + currencySymbol(this.props.currency) + absCombinedPrice;
  }

  updateSegmentFareFamily = (brands: Array<BrandInfo>, index: number) => {
    this.props.updateFareFamily && this.props.updateFareFamily(this.props.segment, brands, index);
    this.props.updateActives();
  }
}

export default withTranslation('common')(FareSelect);
