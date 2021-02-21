import React from 'react';
import { calculatePokemonHightestStat, calculatePokemonLowestStat } from '../../../utils/function';
import { BorderLinearProgress, useStyles } from '../style';

export const BaseStatChart = ({pokemon}) => {
    const classes = useStyles();
    return <table className={classes.table}>
        <tbody>
            {pokemon.stats && pokemon.stats.map((stat, index) => {
                return <tr key={index}>
                    <th className={classes.th}>{stat.stat.name.toUpperCase()}</th>
                    <td className={classes.tdValue}>{stat['base_stat']}</td>
                    <td className={classes.tdProgess}>
                        <BorderLinearProgress variant="determinate" value={stat['base_stat'] / 360 * 100} />
                    </td>
                    <td className={classes.tdValue}>{calculatePokemonLowestStat(stat['base_stat'])}</td>
                    <td className={classes.tdValue}>{calculatePokemonHightestStat(stat['base_stat'])}</td>
                </tr>
            })}
        </tbody>
    </table>
}