import { Container, Grid, useMediaQuery } from '@material-ui/core';
import LoadingGif from '../../assets/loading.gif';
import React from 'react';
import { useStyles } from './style';

export const Loading = () => {
    //const
    const classes = useStyles();
    const matches = useMediaQuery("(min-width:600px)");

    //render
    return <Container>
        <Grid className={classes.loadingBackground} container direction="row" justify="center" alignItems="center">
            <Grid item>
                <img className={classes.loadingImage} width={matches ? "300px" : "80%"} height="auto" src={LoadingGif} alt="loading" />
            </Grid>
        </Grid>
    </Container>
} 