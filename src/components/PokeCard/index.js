import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { TypeChip } from '../TypeChip';

const useStyles = makeStyles({
    card: {
        maxWidth: 320,
        minHeight: 150,

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
});

export const PokeCard = (props) => {
    const classes = useStyles();
    return <Card className={classes.card} >
        <Grid container>
            <Grid item xs={6}>
                <img className={classes.img} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" alt="4" />
                <Typography className={classes.caption} variant="caption" display="block" gutterBottom>CHARMANDER</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography className={`${classes.marginTop} ${classes.subtitle}`} variant="caption" display="block" gutterBottom>ORDER</Typography>
                <Typography className={classes.caption} variant="h6" display="block">#5</Typography>
                <Typography className={classes.subtitle} variant="caption" display="block" gutterBottom>TYPE</Typography>
                <div className={classes.groupTypeChip}>
                    <TypeChip type="fire" />
                    <TypeChip type="flying" />
                </div>
            </Grid>
        </Grid>
    </Card>
}