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

const FareTableHeader = styled(TableCell)({
  backgroundColor: 'var(--primary-dark)',
  color: '#ffffff',
  border: 'solid 1px #CACDD6',
});

//interface FareSelectProps {
//  brands: Array<Brands>
//}

class FareSelect extends React.Component {
  render() {
    function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
      return { name, calories, fat, carbs, protein };
    }
    
    const rows = [
      createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      createData('Eclair', 262, 16.0, 24, 6.0),
      createData('Cupcake', 305, 3.7, 67, 4.3),
      createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    const brands = ["Basic", "Flex", "Something", "Business"];
    const brandNames = brands.map(brand => (
      <FareTableHeader align="right">{brand}</FareTableHeader>
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
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
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