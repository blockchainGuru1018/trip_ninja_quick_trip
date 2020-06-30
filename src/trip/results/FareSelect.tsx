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
import Tooltip from '@material-ui/core/Tooltip';

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

    return(
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="fare select table">
            <TableHead>
              <TableRow>
                <FareTableHeader>Features</FareTableHeader>
                {this.brandNamesRow(brandsList)}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <FareTableLabelCell align="left">Description</FareTableLabelCell>
                {this.brandDescriptionRow(brandsList)}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">Checked Bags</FareTableLabelCell>
                {this.checkedBagsRow(brandsList)}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">Cabin Bags</FareTableLabelCell>
                {this.cabinBagsRow(brandsList)}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">Seat Selection</FareTableLabelCell>
                {this.seatSelectionRow(brandsList)}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">Changes</FareTableLabelCell>
                {this.changesRow(brandsList)}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">Refundable</FareTableLabelCell>
                {this.refundableRow(brandsList)}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">Booking Code</FareTableLabelCell>
                {this.bookingCodeRow(brandsList)}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left">Fare Basis</FareTableLabelCell>
                {this.fareBasisRow(brandsList)}
              </TableRow>
              <TableRow>
                <FareTableLabelCell align="left"></FareTableLabelCell>
                {this.fareSelectionButtonRow(brandsList)}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>  
      </div>
    );
  }
  
  brandNamesRow = (brandsList: Array<Brands>) => {
    return brandsList.map((brand: any, index) => (
      <FareTableHeader key={index} align="center">{brand.fare_info[0].brand.name}</FareTableHeader>
    ));
  }

  brandDescriptionRow = (brandsList: Array<Brands>) => {
    return brandsList.map((brand: any, index) => (
      brand.fare_info[0].brand.tag_line
        ? <FareTableCell key={index} align="center">
          {brand.fare_info[0].brand.tag_line}
        </FareTableCell>
        : this.brandNotAvailableCell(index)       
    ));
  }

  checkedBagsRow = (brandsList: Array<Brands>) => {
    return brandsList.map((brand: any, index) => (
      <FareTableCell key={index} align="center">{brand.baggage_info.pieces} {brand.baggage_info.units}</FareTableCell>
    ));
  }
  
  cabinBagsRow = (brandsList: Array<Brands>) => {
    return brandsList.map((brand: any, index) => (
      brand.fare_info[0].brand.brand_services.carry_on_hand_baggage
        ? <FareTableCell key={index} align="center">
          this.brandedFaresIcon(brand.fare_info[0].brand.brand_services.carry_on_hand_baggage)
        </FareTableCell>
        : this.brandNotAvailableCell(index)
    ));
  }
  
  seatSelectionRow = (brandsList: Array<Brands>) => {
    return brandsList.map((brand: any, index) => (
      <FareTableCell key={index} align="center">{this.brandedFaresIcon(brand.fare_info[0].brand.brand_services.seat_assignment)}</FareTableCell>
    ));
  }
  
  changesRow = (brandsList: Array<Brands>) => {
    return brandsList.map((brand: any, index) => (
      <FareTableCell key={index} align="center">{this.brandedFaresIcon(brand.fare_info[0].brand.brand_services.rebooking)}</FareTableCell>
    ));
  }

  refundableRow = (brandsList: Array<Brands>) => {
    return brandsList.map((brand: any, index) => (
      <FareTableCell key={index} align="center">{this.brandedFaresIcon(brand.fare_info[0].brand.brand_services.refund)}</FareTableCell>
    ));
  }
  
  bookingCodeRow = (brandsList: Array<Brands>) => {
    return brandsList.map((brand: any, index) => (
      <FareTableCell key={index} align="center">{brand.fare_info[0].booking_code}</FareTableCell>
    ));
  }

  fareBasisRow = (brandsList: Array<Brands>) => {
    return brandsList.map((brand: any, index) => (
      <FareTableCell key={index} align="center">{brand.fare_info[0].fare_basis}</FareTableCell>
    ));
  }

  fareSelectionButtonRow = (brandsList: Array<Brands>) => {
    return brandsList.map((brand: any, index) => (
      <FareTableCell key={index} align="center">
        <Button
          variant="contained"
          color="secondary">
          {this.calculateRelativePrice(brand.price, Number(brandsList[this.state.activeBrandIndex].price))}
        </Button>
      </FareTableCell>
    ));
  }

  brandNotAvailableCell = (index: number) => {
    return <Tooltip title="Information not available" placement="top">
      <FareTableCell key={index.toString()} align="center" className="no-brand-info">
        N/A
      </FareTableCell>
    </Tooltip>;
  }

  brandedFaresIcon = (value: string) => {
    const icons = {"false": <CloseIcon />, "true": <CheckIcon />, "$": <AttachMoneyIcon/>};
    return icons[value];
  }

  calculateRelativePrice = (currentPrice: number, lowestPrice: number) => {
    let relativePrice = currentPrice - lowestPrice;
    return (relativePrice >= 0 ? '+ ' : '- ') + currencySymbol(this.props.currency) + Math.abs(relativePrice).toFixed();
  }
}

export default FareSelect;