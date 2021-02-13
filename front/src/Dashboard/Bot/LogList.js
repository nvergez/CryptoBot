import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../Style'
import raw from '../../logs/dump.log';

var data = [
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