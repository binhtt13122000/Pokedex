import { Grid } from '@material-ui/core';
import React from 'react';
import { Fragment } from 'react';
import { useStyles } from '../style';
import Arrow from '../../../assets/arrow.png'
import { convertHyPhenStringToNormalString } from '../../../utils/function';


export const EvolutionChart = ({ evolutionChains, matches, }) => {
    const classes = useStyles();
    return <Fragment>
        {evolutionChains && evolutionChains.map((item, index) => {
            const keys = Object.keys(item);
            let first = true;
            return <Grid container alignItems="center" justify="center" key={index}>
                {keys.map((key, i) => {
                    if (item[key] !== null && key !== 'length') {
                        let evol = null;
                        if (first) {
                            evol = <Grid key={i} item xs={12} md={Math.floor(12 / (item.length * 2 - 1))}>
                                <img width={matches ? '60%' : '50%'} height="auto" className={classes.evolveImg} src={item[key].image} alt={item[key].name} />
                                <div className={classes.imgSub}>{item[key].name}</div>
                            </Grid>
                        } else {
                            evol = <Fragment key={i}>
                                <Grid item xs={12} md={Math.floor(12 / (item.length * 2 - 1))}>
                                    <img width={matches ? '60%' : '50%'} height="auto" className={classes.arrowImg} src={Arrow} alt="arrow" />
                                    <div className={classes.imgSub}>{ }</div>
                                </Grid>
                                <Grid item xs={12} md={Math.floor(12 / (item.length * 2 - 1))}>
                                    <img width={matches ? '60%' : '50%'} height="auto" className={classes.evolveImg} src={item[key].image} alt={item[key].name} />
                                    <div className={classes.imgSub}>{convertHyPhenStringToNormalString(item[key].name)}</div>
                                </Grid>
                            </Fragment>
                        }
                        first = false;
                        return evol;
                    } else {
                        return null;
                    }
                })}
            </Grid>
        })}
    </Fragment>
} 