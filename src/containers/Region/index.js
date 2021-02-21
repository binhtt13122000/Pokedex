import { Chip, Container, Grid, Paper, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { regions } from './data';
import { Loading } from '../../components/Loading';
import { POKE_ROOT_API } from '../../constants/poke';
import { convertHyPhenStringToNormalString, getFrontDefaultImage, getOrder } from '../../utils/function';
import { useStyles } from './style';
import { Image } from '../../components/Image'
import './style.css';

export const Region = () => {
    //state
    const [loading, setLoading] = useState(false);
    const [region, setRegion] = useState({});
    const [regionImg, setRegionImg] = useState({});
    const [selectedPokedex, setSelectedPokedex] = useState({
        name: "",
        listPoke: []
    });

    //variable
    const mounted = useRef(true);
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();

    //function
    const getRegion = async (region) => {
        try {
            if(mounted.current){
                setLoading(true);
            }
            const response = await Axios.get(`${POKE_ROOT_API}/region/${region}`);
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
                            img: getFrontDefaultImage(getOrder(entry['pokemon_species'].url))
                        }
                    });
                    if(mounted.current){
                        setSelectedPokedex({ ...selectedPokedex, listPoke: pokes });
                    }
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

    const setPokedexHandler = async (name) => {
        try {
            const pokedexResponse = await Axios.get(`${POKE_ROOT_API}/pokedex/${name}`);
            if (pokedexResponse.status === 200) {
                const pokes = pokedexResponse.data['pokemon_entries'].map((entry) => {
                    return {
                        name: entry['pokemon_species'].name,
                        img: getFrontDefaultImage(getOrder(entry['pokemon_species'].url))
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

    useEffect(() => {
        const region = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
        mounted.current = true;
        getRegion(region);
        return () => { mounted.current = false }
    }, [])


    //render
    if (loading) {
        return <Loading />
    }
    return <Container>
        <Grid container className={classes.center} spacing={3}>
            <Grid item xs={12} md={3}>
                <Image width="100%" height="auto" className={classes.banner} src={regionImg.img} alt={regionImg.name} />
            </Grid>
            <Grid item xs={12} md={5}>
                <Paper elevation={3} className={classes.paper}>
                    <Container>
                        <Typography variant="h5"># {region.name && convertHyPhenStringToNormalString(region.name).toUpperCase()}</Typography>
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
                                return <li key={index}>
                                    <Chip 
                                        className={`${classes.btn} ${classes.chip}`} 
                                        onClick={e => setPokedexHandler(pokedex.name)} 
                                        variant={selectedPokedex.name === pokedex.name ? "default" : "outlined"} 
                                        clickable 
                                        size="small" 
                                        color="primary" 
                                        label={convertHyPhenStringToNormalString(pokedex.name)} 
                                    />
                                </li>
                            })}
                        </ul>
                    </Container>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} className={classes.paperMap}>
                    <Container>
                        <Typography variant="h6"># Map</Typography>
                        <img width="60%" height="auto" className={classes.banner} src={regionImg.map} alt={regionImg.map} />
                        <Typography variant="h6"># Some Places</Typography>
                        <table className={classes.table}>
                            <tbody>
                                {region.locations && region.locations.slice(0, 5).map((location, index) => {
                                    return <tr key={index}>
                                        <td className={classes.tdChildren}>{convertHyPhenStringToNormalString(location.name)}</td>
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
        <Typography variant="h6"># List Pokemons - (Pokedex: {convertHyPhenStringToNormalString(selectedPokedex.name)})</Typography>
        <Grid container>
            {selectedPokedex.listPoke && selectedPokedex.listPoke.map((poke, index) => {
                return <Grid item xs={6} md={2} key={index} className={classes.pokeBox} onClick={e => history.push("/pokemon/" + poke.name)}>
                    <Image className={classes.banner} src={poke.img} />
                    <p style={{ 'textAlign': 'center' }}>{convertHyPhenStringToNormalString(poke.name)}</p>
                </Grid>
            })}
        </Grid>
    </Container>
}