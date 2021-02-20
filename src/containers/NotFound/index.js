import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import React from 'react';
import NotFoundImg from '../../assets/notfound.jpg';
const useStyles = makeStyles({
    img: {
        display: 'block',
    },
    errorPage: {
        minHeight: '60vh'
    }
})
export const NotFound = () => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)')
    return <Grid className={classes.errorPage} container direction="row" justify="center" alignItems="center">
            <img width={matches ? '30%' : '80%'} height="auto" className={classes.img} src={NotFoundImg} alt="Not Found" />
    </Grid>
}