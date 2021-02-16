import { Button, Chip, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Loading } from '../../components/Loading';
import { getOrder } from '../../utils/function';
const regions = [
    {
        name: "kanto",
        img: "/assets/regions/kanto.jpg",
        map: "/assets/regions/map/kanto_map.jpg",
        content: "Kanto is the first region in the Pokémonuniverse and in the popular series, games and anime. it was then followed by Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, and Galar. ...Kanto lies to the east of Johto; they presumably make up a small continent. To the south of Kanto are the Sevii and Orange Islands."
    },
    {
        name: "johto",
        img: "/assets/regions/johto.jpg",
        map: "/assets/regions/map/johto_map.jpg",
        content: "The Johto region (Japanese: ジョウト地方 Johto-chihō) is a region of thePokémon world. It is located west of Kanto, and as revealed by the radio show Sinnoh Sound, is located south of Sinnoh. It is the setting of PokémonGold, Silver, Crystal, HeartGold, and SoulSilver."
    },
    {
        name: "kalos",
        img: "/assets/regions/kalos.jpg",
        map: "/assets/regions/map/kalos_map.png",
        content: "Kalos (Japanese: カロス地方Kalos-chihō) is a region of thePokémon world. It is the setting ofPokémon X and Y. It was the sixth main series region to be introduced."
    },
    {
        name: "hoenn",
        img: "/assets/regions/hoenn.png",
        map: "/assets/regions/map/hoenn_map.png",
        content: "The Hoenn region (Japanese: ホウエン地方Hoenn-chihō) is a region of the Pokémonworld. It is located south of Sinnoh. It is the setting of Pokémon Ruby, Sapphire, Emerald, Omega Ruby, and Alpha Sapphire. It was the third main series region to be introduced."
    },
    {
        name: "sinnoh",
        img: "/assets/regions/sinnoh.png",
        map: "/assets/regions/map/sinnoh_map.png",
        content: "The Sinnoh region (Japanese: シンオウ地方 Sinnoh-chihō) is a region of thePokémon world. It is located north of Kanto, Johto, and Hoenn. It is the setting of Pokémon Diamond, Pearl, and Platinum."
    },
    {
        name: "unova",
        img: "/assets/regions/unova.png",
        map: "/assets/regions/map/unova_map.png",
        content: "The Unova region (Japanese: イッシュ地方 Isshu-chihō) is a regionof the Pokémon world. It is the setting of Pokémon Black and White andPokémon Black 2 and White 2. It was the fifth main series region to be introduced."
    }, {
        name: "alola",
        img: "/assets/regions/alola.jpg",
        map: "/assets/regions/map/alola_map.jpg",
        content: "Kanto is the first region in the Pokémonuniverse and in the popular series, games and anime. it was then followed by Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, and Galar. ...Kanto lies to the east of Johto; they presumably make up a small continent. To the south of Kanto are the Sevii and Orange Islands."
    }, {
        name: "galar",
        img: "/assets/regions/galar.jpg",
        map: "/assets/regions/map/galar_map.jpg",
        content: "Kanto is the first region in the Pokémonuniverse and in the popular series, games and anime. it was then followed by Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, and Galar. ...Kanto lies to the east of Johto; they presumably make up a small continent. To the south of Kanto are the Sevii and Orange Islands"
    },
    {
        name: "unkown",
        img: "/assets/regions/kanto.jpg",
        map: "/assets/regions/map/kanto_map.jpg",
        content: "Kanto is the first region in the Pokémonuniverse and in the popular series, games and anime. it was then followed by Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, and Galar. ...Kanto lies to the east of Johto; they presumably make up a small continent. To the south of Kanto are the Sevii and Orange Islands"
    }
]

const useStyles = makeStyles((theme) => ({
    banner: {
        display: 'block',
        margin: '0 auto',
        borderRadius: '10px'
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
        // display: 'flex',
        // justifyContent: 'center',
        // flexWrap: 'wrap',
        // listStyle: 'none',
        // padding: theme.spacing(0.5),
        // margin: 0,
    }
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
        let region = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
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
                                    <th className={classes.th}>Related Pokedex</th>
                                    <td className={`${classes.td} ${classes.chipWrapper}`}>
                                        {region.pokedexes && region.pokedexes.map((pokedex, index) => {
                                            return <Chip onClick={e => setPokedexHandler(pokedex.name)} variant={selectedPokedex.name === pokedex.name ? "default" : "outlined"} clickable className={classes.btn} size="small" color="primary" key={index} label={pokedex.name} />
                                        })}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
        <Typography variant="h6"># List Pokemons - (Pokedex: {selectedPokedex.name})</Typography>
        <Grid container>
            {selectedPokedex.listPoke && selectedPokedex.listPoke.map((poke, index) => {
                return <Grid item xs={4} md={2} key={index}>
                    <img className={classes.banner} src={poke.img} />
                    <p style={{ 'textAlign': 'center' }}>{poke.name}</p>
                </Grid>
            })}
        </Grid>
    </Container>
}