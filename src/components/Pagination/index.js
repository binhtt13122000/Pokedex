import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';
import { LIMIT } from '../../constants/poke';

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
    const { total, page, changePage } = props;
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    return <Grid container direction="row" alignItems="center" justify="center">
        <Pagination variant="outlined" page={page} onChange={changePage} size={matches ? "medium" : 'small'} count={Math.ceil(total / LIMIT )} color="primary" className={classes.paginationStyle} />
    </Grid>
}