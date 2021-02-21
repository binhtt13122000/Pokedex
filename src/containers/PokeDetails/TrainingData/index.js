import { Container, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { convertHyPhenStringToNormalString } from '../../../utils/function';
import { useStyles } from '../style';

export const TrainingData = ({pokemon, pokeDetails}) => {
    const classes = useStyles();

    return <Paper elevation={3} className={classes.pokedexContainer}>
        <Container>
            <Typography className={classes.typography} variant="h6">Training</Typography>
            <table className={classes.table}>
                <tbody>
                    <tr>
                        <th className={classes.th}>Catch Rate</th>
                        <td className={classes.td}>{pokeDetails['capture_rate']}</td>
                    </tr>
                    <tr>
                        <th className={classes.th}>Base Friend Ship</th>
                        <td className={classes.td}>{pokeDetails['base_happiness']}</td>
                    </tr>
                    <tr>
                        <th className={classes.th}>Base Exp.</th>
                        <td className={classes.td}>{pokemon['base_experience']}</td>
                    </tr>
                    <tr>
                        <th className={classes.th}>Growth Rate</th>
                        <td className={classes.td}>{pokeDetails['growth_rate'] && convertHyPhenStringToNormalString(pokeDetails['growth_rate'].name)}</td>
                    </tr>
                </tbody>
            </table>
        </Container>
    </Paper>
}