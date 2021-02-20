import { Container, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, Grid, ListItem, ListItemText, makeStyles, Paper, Slide, TextField, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import Axios from 'axios';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Loading } from '../../components/Loading';
import { TypeChip } from '../../components/TypeChip';
import { getOrder } from '../../utils/function';
import NotFound from '../../assets/notfound.jpg';
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Fragment } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '10px',
        margin: '0 auto',
        minHeight: 0,
        width: '100%',
        borderRadius: '10px',
        [theme.breakpoints.up('md')]: {
            width: '80%',
            minHeight: '250px',
        }
    },
    effectContainer: {
        marginTop: '20px'
    },
    img: {
        display: 'block',
        margin: '0 auto',
        cursor: 'pointer',
    },
    pointer: {
        cursor: 'pointer'
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
        paddingTop: '5px',
        paddingBottom: '5px',
        width: '70%',
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        paddingLeft: '10px'
    },
}))

export const TypeDetails = () => {
    const [type, setType] = useState({});
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState({
        type: "",
        poke: ""
    });
    const [moveDetail, setMoveDetail] = useState({});
    const [display, setDisplay] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const mounted = useRef(true);
    const location = useLocation();
    const history = useHistory();
    const theme = useTheme();
    const classes = useStyles();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    useEffect(() => {
        mounted.current = true;
        const getType = async () => {
            let typeName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
            try {
                if (mounted.current) {
                    setLoading(true);
                }
                const response = await Axios.get("https://pokeapi.co/api/v2/type/" + typeName);
                if (response.status === 200) {
                    if (mounted.current) {
                        setType(response.data);
                    }
                }
            } catch (ex) {
                history.push("/not_found");
            } finally {
                if (mounted.current) {
                    setLoading(false);
                }
            }
        }
        getType();
        return () => mounted.current = false;
    }, []);

    const listPoke = (search) => {
        return type.pokemon && type.pokemon.filter(poke => {
            return poke.pokemon.name.includes(search)
        }).map((poke, index) => {
            return <Grid item key={index} xs={6} md={3}>
                <img className={classes.img} width="80%" height="auto" onError={(e) => { e.target.onerror = null; e.target.src = NotFound }} onClick={e => history.push("/pokemon/" + poke.pokemon.name)} alt={poke.pokemon.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getOrder(poke.pokemon.url)}.png`} />
                <p style={{ 'textAlign': 'center' }}>{poke.pokemon.name}</p>
            </Grid>
        })
    }

    const listMove = (search) => {
        return type.moves && type.moves.filter(move => {
            return move.name.includes(search)
        }).map((move, index) => {
            return <ListItem key={index} button onClick={e => history.push("/move/" + move.name)}>
                <ListItemText>
                    {move.name}
                </ListItemText>
            </ListItem>
        })
    }

    if (loading) {
        return <Loading />
    }

    return <Container>
        <Container>
            <Typography variant="h4" style={{ 'color': type.name && theme.palette.types[type.name].backgroundColor }} align="center"># {type.name && type.name.charAt(0).toUpperCase() + type.name.slice(1)}</Typography>
        </Container>
        <Grid container className={classes.effectContainer} spacing={3}>
            <Grid item xs={12} md={6}>
                <Paper className={classes.paper} elevation={3}>
                    <Typography variant="h6" align="center">Advantage</Typography>
                    <Typography variant="overline">Double Damage To:</Typography>
                    <Grid container spacing={1}>
                        {type['damage_relations'] && type['damage_relations']['double_damage_to'].map((item, index) => {
                            return <Grid item key={index}><TypeChip type={item.name} /></Grid>
                        })}
                    </Grid>
                    <Typography variant="overline">Half Damage From:</Typography>
                    <Grid container spacing={1}>
                        {type['damage_relations'] && type['damage_relations']['half_damage_from'].map((item, index) => {
                            return <Grid item key={index}><TypeChip type={item.name} /></Grid>
                        })}
                    </Grid>
                    <Typography variant="overline">No Damage From:</Typography>
                    <Grid container spacing={1}>
                        {type['damage_relations'] && type['damage_relations']['no_damage_from'].map((item, index) => {
                            return <Grid item key={index}><TypeChip type={item.name} /></Grid>
                        })}
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper className={classes.paper} elevation={3}>
                    <Typography variant="h6" align="center">Disavantage</Typography>
                    <Typography variant="overline">Haft Damage To:</Typography>
                    <Grid container spacing={1}>
                        {type['damage_relations'] && type['damage_relations']['half_damage_to'].map((item, index) => {
                            return <Grid item key={index}><TypeChip type={item.name} /></Grid>
                        })}
                    </Grid>
                    <Typography variant="overline">No Damage To:</Typography>
                    <Grid container spacing={1}>
                        {type['damage_relations'] && type['damage_relations']['no_damage_to'].map((item, index) => {
                            return <Grid item key={index}><TypeChip type={item.name} /></Grid>
                        })}
                    </Grid>
                    <Typography variant="overline">Double Damage From:</Typography>
                    <Grid container spacing={1}>
                        {type['damage_relations'] && type['damage_relations']['double_damage_from'].map((item, index) => {
                            return <Grid item key={index}><TypeChip type={item.name} /></Grid>
                        })}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        {isDesktop ? <Divider className={classes.effectContainer} /> : null}
        <Grid container spacing={3} >
            <Grid item xs={12} md={3} >
                <Container className={classes.paper}>
                    <Grid container onClick={e => setDisplay(!display)} direction="row" alignItems="flex-end" justify="center" className={classes.pointer}>
                        <Grid item xs={4}>
                            <Typography variant="h6">Moves </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            {isDesktop ? null : <ExpandMore fontSize="small" />}
                        </Grid>
                    </Grid>
                    {!isDesktop && !display ? null : <Fragment>
                        <TextField
                            style={{ 'marginTop': '10px' }}
                            color="primary"
                            variant="outlined"
                            size="small"
                            label="Find Move"
                            value={search.type}
                            onChange={e => setSearch({ ...search, type: e.target.value })}
                        />
                        {listMove(search.type)}
                    </Fragment>}
                </Container>
            </Grid>
            {isDesktop ? <Divider orientation="vertical" flexItem /> : null}
            <Grid item xs={12} md={8}>
                <Container className={classes.paper}>
                    <Typography variant="h6">Pokemons</Typography>
                    <TextField
                        style={{ 'marginTop': '10px' }}
                        color="primary"
                        variant="outlined"
                        size="small"
                        label="Find Pokemon"
                        value={search.poke}
                        onChange={e => setSearch({ ...search, poke: e.target.value })}
                    />
                    <Grid container spacing={1}>
                        {listPoke(search.poke)}
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    </Container>
}