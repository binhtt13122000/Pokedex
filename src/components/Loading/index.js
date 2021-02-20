import { Container, Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import LoadingGif from '../../assets/loading.gif';
import React from 'react';

const useStyles = makeStyles({
    loadingImage: {
        display: 'block',
        margin: '0 auto',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    loadingBackground: {
        minHeight: '70vh'
    }
})

export const Loading = () => {
    const classes = useStyles();
    const matches = useMediaQuery("(min-width:600px)");
    return <Container>
        <Grid className={classes.loadingBackground} container direction="row" justify="center" alignItems="center">
            <Grid item>
                <img className={classes.loadingImage} width={matches ? "300px" : "80%"} height="auto" src={LoadingGif} alt="loading" />
            </Grid>
        </Grid>
    </Container>
} 