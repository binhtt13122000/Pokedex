import { Container, Grid, Paper, Typography, useTheme } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Loading } from '../../components/Loading';
import { Image } from '../../components/Image';
import { TypeChip } from '../../components/TypeChip';
import { convertHyPhenStringToNormalString, getOrder } from '../../utils/function';
import NotFound from '../../assets/notfound.jpg';
import { useStyles } from './style';
import { POKE_ROOT_API } from '../../constants/poke';

export const MoveDetail = () => {
    //state
    const [move, setMove] = useState({});
    const [loading, setLoading] = useState(false);
    //variable
    const mounted = useRef(true);
    const history = useHistory();
    const location = useLocation();
    const theme = useTheme();
    const classes = useStyles();
    //use effect
    useEffect(() => {
        mounted.current = true;
        const moveName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
        const loadMove = async () => {
            try {
                if (mounted.current) {
                    setLoading(true);
                }
                const response = await Axios.get(`${POKE_ROOT_API}/move/${moveName}`);
                if (response.status === 200) {
                    if (mounted.current) {
                        setMove(response.data)
                    }
                }
            } catch (ex) {
                history.push("/not_found")
            } finally {
                if (mounted.current) {
                    setLoading(false);
                }
            }
        }
        loadMove();
        return () => {
            mounted.current = false;
        }
    }, [])

    //render
    if (loading) {
        return <Loading />
    }

    return <Container>
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Paper className={classes.paper} elevation={3}>
                    <Container>
                        <Typography variant="h5" style={{ 'color': move.type && theme.palette.types[move.type.name].backgroundColor }}># {move.name && convertHyPhenStringToNormalString(move.name)}</Typography>
                        <table className={classes.table}>
                            <tbody>
                                <tr>
                                    <th className={classes.th}>No</th>
                                    <td className={classes.td}><strong>#{move.id}</strong></td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Type</th>
                                    <td className={classes.td}>{move.type && <TypeChip type={move.type.name} />}</td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Accuracy</th>
                                    <td className={classes.td}>{move.accuracy}</td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Power Point</th>
                                    <td className={classes.td}>{move.pp}</td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Damage</th>
                                    <td className={classes.td}>{move.power == null ? "No damage" : move.power}</td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Priority</th>
                                    <td className={classes.td}>{move.priority} (
                                        A value between -8 and 8)
                                    </td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Effect chance</th>
                                    <td className={classes.td}>{move['effect_chance'] === null ? "No effect chance!" : move['effect_chance']}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Container>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} className={classes.paper}>
                    <Container>
                        <Typography variant="h6"># Effect</Typography>
                        <Typography variant="subtitle1">
                            "{move['effect_entries'] && move['effect_entries'].find(item => item.language.name === 'en').effect}"
                        </Typography>
                        <Typography variant="h6"># Target</Typography>
                        <Typography variant="subtitle1">
                            {move.target && convertHyPhenStringToNormalString(move.target.name)}
                        </Typography>
                        <Typography variant="h6"># Type of damage</Typography>
                        <Typography variant="subtitle1">
                            {move['damage_class'] && convertHyPhenStringToNormalString(move['damage_class'].name)}
                        </Typography>
                        <Typography variant="h6"># Generation</Typography>
                        <Typography variant="subtitle1">
                            {move['generation'] && move['generation'].name}
                        </Typography>
                    </Container>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} className={classes.paper}>
                    <Container>
                        <Typography variant="h6"># Meta Data</Typography>
                        <table className={classes.table}>
                            <tbody>
                                <tr>
                                    <th className={classes.th}>Ailment</th>
                                    <td className={classes.td}>{move.meta && move.meta.ailment.name}</td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Category</th>
                                    <td className={classes.td}>{move.meta && move.meta.category.name}</td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Move hits</th>
                                    <td className={classes.td}>
                                        {(move.meta && (move.meta['min_hits'] == null && move.meta['max_hits'] == null)) ? "Once turn" : <Fragment>
                                            Min: {move.meta && (move.meta['min_hits'] == null ? 1 : move.meta['min_hits'])},
                                            Max: {move.meta && (move.meta['max_hits'] == null ? 1 : move.meta['max_hits'])}
                                        </Fragment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Number of influent turn </th>
                                    <td className={classes.td}>
                                        {(move.meta && (move.meta['min_turns'] == null && move.meta['max_turns'] == null)) ? "Once turn" : <Fragment>
                                            Min: {move.meta && (move.meta['min_hits'] == null ? 1 : move.meta['min_turns'])},
                                            Max: {move.meta && (move.meta['max_hits'] == null ? 1 : move.meta['max_turns'])}
                                        </Fragment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Drain</th>
                                    <td className={classes.td}>{move.meta && move.meta.drain}</td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Healing</th>
                                    <td className={classes.td}>{move.meta && move.meta.healing}</td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Crit rate</th>
                                    <td className={classes.td}>{move.meta && move.meta['crit_rate']}</td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Flinch Chance</th>
                                    <td className={classes.td}>{move.meta && move.meta['flinch_chance']}</td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Stat Chance</th>
                                    <td className={classes.td}>{move.meta && move.meta['stat_chance']}</td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Ailment Chance</th>
                                    <td className={classes.td}>{move.meta && move.meta['ailment_chance']}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Container>
                </Paper>
            </Grid>
        </Grid>
        <Container>
            <Typography variant="h6" style={{'marginTop': '20px'}}># Learned by Pokemons</Typography>
            <Grid container spacing={6}>
                {move['learned_by_pokemon'] && move['learned_by_pokemon'].map((poke, index) => {
                    return <Grid item key={index} xs={6} md={2}>
                        <Image onError={(e) => { e.target.onerror = null; e.target.src = NotFound }} className={classes.img} onClick={e => history.push("/pokemon/" + poke.name)} width="80%" height="auto" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getOrder(poke.url)}.png`} alt={poke.name} />
                        <p style={{ 'textAlign': 'center' }}>{convertHyPhenStringToNormalString(poke.name)}</p>
                    </Grid>
                })}
            </Grid>
        </Container>
    </Container>
}