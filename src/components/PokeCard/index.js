import React from 'react';
import { Grid, Card, Typography } from '@material-ui/core';
import { TypeChip } from '../TypeChip';
import { useHistory } from 'react-router';
import { useStyles } from './style';

export const PokeCard = (props) => {
    //const
    const { height, weight, types, order, image, name } = props.pokemon;
    const history = useHistory();
    const classes = useStyles();

    //function
    const showDetail = (e, name) => {
        history.push('/pokemon/' + name)
    }

    //render
    return <Card className={classes.card} onClick={e => showDetail(e, name)}>
        <Grid container>
            <Grid item xs={6}>
                <img className={classes.img} src={image} alt={name} width="100px" height="100px" />
                <Typography className={`${classes.caption} ${classes.marginTop}`} variant="caption" display="block" gutterBottom>{name.toUpperCase()}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography className={`${classes.marginTop} ${classes.subtitle}`} variant="caption" display="block" gutterBottom>ORDER</Typography>
                <Typography className={classes.caption} variant="h6" display="block">{`#${order}`}</Typography>
                <Typography className={classes.subtitle} variant="caption" display="block" gutterBottom>TYPE</Typography>
                <div className={classes.groupTypeChip}>
                    {types.map((type, index) => {
                        return <TypeChip type={type} key={index} />
                    })}
                </div>
            </Grid>
            <Grid item xs={12}>
                <Typography className={`${classes.caption} ${classes.marginTop}`} variant="caption" display="block">Height: {height} | Weight: {weight}</Typography>
            </Grid>
        </Grid>
    </Card>
}