import { Container, Grid, Paper, Typography, useMediaQuery } from '@material-ui/core';
import Axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { TypeChip } from '../../components/TypeChip'
import { Loading } from '../../components/Loading';
import { calculatePokemonHightestStat, padLeadingZeros, calculatePokemonLowestStat, getListEvolution, getOrder, calculateCurrentOfMale, calculateCurrentOfFemale, getOfficialArt } from '../../utils/function';
import { Fragment } from 'react';
import Arrow from '../../assets/arrow.png'
import { useHistory, useLocation } from 'react-router';
import NotFound from '../../assets/notfound.jpg';
import { BorderLinearProgress, useStyles } from './style';
import { pictureNames } from './data';
import { POKE_ROOT_API } from '../../constants/poke';
import { PokemonImageSelector } from './PokemonImageSelector';
import { PokedexData } from './PokedexData';
import { TrainingData } from './TrainingData';
import { BreedingData } from './BreedingData';

export const PokeDetails = () => {
    //variable
    const classes = useStyles();
    const location = useLocation();
    const matches = useMediaQuery('(min-width:600px)');
    const history = useHistory();
    const mounted = useRef(true);
    //state
    const [pokemon, setPokemon] = useState({});
    const [pokeDetails, setPokeDetails] = useState({});
    const [forms, setForms] = useState([]);
    const [evolutionChains, setEvolutionChain] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);
    const [loading, setLoading] = useState(false);

    //function
    const getPokemon = async (name, isNeedLoading) => {
        try {
            if(isNeedLoading){
                setLoading(true);
            }
            const response = await Axios.get(`${POKE_ROOT_API}/pokemon/${name}`);
            if (response.status === 200) {
                if (mounted.current) {
                    setPokemon(response.data);
                }
                const responseDetail = await Axios.get(response.data.species.url);
                if (responseDetail.status === 200) {
                    if (mounted.current) {
                        setPokeDetails(responseDetail.data);
                        const forms = responseDetail.data.varieties.map((variety, index) => {
                            return { img: getOfficialArt(getOrder(variety.pokemon.url)), isDefault: variety['is_default'], name: variety.pokemon.name, id: index }
                        })
                        forms.sort((a, b) => {
                            return a.id - b.id;
                        })
                        if (mounted.current) {
                            setForms(forms)
                        }
                    }
                    const evolutionChain = await Axios.get(responseDetail.data['evolution_chain'].url);
                    if (evolutionChain.status === 200) {
                        const evolveArr = getListEvolution(evolutionChain.data.chain);
                        if (mounted.current) {
                            setEvolutionChain(evolveArr);
                        }
                    }
                }
            }
        } catch (ex) {
            console.log(ex)
            history.push('/not_found')
        } finally {
            if (mounted.current) {
                setLoading(false)
            }
        }
    }

    const setAthotherVersion = (e, form) => {
        setSelectedImg({ image: form.img, name: form.name })
        getPokemon(form.name, false);
    }

    //useEffect
    useEffect(() => {
        mounted.current = true;
        let name = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
        getPokemon(name, true);
        return () => {
            mounted.current = false;
        }
    }, [])


    //render
    if (loading) {
        return <div>
            <Loading />
        </div>
    }
    return <Container>
        <Typography variant="h4" className={classes.caption}>{pokemon.name && pokemon.name.toUpperCase()} #{pokemon.id}</Typography>
        <Grid container>
            <Grid item xs={12} sm={4}>
                <PokemonImageSelector 
                    pokemon={pokemon}
                    forms={forms}
                    selectImg={setAthotherVersion}
                    selectedImg={selectedImg}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <PokedexData pokemon={pokemon} pokeDetails={pokeDetails}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TrainingData pokemon={pokemon} pokeDetails={pokeDetails} />
                <div className={classes.marginTop}></div>
                <BreedingData pokeDetails={pokeDetails} />
            </Grid>
        </Grid>
        <Grid container className={classes.baseStatCaption}>
            <Grid item xs={12} sm={6}>
                <Typography className={classes.typography} variant="h6">Base Stats</Typography>
                <table className={classes.table}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography className={classes.typography} variant="h6">Pixel Images</Typography>
                <div className={classes.listImg}>
                    {pokemon.sprites && pictureNames.map((item, index) => {
                        if(pokemon.sprites && pokemon.sprites[item] !== null){
                            return <img className={classes.pixelImg} key={index} src={pokemon.sprites && pokemon.sprites[item]} alt={pokemon.name} />
                        } else {
                            return null;
                        }
                    })}
                </div>
                <Typography className={classes.typography} variant="h6">Other Language</Typography>
                <table className={classes.table}>
                    <tbody>
                        {pokeDetails.names && pokeDetails.names.slice(0, 2).map((name, index) => {
                            return <tr key={index}>
                                <th className={classes.th}>{name.language.name}</th>
                                <td className={classes.td}>{name.name}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </Grid>
        </Grid>
        <Typography className={`${classes.typography} ${classes.baseStatCaption}`} variant="h6">Evolution Chart</Typography>
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
                                    <div className={classes.imgSub}>{item[key].name}</div>
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
    </Container>
}