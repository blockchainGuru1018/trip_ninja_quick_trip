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
import { Booking, PnrInfo } from './BookingsInterfaces';
import { currencySymbol } from '../helpers/CurrencySymbolHelper';
import BookingDetailsDrawer from './BookingDetailsDrawer';
import { getBookingDetails, cancelBooking, queueBooking, ticketBooking } from '../actions/BookingsActions';
import { firstLetterCapital } from '../helpers/MiscHelpers';
import { AuthDetails } from '../auth/AuthInterfaces';
import expandedIcon from '../assets/images/expanded_icon.svg';
import { withTranslation, WithTranslation } from 'react-i18next';
import i18n from '../i18n';
import {dateLocaleMap} from '../localeMap';
import { format } from 'date-fns';

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



interface BookingsTableProps extends WithTranslation {
  bookings: Array<Booking>
  getBookingDetails: typeof getBookingDetails;
  cancelBooking: typeof cancelBooking;
  queueBooking: typeof queueBooking;
  ticketBooking: typeof ticketBooking;
  authDetails: AuthDetails;
  loading: boolean;
  multiplePnrDisplay: string;
}

class BookingsTable extends React.Component<BookingsTableProps> {
  state = {
    rowsPerPage: 10,
    page: 0,
    order: 'desc',
    orderBy: 'booking_date',
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
                : <TableRow><TableCell align="center" colSpan={7}>{this.props.t("bookings.bookingsTable.noBookings")}</TableCell></TableRow>
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
      {"label": this.props.t("bookings.bookingsTable.pnrNumbers"), "name": "pnr_numbers"},
      {"label": this.props.t("bookings.bookingsTable.passenger1"), "name": "passenger.last_name"}, 
      {"label": this.props.t("bookings.bookingsTable.bookingDate"), "name": "booking_date"}, 
      {"label": this.props.t("bookings.bookingsTable.departureDate"), "name": "departure_date"},
      {"label": this.props.t("bookings.bookingsTable.price"), "name": "total_price"},
      {"label": this.props.t("bookings.bookingsTable.route"), "name": "route"},
      {"label": this.props.t("bookings.bookingsTable.status"), "name": "status"}
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
        let bookingRows: Array<any> = [];
        console.log(new Date(booking.booking_date+'T00:00:00.000'));
        bookingRows.push(
          <TableRow key={index.toString()}>
            <DetailsLinkCell align="left">
              <BookingDetailsDrawer 
                booking={booking}
                getBookingDetails={this.props.getBookingDetails}
                cancelBooking={this.props.cancelBooking}
                queueBooking={this.props.queueBooking}
                ticketBooking={this.props.ticketBooking}
                authDetails={this.props.authDetails}
                loading={this.props.loading}
              />
            </DetailsLinkCell>
            <TableCell align="left">{booking.primary_passenger.last_name}, {booking.primary_passenger.first_name}</TableCell>
            <TableCell align="left">
              {format(new Date(booking.booking_date+'T00:00:00.000'), this.props.t("bookings.bookingsTable.dateFormat"), {locale:dateLocaleMap[i18n.language]})}
            </TableCell>
            <TableCell align="left">
              {format(new Date(booking.departure_date+'T00:00:00.000'), this.props.t("bookings.bookingsTable.dateFormat"), {locale:dateLocaleMap[i18n.language]})}
            </TableCell>
            <TableCell align="left">{currencySymbol(booking.currency)}{booking.total_price.toFixed()} {booking.currency}</TableCell>
            <TableCell align="left">{booking.route}</TableCell>
            <TableCell align="left">{firstLetterCapital(this.props.t("commonWords.status." + booking.status))}</TableCell>
          </TableRow>
        );
        if (this.props.multiplePnrDisplay === 'expanded' && booking.pnr_list.length > 1) { 
          booking.pnr_list.forEach((pnr: PnrInfo, pnrIndex: number) => {
            bookingRows.push(
              <TableRow key={index.toString()+'-'+ pnrIndex.toString()} selected>
                <DetailsLinkCell align="left">
                  <img src={expandedIcon} alt="expanded-icon" className="pnr-icon my-auto" />
                  <span className="expanded-pnr-label">{pnr.pnr_number}</span>
                </DetailsLinkCell>
                <TableCell align="left">{booking.primary_passenger.last_name}, {booking.primary_passenger.first_name}</TableCell>
                <TableCell align="left">
                  {format(new Date(booking.booking_date+'T00:00:00.000'), this.props.t("bookings.bookingsTable.dateFormat"), {locale:dateLocaleMap[i18n.language]})}
                </TableCell>
                <TableCell align="left">
                  {format(new Date(pnr.departure_date+'T00:00:00.000'), this.props.t("bookings.bookingsTable.dateFormat"), {locale:dateLocaleMap[i18n.language]})}
                </TableCell>
                <TableCell align="left">{currencySymbol(booking.currency)}{booking.total_price.toFixed()} {booking.currency}</TableCell>
                <TableCell align="left">{pnr.route}</TableCell>
                <TableCell align="left">{firstLetterCapital(pnr.pnr_status !== 'priced' ? pnr.pnr_status : booking.status)}</TableCell>
              </TableRow>
            );
          });
        }
        return bookingRows;
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

export default withTranslation('common')(BookingsTable);
