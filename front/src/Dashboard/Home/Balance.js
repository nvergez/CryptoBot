import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Balance() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Balance</Title>
      <Typography component="p" variant="h4">
        $3,027.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {new Date().toDateString()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={() => {window.location='/balances'}}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
