import { Container, Grid, makeStyles } from '@material-ui/core';
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
    return <Container>
        <Grid className={classes.loadingBackground} container direction="row" justify="center" alignItems="center">
            <Grid item>
                <img className={classes.loadingImage} width="300px" height="auto" src={LoadingGif} alt="loading" />
            </Grid>
        </Grid>
    </Container>
} 