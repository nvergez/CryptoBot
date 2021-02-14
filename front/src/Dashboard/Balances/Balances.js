import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { useStyles } from '../Style'
import { Copyright } from '../Copyright'
import ListBalances from './ListBalances'

export default function Balances() {
    const classes = useStyles();
    return (
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <ListBalances />
        <Container maxWidth="lg" className={classes.container}>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    )
}