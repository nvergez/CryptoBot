import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { useStyles } from '../Style'
import { Copyright } from '../Copyright'

export default function Bot() {
    const classes = useStyles();
    return (
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        Bot
        <Container maxWidth="lg" className={classes.container}>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    )
}