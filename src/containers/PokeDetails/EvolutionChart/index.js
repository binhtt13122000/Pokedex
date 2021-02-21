import { Grid } from '@material-ui/core';
import React from 'react';
import { Fragment } from 'react';
import { useStyles } from '../style';
import Arrow from '../../../assets/arrow.png';
import { Image } from '../../../components/Image';
import { convertHyPhenStringToNormalString } from '../../../utils/function';


export const EvolutionChart = ({ evolutionChains, matches, }) => {
    const classes = useStyles();
    return <Fragment>
        {evolutionChains && evolutionChains.map((item, index) => {
            const keys = Object.keys(item);
            let first = true;
            let onlyOne = true;
            return <Grid container alignItems="center" justify="center" key={index}>
                {keys.map((key, i) => {
                    if (item['second'] == null && item['third'] == null) {
                        if (onlyOne) {
                            onlyOne = false;
                            return <Grid item xs={6} md={3}>
                                <Image width={matches ? '60%' : '50%'} height="auto" className={classes.evolveImg} src={item['start'].image} alt={item['start'].name} />
                                <div className={classes.imgSub}>{item['start'].name}</div>
                            </Grid>
                        } else {
                            return null;
                        }
                    } else if (item[key] !== null && key !== 'length') {
                        let evol = null;
                        if (first) {
                            evol = <Grid key={i} item xs={12} md={Math.floor(12 / (item.length * 2 - 1))}>
                                <Image width={matches ? '60%' : '50%'} height="auto" className={classes.evolveImg} src={item[key].image} alt={item[key].name} />
                                <div className={classes.imgSub}>{item[key].name}</div>
                            </Grid>
                        } else {
                            evol = <Fragment key={i}>
                                <Grid item xs={12} md={Math.floor(12 / (item.length * 2 - 1))}>
                                    <Image width={matches ? '60%' : '50%'} height="auto" className={classes.arrowImg} src={Arrow} alt="arrow" />
                                    <div className={classes.imgSub}>{ }</div>
                                </Grid>
                                <Grid item xs={12} md={Math.floor(12 / (item.length * 2 - 1))}>
                                    <Image width={matches ? '60%' : '50%'} height="auto" className={classes.evolveImg} src={item[key].image} alt={item[key].name} />
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