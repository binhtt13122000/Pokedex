import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';

const useStyles = makeStyles(theme => ({
    paginationStyle: {
        display: 'block',
        marginBottom: '20px',
        marginTop: '20px',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    }
}))
export const CustomPagination = (props) => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    return <Grid container direction="row" alignItems="center" justify="center">
        <Pagination variant="outlined" size={matches ? "medium" : 'small'} count={10} color="primary" className={classes.paginationStyle} {...props} />
    </Grid>
}