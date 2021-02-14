import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles'
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';
import { getAllBalances } from '../../api/binance'

const styles = theme => ({
})

class ListBalances  extends Component {
    _isMounted = false

    constructor() {
        super()

        this.state = {
            balances: []
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
            getAllBalances()
            .then((response) => {
                this.setState({balances: Object.entries(response)})
            })
            .catch((error) => {
                this.setState({balances: []})
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Title>Balances</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Coin</TableCell>
                            <TableCell>Total ($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.balances.map((row) => (
                        <TableRow key={row[0]}>
                            <TableCell>{row[0]}</TableCell>
                            <TableCell>{row[1]}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        )
    }
}

ListBalances.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ListBalances)