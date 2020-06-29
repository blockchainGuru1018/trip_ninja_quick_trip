import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Brands } from './ResultsInterfaces';
import { styled } from '@material-ui/core/styles';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

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


interface FareSelectProps {
  brands: Array<Brands> | undefined
  currency: string
}

class FareSelect extends React.Component<FareSelectProps> {
  state = {
    activeBrandIndex: 0
  }

  render() {
    const brandsList =  this.props.brands!;

    const brandNamesRow = brandsList.map((brand: any, index) => (
      <FareTableHeader key={index} align="center">{brand.fare_info[0].brand.name}</FareTableHeader>
    ));

    const brandDescriptionRow = brandsList.map((brand: any, index) => (
      <FareTableCell key={index} align="center">
        {brand.fare_info[0].brand.tag_line ? brand.fare_info[0].brand.tag_line : 'N/A'}
      </FareTableCell>
    ));

    const checkedBagsRow = brandsList.map((brand: any, index) => (
      <FareTableCell key={index} align="center">{brand.baggage_info.pieces} {brand.baggage_info.units}</FareTableCell>
    ));

    const cabinBagsRow = brandsList.map((brand: any, index) => (
      <FareTableCell key={index} align="center">
        {brand.fare_info[0].brand.brand_services.carry_on_hand_baggage ? this.brandedFaresIcon(brand.fare_info[0].brand.brand_services.carry_on_hand_baggage) : 'N/A'}
      </FareTableCell>
    ));

    const seatSelectionRow = brandsList.map((brand: any, index) => (
      <FareTableCell key={index} align="center">{this.brandedFaresIcon(brand.fare_info[0].brand.brand_services.seat_assignment)}</FareTableCell>
    ));

    const changesRow = brandsList.map((brand: any, index) => (
      <FareTableCell key={index} align="center">{this.brandedFaresIcon(brand.fare_info[0].brand.brand_services.rebooking)}</FareTableCell>
    ));

    const refundableRow = brandsList.map((brand: any, index) => (
      <FareTableCell key={index} align="center">{this.brandedFaresIcon(brand.fare_info[0].brand.brand_services.refund)}</FareTableCell>
    ));

    const bookingCodeRow = brandsList.map((brand: any, index) => (
      <FareTableCell key={index} align="center">{brand.fare_info[0].booking_code}</FareTableCell>
    ));

    const fareBasisRow = brandsList.map((brand: any, index) => (
      <FareTableCell key={index} align="center">{brand.fare_info[0].fare_basis}</FareTableCell>
    ));

    const fareSelectionRow = brandsList.map((brand: any, index) => (
      <FareTableCell key={index} align="center">
        <Button
          variant="contained"
          color="secondary">
          {this.calculateRelativePrice(brand.price, Number(brandsList[this.state.activeBrandIndex].price))}
        </Button>
      </FareTableCell>
    ));

    return(
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="fare select table">
            <TableHead>
              <TableRow>
                <FareTableHeader>Features</FareTableHeader>
                {brandNamesRow}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <FareTableLabelCell align="left">Description</FareTableLabelCell>
                {brandDescriptionRow}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">Checked Bags</FareTableLabelCell>
                {checkedBagsRow}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">Cabin Bags</FareTableLabelCell>
                {cabinBagsRow}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">Seat Selection</FareTableLabelCell>
                {seatSelectionRow}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">Changes</FareTableLabelCell>
                {changesRow}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">Refundable</FareTableLabelCell>
                {refundableRow}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">Booking Code</FareTableLabelCell>
                {bookingCodeRow}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">Fare Basis</FareTableLabelCell>
                {fareBasisRow}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left"></FareTableLabelCell>
                {fareSelectionRow}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>  
      </div>
    );
  }
  
  brandedFaresIcon = (value: string) => {
    const icons = {"false": <CloseIcon />, "true": <CheckIcon />, "$": <AttachMoneyIcon/>};
    return icons[value];
  }

  calculateRelativePrice = (currentPrice: number, lowestPrice: number) => {
    let relativePrice = currentPrice - lowestPrice;
    return (relativePrice >= 0 ? '+ ' : '- ') + currencySymbol(this.props.currency) + relativePrice.toFixed();
  }
}

export default FareSelect;