import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';

const BookingsTableHeader = styled(TableCell)({
  backgroundColor: '#F5F8FA',
  fontWeight: 'bold',
  color: '#45565E',
});



interface BookingsListProps {

}

class BookingsList extends React.Component<BookingsListProps> {
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
              <TableRow>
                <TableCell align="left">
                  <a className="booking-details-link" href="/bookings/">UDSAKDK1</a>
                </TableCell>
                <TableCell align="left">Dumont, Ronald</TableCell>
                <TableCell align="left">Jul 31, 2020</TableCell>
                <TableCell align="left">Aug 15, 2020</TableCell>
                <TableCell align="left">$1200 USD</TableCell>
                <TableCell align="left">ROM-PRG</TableCell>
                <TableCell align="left">Ticketed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <a className="booking-details-link" href="/bookings/">UDSAKDK1</a>
                </TableCell>
                <TableCell align="left">Dumont, Ronald</TableCell>
                <TableCell align="left">Jul 31, 2020</TableCell>
                <TableCell align="left">Aug 15, 2020</TableCell>
                <TableCell align="left">$1200 USD</TableCell>
                <TableCell align="left">ROM-PRG</TableCell>
                <TableCell align="left">Ticketed</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default BookingsList;