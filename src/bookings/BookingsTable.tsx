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
import SortIcon from '@material-ui/icons/Sort';
import Moment from 'react-moment';
import { styled } from '@material-ui/core/styles';
import { Booking } from './BookingsInterfaces';
import { currencySymbol } from '../helpers/CurrencySymbolHelper';
import BookingDetailsDrawer from './BookingDetailsDrawer';
import { getBookingDetails, cancelBooking, queueBooking } from '../actions/BookingsActions';
import { firstLetterCapital } from '../helpers/MiscHelpers';
import { AuthDetails } from '../auth/AuthInterfaces';

const BookingsTableHeader = styled(TableCell)({
  backgroundColor: '#F5F8FA',
  fontWeight: 'bold',
  color: 'var(--color-secondary)',
});

const DetailsLinkCell = styled(TableCell)({
  color: 'var(--color-tertiary)',
  fontWeight: 'bold',
  '&:hover': {
    opacity: '0.7',
    cursor: 'pointer'
  } 
});



interface BookingsTableProps {
  bookings: Array<Booking>
  getBookingDetails: typeof getBookingDetails;
  cancelBooking: typeof cancelBooking;
  queueBooking: typeof queueBooking;
  authDetails: AuthDetails;
  loading: boolean;
}

class BookingsTable extends React.Component<BookingsTableProps> {
  state = {
    rowsPerPage: 10,
    page: 0,
    order: 'asc',
    orderBy: 'booking_date',
    showPnr: false
  }

  render() {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {this.displayTableHeader()}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.bookings.length > 0 
                ? this.displayBookings(this.props.bookings)
                : <TableRow><TableCell align="center" colSpan={7}>No bookings found!</TableCell></TableRow>
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  count={this.props.bookings.length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    );
  }

  displayTableHeader = () => {
    const headerFields = [
      {"label": "PNR Numbers", "name": "pnr_numbers"},
      {"label": "Passenger 1", "name": "passenger.last_name"}, 
      {"label": "Booking Date", "name": "booking_date"}, 
      {"label": "Departure Date", "name": "departure_date"},
      {"label": "Price", "name": "total_price"},
      {"label": "Route", "name": "route"},
      {"label": "Status", "name": "status"}
    ];
    return headerFields.map((column: any, index: number) => {
      return (
        <BookingsTableHeader align="left" size="small" key={index.toString()}>
          {column.label} 
          <SortIcon 
            className={'sort-icon' + ((this.state.orderBy === column.name) ? ' sort-active' : '')} 
            fontSize="small"
            onClick={() => this.handleSort(column.name)}
          />
        </BookingsTableHeader>
      );
    });
  }

  displayBookings = (bookings: Array<Booking>) => {
    return bookings.sort(this.compareRows(this.state.orderBy, this.state.order))
      .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
      .map((booking: Booking, index: number) => {
        return (
          <TableRow key={index.toString()}>
            <DetailsLinkCell align="left">
              <BookingDetailsDrawer 
                booking={booking}
                getBookingDetails={this.props.getBookingDetails}
                cancelBooking={this.props.cancelBooking}
                queueBooking={this.props.queueBooking}
                authDetails={this.props.authDetails}
                loading={this.props.loading}
              />
            </DetailsLinkCell>
            <TableCell align="left">{booking.primary_passenger.last_name}, {booking.primary_passenger.first_name}</TableCell>
            <TableCell align="left">
              <Moment format="MMM DD, YYYY">{booking.booking_date}</Moment>
            </TableCell>
            <TableCell align="left">
              <Moment format="MMM DD, YYYY">{booking.departure_date}</Moment>
            </TableCell>
            <TableCell align="left">{currencySymbol(booking.currency)}{booking.total_price.toFixed()} {booking.currency}</TableCell>
            <TableCell align="left">{booking.route}</TableCell>
            <TableCell align="left">{firstLetterCapital(booking.status)}</TableCell>
          </TableRow>
        );
      });
  }

  handleSort = (key: string) => {
    let sortOrder = this.state.order;
    if (key === this.state.orderBy) {
      sortOrder = (this.state.order === 'asc') ? 'desc' : 'asc';
    }
    this.setState({orderBy: key, order: sortOrder});
  }

  compareRows = (key: any, order: string) => {
    return function innerSort(a: any, b: any) {  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      comparison = (varA > varB) ? 1 : -1;
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  handleChangePage = (event: any, newPage: number) => {
    this.setState({page: newPage});
  };

  handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({rowsPerPage: (parseInt(event.target.value, 10)), page: 0});
  };

}

export default BookingsTable;