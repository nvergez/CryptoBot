import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles'
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { fetchLogs } from '../../api/ai'

const styles = theme => ({
    item: {
        padding: 0
    }
})

class LogList extends Component {
    _isMounted = false

    constructor() {
        super()

        this.state = {
            logs: []
        }

        this.handleReload = this.handleReload.bind(this)
    }

    componentDidMount() {
        this._isMounted = true
        this.handleReload()
        setInterval(this.handleReload, 5000)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    handleReload() {
        if (this._isMounted) {
            fetchLogs()
            .then((response) => {
                var tmp = []
                var i = 1
                for (var item of response) {
                    tmp.push({id: i, msg: item})
                    i += 1
                }
                this.setState({logs: tmp})
            })
            .catch((error) => {
                this.setState({logs: []})
            })
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <div>
                    <Typography variant="h6">
                        Logs
                    </Typography>
                </div>
                <List >
                    {this.state.logs.map((elem) => (
                    <ListItem className={classes.item} key={elem.id}>
                        <ListItemText primary={elem.msg}/>
                    </ListItem>
                    ))}
                </List>
            </div>
        )
    }
}

LogList.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LogList)