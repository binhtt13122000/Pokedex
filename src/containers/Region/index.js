import { Chip, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { regions } from '../../assets/data';
import { Loading } from '../../components/Loading';
import { getOrder } from '../../utils/function';
import './style.css';
const useStyles = makeStyles((theme) => ({
    banner: {
        display: 'block',
        margin: '0 auto',
        borderRadius: '10px',
    },
    pokeBox: {
        cursor: 'pointer'
    },
    paper: {
        paddingTop: '15px',
        minHeight: 425.25,
        maxWidth: 345,
        paddingBottom: '10px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '20px',
            minHeight: 100
        },
        margin: '0 auto'
    },
    paperMap: {
        paddingTop: '15px',
        minHeight: 425.25,
        maxWidth: 345,
        paddingBottom: '10px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '20px',
            minHeight: 100
        },
        // margin: '0 auto'
    },
    table: {
        width: '100%'
    },
    th: {
        paddingTop: '5px',
        paddingBottom: '5px',
        width: '30%',
        color: '#737373',
        fontSize: '.875rem',
        fontWeight: 'normal',
        textAlign: 'right',
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        paddingRight: '10px'
    },
    td: {
        paddingTop: '2px',
        width: '70%',
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        paddingLeft: '10px'
    },
    thChildren: {
        paddingTop: '2px',
        width: '30%',
        color: '#3273dc',
        fontSize: '.875rem',
        fontWeight: 'normal',
        textAlign: 'right',
        borderWidth: '1px 0 0 0',
        borderColor: '#f0f0f0',
        paddingRight: '10px'
    },
    tdChildren: {
        color: '#FF6BCE',
        paddingTop: '5px',
        paddingBottom: '5px',
        width: '70%',
        borderWidth: '1px 0 0 0',
        borderColor: '#f0f0f0',
        paddingLeft: '10px'
    },
    blue: {
        color: theme.palette.primary.main,
    },
    btn: {
        margin: '2px'
    },
    center: {
        margin: '0 auto'
    },
    chipWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}))
export const Region = () => {
    const [loading, setLoading] = useState(false);
    const [region, setRegion] = useState({});
    const [regionImg, setRegionImg] = useState({});
    const [selectedPokedex, setSelectedPokedex] = useState({
        name: "",
        listPoke: []
    });
    const mounted = useRef(true);
    const location = useLocation();
    const history = useHistory();
    const getRegion = async (region) => {
        try {
            setLoading(true);
            const response = await Axios.get("https://pokeapi.co/api/v2/region/" + region);
            if (response.status === 200) {
                if (mounted.current) {
                    setRegion(response.data);
                    setRegionImg(regions.find(region => region.name === response.data.name || region.name === 'unknown'))
                    let name = response.data.pokedexes[0].name;
                    selectedPokedex.name = name;
                    setSelectedPokedex({ ...selectedPokedex });
                }
                const pokedexResponse = await Axios.get(response.data.pokedexes[0].url);
                if (pokedexResponse.status === 200) {
                    const pokes = pokedexResponse.data['pokemon_entries'].map((entry) => {
                        return {
                            name: entry['pokemon_species'].name,
                            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getOrder(entry['pokemon_species'].url)}.png`
                        }
                    });
                    setSelectedPokedex({ ...selectedPokedex, listPoke: pokes });
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

    useEffect(() => {
        console.log("a")
        const region = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
        mounted.current = true;
        getRegion(region);
        return () => { mounted.current = false }
    }, [])


    const setPokedexHandler = async (name) => {
        try {
            const pokedexResponse = await Axios.get("https://pokeapi.co/api/v2/pokedex/" + name);
            if (pokedexResponse.status === 200) {
                const pokes = pokedexResponse.data['pokemon_entries'].map((entry) => {
                    return {
                        name: entry['pokemon_species'].name,
                        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getOrder(entry['pokemon_species'].url)}.png`
                    }
                });
                const pokedex = {
                    name: name,
                    listPoke: pokes
                }
                console.log(pokedex);
                setSelectedPokedex(pokedex);
            }
        } catch (ex) {
            console.log(ex);
        }
    }
    const classes = useStyles();
    if (loading) {
        return <Loading />
    }
    return <Container>
        <Grid container spacing={2} className={classes.center}>
            <Grid item xs={12} md={3}>
                <img width="100%" height="auto" className={classes.banner} src={window.location.origin + regionImg.img} alt={regionImg.name} />
            </Grid>
            <Grid item xs={12} md={4}>
                {/* <Typography variant="h6" color="initial">Map</Typography>
                <img width="60%" height="auto" className={classes.banner} src={window.location.origin + regionImg.map} alt={regionImg.name} /> */}
                <Paper elevation={3} className={classes.paper}>
                    <Container>
                        <Typography variant="h5"># {region.name && region.name.toUpperCase()}</Typography>
                        <table className={classes.table}>
                            <tbody>
                                <tr>
                                    <th className={classes.th}>No</th>
                                    <td className={classes.td}><strong>#{region.id}</strong></td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Main Generation</th>
                                    <td className={classes.td}>{region['main_generation'] && region['main_generation'].name}</td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Another Name</th>
                                    <td className={classes.td}>
                                        <table className={classes.table}>
                                            <tbody>
                                                {region.names && region.names.map((name, index) => {
                                                    return <tr key={index}>
                                                        <th className={classes.thChildren}>{name.language.name}</th>
                                                        <td className={classes.tdChildren}>{name.name}</td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Pokedex</th>
                                </tr>
                            </tbody>
                        </table>
                        <ul className={classes.chipWrapper}>
                            {region.pokedexes && region.pokedexes.map((pokedex, index) => {
                                return <li key={index}><Chip className={classes.chip} onClick={e => setPokedexHandler(pokedex.name)} variant={selectedPokedex.name === pokedex.name ? "default" : "outlined"} clickable className={classes.btn} size="small" color="primary" label={pokedex.name} /></li>
                            })}
                        </ul>
                    </Container>
                </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
                <Paper elevation={3} className={classes.paperMap}>
                    <Container>
                        <Typography variant="h6"># Map</Typography>
                        <img width="60%" height="auto" className={classes.banner} src={window.location.origin + regionImg.map} alt={regionImg.map} />
                        <Typography variant="h6"># Some Places</Typography>
                        <table className={classes.table}>
                            <tbody>
                                {region.locations && region.locations.slice(0, 5).map((location, index) => {
                                    return <tr key={index}>
                                        <td className={classes.tdChildren}>{location.name}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </Container>
                </Paper>
            </Grid>
        </Grid>
        <Paper elevation={3}>
            <p className="quote"><span className="caption">{region.name && region.name.toUpperCase()}</span><br />"{regionImg.content}"</p>
        </Paper>
        <Typography variant="h6"># List Pokemons - (Pokedex: {selectedPokedex.name})</Typography>
        <Grid container>
            {selectedPokedex.listPoke && selectedPokedex.listPoke.map((poke, index) => {
                return <Grid item xs={4} md={2} key={index} className={classes.pokeBox} onClick={e => history.push("/pokemon/" + poke.name)}>
                    <img className={classes.banner} src={poke.img} />
                    <p style={{ 'textAlign': 'center' }}>{poke.name}</p>
                </Grid>
            })}
        </Grid>
    </Container>
}