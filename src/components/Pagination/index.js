import { Grid, useMediaQuery } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';
import { LIMIT, LIMIT_ABILITY } from '../../constants/poke';
import { useStyles } from './style';


export const CustomPagination = (props) => {
    //const
    const { total, page, changePage, ability } = props;
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    //render
    return <Grid container direction="row" alignItems="center" justify="center">
        <Pagination variant="outlined" page={page} onChange={changePage} size={matches ? "medium" : 'small'} count={Math.ceil(total / (ability ? LIMIT_ABILITY : LIMIT) )} color="primary" className={classes.paginationStyle} />
    </Grid>
}