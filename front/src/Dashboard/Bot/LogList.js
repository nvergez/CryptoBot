import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../Style'
import raw from '../../logs/dump.log';

var data = [
    "The pair NMRBTC increases by 11.194968553459116% the last 15 seconds. (2021-02-10T17:40:03.395Z) (0.00088400)",
    "The pair CTSIBTC increases by 11.363636363636353% the last 15 seconds. (2021-02-10T20:37:03.294Z) (0.00000882)",
    "The pair CTSIBTC increases by 11.34663341645885% the last 15 seconds. (2021-02-10T20:37:03.495Z) (0.00000893)",
]

export default function LogList() {
    const classes = useStyles();
    const [logs, setLogs] = React.useState(data)
/*
    fetch(raw)
        .then(r => r.text())
        .then(text => {
            const tmp = text.split("\n")
            setLogs(tmp.slice(Math.max(tmp.length - 20, 0)).reverse())
        })
*/
    /*
    setInterval(() => {
        fetch(raw)
        .then(r => r.text())
        .then(text => {
            const tmp = text.split("\n")
            setLogs(tmp.slice(Math.max(tmp.length - 20, 0)))
        })
    }, 5000)
    */

    return (
    <div>
        <Typography variant="h6" className={classes.title}>
            Logs
        </Typography>
        <List >
            {logs.map((elem) => (
            <ListItem className={classes.item}>
                <ListItemText primary={elem}/>
            </ListItem>
            ))}
        </List>
    </div>
    )
}