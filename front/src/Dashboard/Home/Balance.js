import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles'
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Title from '../Title';
import { getTotalBalance } from '../../api/binance'

const styles = theme => ({
    depositContext: {
        flex: 1,
    },
})

class Balance extends Component {
    _isMounted = false

    constructor() {
        super()

        this.state = {
            balance: 0
        }

        this.handleReload = this.handleReload.bind(this)
    }

    componentDidMount() {
        this._isMounted = true
        this.handleReload()
        setInterval(this.handleReload, 10000)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    handleReload() {
        if (this._isMounted) {
            getTotalBalance()
            .then((response) => {
                this.setState({balance: response.balance})
            })
            .catch((error) => {
                this.setState({balance: 0})
            })
        }
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <Title>Balance</Title>
                <Typography component="p" variant="h4">
                    ${this.state.balance}
                </Typography>
                <Typography color="textSecondary" className={classes.depositContext}>
                    on {new Date().toDateString()}
                </Typography>
                <div>
                    <Link color="primary" href="#" onClick={() => {window.location='/balances'}}>
                        View balances
                    </Link>
                </div>
            </React.Fragment>
        )
    }
}

Balance.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Balance)
