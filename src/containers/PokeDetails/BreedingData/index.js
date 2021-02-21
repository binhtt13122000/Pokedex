import { Container, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Fragment } from 'react';
import { calculateCurrentOfFemale, calculateCurrentOfMale, convertHyPhenStringToNormalString } from '../../../utils/function';
import { useStyles } from '../style';

export const BreedingData = ({pokeDetails}) => {
    const classes = useStyles();
    return <Paper elevation={3} className={classes.pokedexContainer}>
        <Container>
            <Typography className={classes.typography} variant="h6">Breeding</Typography>
            <table className={classes.table}>
                <tbody>
                    <tr>
                        <th className={classes.th}>Egg Groups</th>
                        <td className={classes.td}>{pokeDetails['egg_groups'] && pokeDetails['egg_groups'].map((item, index) => {
                            return <span key={index}>{convertHyPhenStringToNormalString(item.name)}, </span>
                        })}</td>
                    </tr>
                    <tr>
                        <th className={classes.th}>Gender</th>
                        <td className={classes.td}>
                            {
                                pokeDetails['gender_rate'] === -1 ? "No Gender" : (pokeDetails['gender_rate'] === 0 ?
                                    <Fragment>
                                        <span className={classes.male}>
                                            Male: 100%</span>, <span className={classes.female}>Female: 0%
                                    </span>
                                    </Fragment> :
                                    <Fragment>
                                        <span className={classes.male}>
                                            Male: {pokeDetails['gender_rate'] && calculateCurrentOfMale(pokeDetails['gender_rate'])}%</span>, <span className={classes.female}>Female: {pokeDetails['gender_rate'] && calculateCurrentOfFemale(pokeDetails['gender_rate'])}%
                                    </span>
                                    </Fragment>
                                )
                            }
                        </td>
                    </tr>
                    <tr>
                        <th className={classes.th}>Egg Circle</th>
                        <td className={classes.td}>{pokeDetails['hatch_counter']}</td>
                    </tr>
                </tbody>
            </table>
        </Container>
    </Paper>
}