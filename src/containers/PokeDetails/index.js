import { Container, Grid, Typography, useMediaQuery } from '@material-ui/core';
import Axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Loading } from '../../components/Loading';
import { getListEvolution, getOrder, getOfficialArt, convertHyPhenStringToNormalString } from '../../utils/function';
import { useHistory, useLocation } from 'react-router';
import { useStyles } from './style';
import { pictureNames } from './data';
import { POKE_ROOT_API } from '../../constants/poke';
import { PokemonImageSelector } from './PokemonImageSelector';
import { PokedexData } from './PokedexData';
import { TrainingData } from './TrainingData';
import { BreedingData } from './BreedingData';
import { BaseStatChart } from './BaseStatChart';
import { EvolutionChart } from './EvolutionChart';

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
            if (isNeedLoading) {
                setLoading(true);
            }
            const speciesResponse = await Axios.get(`${POKE_ROOT_API}/pokemon-species/${name}`);
            if (speciesResponse.status === 200) {
                if (mounted.current) {
                    let pokeUrl = "";
                    setPokeDetails(speciesResponse.data);
                    const forms = speciesResponse.data.varieties.map((variety, index) => {
                        if (variety['is_default']) {
                            pokeUrl = variety.pokemon.url;
                        }
                        return { img: getOfficialArt(getOrder(variety.pokemon.url)), isDefault: variety['is_default'], name: variety.pokemon.name, id: index }
                    })
                    forms.sort((a, b) => {
                        return a.id - b.id;
                    })
                    if (mounted.current) {
                        setForms(forms)
                    }
                    const pokeResponse = await Axios.get(`${pokeUrl}`);
                    if (pokeResponse.status === 200) {
                        if (mounted.current) {
                            setPokemon(pokeResponse.data);
                        }
                    }
                }
                const evolutionChain = await Axios.get(speciesResponse.data['evolution_chain'].url);
                if (evolutionChain.status === 200) {
                    const evolveArr = getListEvolution(evolutionChain.data.chain);
                    if (mounted.current) {
                        setEvolutionChain(evolveArr);
                    }
                }
            }
        } catch (ex) {
            try {
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
                history.push('/not_found')
            }
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
        <Typography variant="h4" className={classes.caption}>{pokemon.name && convertHyPhenStringToNormalString(pokemon.name).toUpperCase()} #{pokemon.id}</Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
                <PokemonImageSelector
                    pokemon={pokemon}
                    forms={forms}
                    selectImg={setAthotherVersion}
                    selectedImg={selectedImg}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <PokedexData pokemon={pokemon} pokeDetails={pokeDetails} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={12}>
                        <TrainingData pokemon={pokemon} pokeDetails={pokeDetails} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={12}>
                        <BreedingData pokeDetails={pokeDetails} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid container className={classes.baseStatCaption}>
            <Grid item xs={12} sm={6}>
                <Typography className={classes.typography} variant="h6">Base Stats</Typography>
                <BaseStatChart pokemon={pokemon} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography className={classes.typography} variant="h6">Pixel Images</Typography>
                <div className={classes.listImg}>
                    {pokemon.sprites && pictureNames.map((item, index) => {
                        if (pokemon.sprites && pokemon.sprites[item] !== null) {
                            return <img key={index} src={pokemon.sprites && pokemon.sprites[item]} alt={pokemon.name} />
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
        <EvolutionChart evolutionChains={evolutionChains} matches={matches} />
    </Container>
}