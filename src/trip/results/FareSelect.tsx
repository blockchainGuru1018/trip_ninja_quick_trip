import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Brands } from './ResultsInterfaces';
import { styled } from '@material-ui/core/styles';

const FareTableCell = styled(TableCell)({
  border: 'solid 1px #CACDD6',
});

const FareTableHeader = styled(TableCell)({
  backgroundColor: 'var(--secondary)',
  color: '#ffffff',
  border: 'solid 1px #CACDD6',
});

interface FareSelectProps {
  brands: Array<Brands> | undefined
}

class FareSelect extends React.Component<FareSelectProps> {
  render() {
    function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
      return { name, calories, fat, carbs, protein };
    }
    console.log(this.props.brands);
    const rows = [
      createData('Description', 159, 6.0, 24, 4.0),
      createData('Checked Bags', 237, 9.0, 37, 4.3),
      createData('Cabin Bags', 262, 16.0, 24, 6.0),
      createData('Seat Selection', 305, 3.7, 67, 4.3),
      createData('Booking Code', 356, 16.0, 49, 3.9),
      createData('Fare Basis', 356, 16.0, 49, 3.9),
    ];

    const brands = ["Basic", "Flex", "Something", "Business"];
    const brandNames = brands.map((brand, index) => (
      <FareTableHeader key={index} align="center">{brand}</FareTableHeader>
    ));

    return(
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="fare select table">
            <TableHead>
              <TableRow>
                <FareTableHeader>Features</FareTableHeader>
                {brandNames}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <FareTableCell align="left">{row.name}</FareTableCell>
                  <FareTableCell align="center">{row.calories}</FareTableCell>
                  <FareTableCell align="center">{row.fat}</FareTableCell>
                  <FareTableCell align="center">{row.carbs}</FareTableCell>
                  <FareTableCell align="center">{row.protein}</FareTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>  
      </div>
    );
  }

}

export default FareSelect;