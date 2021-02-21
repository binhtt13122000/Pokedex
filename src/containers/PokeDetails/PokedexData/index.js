import { Container, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { TypeChip } from '../../../components/TypeChip';
import { convertHyPhenStringToNormalString, padLeadingZeros } from '../../../utils/function';
import { useStyles } from '../style';

export const PokedexData = ({pokemon, pokeDetails}) => {
    const classes = useStyles();

    return <Paper elevation={3} className={classes.pokedexContainer}>
        <Container>
            <Typography className={classes.typography} variant="h6">Pokedex Data</Typography>
            <table className={classes.table}>
                <tbody>
                    <tr>
                        <th className={classes.th}>No</th>
                        <td className={classes.td}><strong>#{pokemon.id}</strong></td>
                    </tr>
                    <tr>
                        <th className={classes.th}>Type</th>
                        <td className={classes.td}>
                            <span className={classes.groupTypeChip}>
                                {pokemon.types && pokemon.types.map((type, index) => {
                                    return <TypeChip key={index} type={type.type.name} />
                                })}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th className={classes.th}>Habitat</th>
                        <td className={classes.td}>{pokeDetails.habitat && convertHyPhenStringToNormalString(pokeDetails.habitat.name)}</td>
                    </tr>
                    <tr>
                        <th className={classes.th}>Height</th>
                        <td className={classes.td}>{pokemon.height && parseFloat(parseFloat(pokemon.height) / 10)} m (2'00")</td>
                    </tr>
                    <tr>
                        <th className={classes.th}>Weight</th>
                        <td className={classes.td}>{pokemon.weight && parseFloat(parseFloat(pokemon.weight) / 10)} kg (18.7lbs)</td>
                    </tr>
                    <tr>
                        <th className={classes.th}>Abilities</th>
                        <td className={classes.td}>
                            {pokemon.abilities && pokemon.abilities.map((ability, index) => {
                                return <div key={index}>{index + 1}. {convertHyPhenStringToNormalString(ability.ability.name)}{ability['is_hidden'] ? '(Hidden)' : ''}</div>
                            })}
                        </td>
                    </tr>
                    <tr>
                        <th className={classes.th}>Generation</th>
                        <td className={classes.td}>{pokeDetails.generation && convertHyPhenStringToNormalString(pokeDetails.generation.name)}</td>
                    </tr>
                    <tr>
                        <th className={classes.th}>Pokedex No.</th>
                        <td className={classes.td}>
                            {pokeDetails['pokedex_numbers'] && pokeDetails['pokedex_numbers'].map((item, index) => {
                                return <div key={index}><strong>{padLeadingZeros(item['entry_number'], 4)}</strong>. {convertHyPhenStringToNormalString(item.pokedex.name)} </div>
                            })}
                        </td>
                    </tr>
                </tbody>
            </table>
        </Container>
    </Paper>
}