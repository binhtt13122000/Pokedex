import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Container, Dialog, DialogContent, DialogTitle, Grid, InputAdornment, makeStyles, Paper, Slide, TextField, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import ExpandMore from "@material-ui/icons/ExpandMore";
import PokeBall from '../../assets/pokeball.svg';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Axios from 'axios';
import { LIMIT_ABILITY } from '../../constants/poke'
import { Loading } from '../../components/Loading';
import { getOrder } from '../../utils/function';
import { CustomPagination } from '../../components/Pagination';
import NotFound from '../../assets/notfound.jpg';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    textFiled: {
        display: 'block',
        margin: '0 auto'
    },
    accordionContainer: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    listPoke: {
        display: 'block',
        width: '80%',
        margin: '0 auto',
        marginTop: '20px',
        minHeight: '530px',
    },
    listPokeContainer: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block'
        }
    },
    img: {
        display: 'block',
        margin: '0 auto',
        cursor: 'pointer',
        marginTop: '10px'
    },
    center: {
        margin: 'auto',
        marginTop: '220px'
    }
}));
export const AbilityPage = (props) => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [abilities, setAbilities] = useState([]);
    const [total, setTotal] = useState(0);
    const [listPoke, setListPoke] = useState([]);
    const [page, setPage] = useState({
        current: 1,
        previous: null,
        next: null
    })
    const [openDialog, setOpenDialog] = useState(false);
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("Select an ability first!");

    const mounted = useRef(true);
    const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));

    const loadAbility = async (pageIndex) => {
        try {
            setLoading(true)
            const response = await Axios.get(`https://pokeapi.co/api/v2/ability?limit=${LIMIT_ABILITY}&offset=${LIMIT_ABILITY * pageIndex}`);
            if (response.status === 200) {
                if (mounted.current) {
                    setTotal(response.data.count);
                    setPage({ ...page, next: response.data.next, previous: response.data.previous, current: pageIndex + 1 })
                }
                const promises = response.data.results.map(async item => {
                    return await Axios.get(item.url);
                })
                const listResponse = await Promise.all(promises);
                const abilities = listResponse.map(res => {
                    const effectEntry = res.data['effect_entries'].find(item => item.language.name === 'en').effect;
                    return {
                        name: res.data.name,
                        pokemon: res.data.pokemon,
                        id: res.data.id,
                        generation: res.data.generation.name,
                        effect: effectEntry
                    }
                })
                if (mounted.current) {
                    setAbilities(abilities);
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
    useEffect(() => {
        let params = new URLSearchParams(location.search);
        let search = params.get("page");
        if (search == null) {
            search = 1;
        }
        let pageIndex = parseInt(search - 1);
        loadAbility(pageIndex);
        mounted.current = true;
        return () => {
            mounted.current = false;
        }
    }, [])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setListPoke(abilities.find(ability => ability.id === panel).pokemon);
    };

    const changePage = (e, value) => {
        history.push("/abilities?page=" + value);
        loadAbility(value - 1)
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    const searchHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.get("https://pokeapi.co/api/v2/ability/" + search);
            if(response.status === 200){
                setListPoke(response.data.pokemon);
            }
        } catch (ex){
            setMessage("Ability is not available");
        }
    }
    const paper = (
        <Paper elevation={isMobile ? 0 : 3} className={classes.listPoke}>
            <Grid container>
                {listPoke.length === 0 ? <Typography className={classes.center} variant="subtitle1">{message}</Typography> : listPoke.map((poke, index) => {
                    if (poke.pokemon) {
                        return <Grid key={index} item md={3} xs={6}>
                            <img width="80%" height="auto" onClick={e => history.push("/pokemon/" + poke.pokemon.name)} onError={(e) => { e.target.onerror = null; e.target.src = NotFound }} className={classes.img} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getOrder(poke.pokemon.url)}.png`} alt={poke.pokemon.name} />
                            <p style={{ 'textAlign': 'center' }}>{poke.pokemon.name}</p>
                        </Grid>
                    }
                    return null;
                })}
            </Grid>
        </Paper>
    );

    if (loading) {
        return <div><Loading /></div>
    }
    return <Container>
        <Grid container>
            <Grid item xs={12} md={10}>
                <Typography variant="h5"># Abilities</Typography>
            </Grid>
            <Grid item xs={12} md={2}>
                <form onSubmit={searchHandler}>
                    <TextField
                        label="Search Ability"
                        name="search"
                        value={search}
                        required
                        onChange={e => setSearch(e.target.value)}
                        variant="outlined"
                        color="primary"
                        fullWidth
                        size="small"
                        className={classes.textFiled}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <img src={PokeBall} alt="pokedex" width="20px" height="20px" />
                                </InputAdornment>
                            )
                        }}
                    />
                </form>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={12} md={6}>
                <CustomPagination total={total} page={page.current} changePage={changePage} />
                <div className={classes.accordionContainer}>
                    {abilities && abilities.map((ability, index) => {
                        return <Accordion key={index} expanded={expanded === ability.id} onChange={handleChange(ability.id)}>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>{ability.name && (ability.name.charAt(0).toUpperCase() + ability.name.slice(1))}</Typography>
                                <Typography className={classes.secondaryHeading}>Generation: {ability.generation}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {ability.effect}
                                </Typography>
                            </AccordionDetails>
                            {isMobile ? <AccordionActions>
                                <Button onClick={e => setOpenDialog(true)} size="small" variant="contained" color="primary">See Pokemon</Button>
                            </AccordionActions> : null}
                        </Accordion>
                    })}
                </div>
            </Grid>
            <Grid className={classes.listPokeContainer} item xs={12} md={6}>
                {paper}
            </Grid>
        </Grid>
        <Dialog
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            {paper}
        </Dialog>
    </Container>
}