import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles'
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';
import { getOpenOrders } from '../../api/binance'

const styles = theme => ({
  seeMore: {
    marginTop: 50,
  }
})

class OpenOrders extends Component {
    _isMounted = false

    constructor() {
        super()

        this.state = {
            orders: []
        }

        this.handleReload = this.handleReload.bind(this)
    }

    componentDidMount() {
        this._isMounted = true
        this.handleReload()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    handleReload() {
        if (this._isMounted) {
            getOpenOrders()
            .then((response) => {
                this.setState({orders: response})
            })
            .catch((error) => {
                this.setState({orders: []})
            })
        }
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <Title>Open orders</Title>
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
                    {this.state.orders.map((row) => (
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
                <div className={classes.seeMore}>
                    <Link color="primary" href="#" onClick={() => {window.location='/orders'}}>
                    See more orders
                    </Link>
                </div>
                </React.Fragment>
        )
    }
}

OpenOrders.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(OpenOrders)


/*
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
];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function OpenOrders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Open orders</Title>
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
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={() => {window.location='/orders'}}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}


*/