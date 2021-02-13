import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';

// Generate Order Data
function createData(id, date, pair, type, side, price, quantity, status) {
  return { id, date, pair, type, side, price, quantity, status };
}

var today = new Date().toDateString()

const rows = [
    createData(0, today, 'ETH/BTC', 'Market', 'Sell', '0.00123421', '84', 'Filled'),
    createData(1, today, 'XRP/BTC', 'Market', 'Buy', '0.01294728', '132', 'Filled'),
    createData(2, today, 'XRP/BTC', 'Limit', 'Buy', '0.01923782', '32', 'Filled'),
    createData(3, today, 'LTC/BTC', 'Market', 'Sell', '0.02372839', '12', 'Filled'),
    createData(4, today, 'ETH/BTC', 'Limit', 'Buy', '0.01826352', '244', 'Filled'),
    createData(0, today, 'ETH/BTC', 'Market', 'Sell', '0.00123421', '84', 'Filled'),
    createData(1, today, 'XRP/BTC', 'Market', 'Buy', '0.01294728', '132', 'Filled'),
    createData(2, today, 'XRP/BTC', 'Limit', 'Buy', '0.01923782', '32', 'Filled'),
    createData(3, today, 'LTC/BTC', 'Market', 'Sell', '0.02372839', '12', 'Filled'),
    createData(4, today, 'ETH/BTC', 'Limit', 'Buy', '0.01826352', '244', 'Filled'),
    createData(0, today, 'ETH/BTC', 'Market', 'Sell', '0.00123421', '84', 'Filled'),
    createData(1, today, 'XRP/BTC', 'Market', 'Buy', '0.01294728', '132', 'Filled'),
    createData(2, today, 'XRP/BTC', 'Limit', 'Buy', '0.01923782', '32', 'Filled'),
    createData(3, today, 'LTC/BTC', 'Market', 'Sell', '0.02372839', '12', 'Filled'),
    createData(4, today, 'ETH/BTC', 'Limit', 'Buy', '0.01826352', '244', 'Filled'),
    createData(0, today, 'ETH/BTC', 'Market', 'Sell', '0.00123421', '84', 'Filled'),
    createData(1, today, 'XRP/BTC', 'Market', 'Buy', '0.01294728', '132', 'Filled'),
    createData(2, today, 'XRP/BTC', 'Limit', 'Buy', '0.01923782', '32', 'Filled'),
    createData(3, today, 'LTC/BTC', 'Market', 'Sell', '0.02372839', '12', 'Filled'),
    createData(4, today, 'ETH/BTC', 'Limit', 'Buy', '0.01826352', '244', 'Filled'),
];

export default function ListOrders() {
  return (
    <React.Fragment>
      <Title>Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Pair</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Side</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.pair}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.side}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
