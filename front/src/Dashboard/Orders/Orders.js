import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { useStyles } from '../Style'
import { Copyright } from '../Copyright'
import ListOrders from './ListOrders'

export default function Orders() {
    const classes = useStyles();
    return (
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <ListOrders />
        <Container maxWidth="lg" className={classes.container}>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    )
}