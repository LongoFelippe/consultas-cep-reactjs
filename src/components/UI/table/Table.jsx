import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from './TableRow';

const buildTableRows = (rows) => {
  if (rows) {
    rows.map((row) => (
      <TableRow key={row.id} row={row} />
    ));
  }
};

export default function CollapsibleTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Endereço</TableCell>
            <TableCell align="right">Cidade</TableCell>
            <TableCell align="right">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows && buildTableRows(rows)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
