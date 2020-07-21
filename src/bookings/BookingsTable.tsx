import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';
import { Booking } from './BookingsInterfaces';
import Moment from 'react-moment';
import { currencySymbol } from '../helpers/CurrencySymbolHelper';

const BookingsTableHeader = styled(TableCell)({
  backgroundColor: '#F5F8FA',
  fontWeight: 'bold',
  color: '#45565E',
});

const DetailsLinkCell = styled(TableCell)({
  color: '#4BAFD7',
  fontWeight: 'bold',
  '&:hover': {
    opacity: '0.7',
    cursor: 'pointer'
  } 
});



interface BookingsTableProps {
  bookings: Array<Booking>
}

class BookingsTable extends React.Component<BookingsTableProps> {
  
  render() {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <BookingsTableHeader align="left" size="small">UR Locator/PNR</BookingsTableHeader>
                <BookingsTableHeader align="left" size="small">Passenger 1</BookingsTableHeader>
                <BookingsTableHeader align="left" size="small">Booking Date</BookingsTableHeader>
                <BookingsTableHeader align="left" size="small">Departure Date</BookingsTableHeader>
                <BookingsTableHeader align="left" size="small">Price</BookingsTableHeader>
                <BookingsTableHeader align="left" size="small">Route</BookingsTableHeader>
                <BookingsTableHeader align="left" size="small">Status</BookingsTableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.displayBookings(this.props.bookings)}
            </TableBody>
            <TableFooter>
              <TableRow>
                
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    );
  }

  displayBookings = (bookings: Array<Booking>) => {
    return bookings.map((booking: Booking, index: number) => {
      return (
        <TableRow>
          <DetailsLinkCell align="left" onClick={() => {}}>
            {booking.ur_locator}
          </DetailsLinkCell>
          <TableCell align="left">{booking.primary_last_name}, {booking.primary_first_name}</TableCell>
          <TableCell align="left">
            <Moment format="MMM DD, YYYY">{booking.booking_date}</Moment>
          </TableCell>
          <TableCell align="left">
            <Moment format="MMM DD, YYYY">{booking.departure_date}</Moment>
          </TableCell>
          <TableCell align="left">{currencySymbol(booking.currency)}{booking.price} {booking.currency}</TableCell>
          <TableCell align="left">{booking.path_sequence}</TableCell>
          <TableCell align="left">{booking.status}</TableCell>
        </TableRow>
      );
    });
  }
}

export default BookingsTable;