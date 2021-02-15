import { Container, Grid, LinearProgress, makeStyles, Paper, Typography, useMediaQuery, withStyles } from '@material-ui/core';
import Axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { TypeChip } from '../../components/TypeChip'
import { Loading } from '../../components/Loading';
import { calculatePokemonHightestStat, padLeadingZeros, calculatePokemonLowestStat, getListEvolution, getOrder, calculateCurrentOfMale, calculateCurrentOfFemale } from '../../utils/function';
import { Fragment } from 'react';
import Arrow from '../../assets/arrow.png'
import { useHistory, useLocation } from 'react-router';
import NotFound from '../../assets/notfound.jpg';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: theme.palette.primary.main,
    },
}))(LinearProgress);


const pictureNames = [
    'back_default',
    'back_shiny',
    'front_default',
    'front_shiny'
]
const useStyles = makeStyles(theme => ({
    img: {
        width: '80%',
        display: 'block',
        margin: '0 auto'
    },
    caption: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    groupTypeChip: {
        '& > *': {
            marginLeft: '5px'
        }
    },
    pokedexContainer: {
        paddingTop: '15px',
        minHeight: 200,
        maxWidth: 345,
        paddingBottom: '10px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '20px'
        },
        margin: '0 auto'
        // backgroundColor: '#b2ebf2',
        // paddingRight: '20px'
    },
    table: {
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
        paddingTop: '5px',
        paddingBottom: '5px',
        width: '70%',
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        paddingLeft: '10px'
    },
    tdValue: {
        paddingTop: '5px',
        paddingBottom: '5px',
        width: '10%',
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        paddingLeft: '10px',
        textAlign: 'center'
    },
    tdProgess: {
        paddingTop: '5px',
        paddingBottom: '5px',
        width: '40%',
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        paddingLeft: '10px',
    },
    marginTop: {
        marginTop: '0',
        [theme.breakpoints.up('md')]: {
            marginTop: '20px'
        }
    },
    male: {
        color: '#3273dc'
    },
    female: {
        color: '#FF6BCE'
    },
    baseStatCaption: {
        marginTop: '20px'
    },
    listImg: {
        width: '80%',
        margin: '0 auto'
    },
    evolveImg: {
        display: 'block',
        margin: '0 auto'
    },
    arrowImg: {
        display: 'block',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            transform: 'rotate(90deg)'
        }
    },
    typography: {
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            textAlign: 'left'
        }
    },
    imgSub: {
        textAlign: 'center',
        fontWeight: '500'
    },
    selectImg: {
        cursor: 'pointer',
        border: 'solid',
        borderRadius: '10px',
        color: theme.palette.primary.main,
        margin: '0 auto',
        display: 'block'
    },
    active: {
        color: 'green'
    }
}))
export const PokeDetails = () => {
    const classes = useStyles();
    const location = useLocation();
    const [pokemon, setPokemon] = useState({});
    const [pokeDetails, setPokeDetails] = useState({});
    const [forms, setForms] = useState([]);
    const [evolutionChains, setEvolutionChain] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const matches = useMediaQuery('(min-width:600px)');
    const history = useHistory();
    const mounted = useRef(true);
    const getPokemon = async (name, isNeedLoading) => {
        try {
            if(isNeedLoading){
                setLoading(true);
            }
            const response = await Axios.get('https://pokeapi.co/api/v2/pokemon/' + name);
            if (response.status === 200) {
                if (mounted.current) {
                    setPokemon(response.data);
                }
                const responseDetail = await Axios.get(response.data.species.url);
                if (responseDetail.status === 200) {
                    if (mounted.current) {
                        setPokeDetails(responseDetail.data);
                        const forms = responseDetail.data.varieties.map((variety, index) => {
                            return { img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getOrder(variety.pokemon.url)}.png`, isDefault: variety['is_default'], name: variety.pokemon.name, id: index }
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

    const setAthotherVersion = form => {
        setSelectedImg({ image: form.img, name: form.name })
        getPokemon(form.name, false);
    }

    useEffect(() => {
        mounted.current = true;
        let name = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
        getPokemon(name, true);
        return () => {
            mounted.current = false;
        }
    }, [])


    if (loading) {
        return <div>
            <Loading />
        </div>
    }

    return <Container>
        <Typography variant="h4" className={classes.caption}>{pokemon.name && pokemon.name.toUpperCase()} #{pokemon.id}</Typography>
        <Grid container>
            <Grid item xs={12} sm={4}>
                {selectedImg === null ? pokemon.sprites && <img className={classes.img} src={pokemon.sprites.other['official-artwork']['front_default']} alt={pokemon.name} /> :
                    <img onError={(e) => { e.target.onerror = null; e.target.src = NotFound }} className={classes.img} src={selectedImg.image} alt={pokemon.name} />
                }
                {selectedImg === null ? <Typography className={classes.caption} variant="body1">{pokemon.name}</Typography> : <Typography className={classes.caption} variant="body1">{selectedImg.name}</Typography>}
                <Grid container>
                    {forms && forms.map((form, index) => {
                        let gridTotal = Math.floor(12 / forms.length);
                        if (forms.length > 4) {
                            gridTotal = 3
                        }
                        return <Grid item key={index} xs={gridTotal} style={{ 'marginBottom': '5px' }}><img onError={(e) => { e.target.src = NotFound }} onClick={e => setAthotherVersion(form)} width={forms.length > 2 ? "80%" : (forms.length === 2 ? "40%" : "30%")} className={classes.selectImg} src={form.img} alt={pokemon.name} /></Grid>
                    })}
                </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Paper elevation={3} className={classes.pokedexContainer}>
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
                                    <td className={classes.td}>{pokeDetails.habitat && pokeDetails.habitat.name}</td>
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
                                            return <div key={index}>{index + 1}. {ability.ability.name}{ability['is_hidden'] ? '(Hidden)' : ''}</div>
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Generation</th>
                                    <td className={classes.td}>{pokeDetails.generation && pokeDetails.generation.name}</td>
                                </tr>
                                <tr>
                                    <th className={classes.th}>Pokedex No.</th>
                                    <td className={classes.td}>
                                        {pokeDetails['pokedex_numbers'] && pokeDetails['pokedex_numbers'].map((item, index) => {
                                            return <div key={index}><strong>{padLeadingZeros(item['entry_number'], 4)}</strong>. {item.pokedex.name} </div>
                                        })}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Container>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Paper elevation={3} className={classes.pokedexContainer}>
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
                                    <td className={classes.td}>{pokeDetails['growth_rate'] && pokeDetails['growth_rate'].name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Container>
                </Paper>
                <div className={classes.marginTop}></div>
                <Paper elevation={3} className={classes.pokedexContainer}>
                    <Container>
                        <Typography className={classes.typography} variant="h6">Breeding</Typography>
                        <table className={classes.table}>
                            <tbody>
                                <tr>
                                    <th className={classes.th}>Egg Groups</th>
                                    <td className={classes.td}>{pokeDetails['egg_groups'] && pokeDetails['egg_groups'].map((item, index) => {
                                        return <span key={index}>{item.name}, </span>
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