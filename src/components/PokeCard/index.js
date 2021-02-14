import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { TypeChip } from '../TypeChip';

const useStyles = makeStyles(theme => ({
    card: {
        width: '330px',
        minHeight: 150,
        margin: '0 auto',
        marginBottom: '20px',
        [theme.breakpoints.up('md')]: {
            width: '80%'
        }
    },
    img: {
        display: 'block',
        margin: '0 auto'
    },
    caption: {
        fontWeight: '600',
        textAlign: 'center'
    },
    subtitle: {
        fontWeight: '600',
    },
    groupTypeChip: {
        "& > *": {
            marginRight: '5px',
            marginBottom: '5px'
        }
    },
    marginTop: {
        marginTop: '10px'
    }
}));

export const PokeCard = (props) => {
    const { height, weight, types, order, image, name } = props.pokemon;
    const classes = useStyles();
    return <Card className={classes.card} >
        <Grid container>
            <Grid item xs={6}>
                <img className={classes.img} src={image} alt={name} />
                <Typography className={classes.caption} variant="caption" display="block" gutterBottom>{name.toUpperCase()}</Typography>
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