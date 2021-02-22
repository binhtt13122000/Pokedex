import React, { useEffect, useRef, useState } from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Container, Dialog, Grid, InputAdornment, Paper, TextField, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import ExpandMore from "@material-ui/icons/ExpandMore";
import PokeBall from '../../assets/pokeball.svg';
import { useHistory, useLocation } from 'react-router';
import Axios from 'axios';
import { LIMIT_ABILITY, POKE_ROOT_API } from '../../constants/poke'
import { Loading } from '../../components/Loading';
import { convertHyPhenStringToNormalString, getFrontDefaultImage, getOrder } from '../../utils/function';
import { CustomPagination } from '../../components/Pagination';
import { Image } from '../../components/Image';
import { Transition, useStyles } from './style';
import { NotFound } from '../NotFound';



export const AbilityPage = (props) => {
    //variable
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const mounted = useRef(true);
    const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));

    //state
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
    const [error, setError] = useState(false);

    //function
    const loadAbility = async (pageIndex) => {
        try {
            setLoading(true)
            const response = await Axios.get(`${POKE_ROOT_API}/ability?limit=${LIMIT_ABILITY}&offset=${LIMIT_ABILITY * pageIndex}`);
            if (response.status === 200) {
                if(Math.ceil(response.data.count / LIMIT_ABILITY) < (pageIndex + 1)){
                    setError(true);
                    return;
                }
                if (mounted.current) {
                    setTotal(response.data.count);
                    setPage({ ...page, next: response.data.next, previous: response.data.previous, current: pageIndex + 1 })
                }
                const promises = response.data.results.map(async item => {
                    return await Axios.get(item.url);
                })
                const listResponse = await Promise.all(promises);
                const abilities = listResponse.map(res => {
                    const item = res.data['effect_entries'].find(item => item.language.name === 'en');
                    const effectEntry = item === undefined ? null : item.effect;
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
            console.log(ex)
            if(mounted.current){
                setError(true);
            }
        } finally {
            if (mounted.current) {
                setLoading(false);
            }
        }
    }

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
                const id = response.data.id;
                const page = Math.floor(parseInt(id) / LIMIT_ABILITY);
                history.push("/abilities?page=" + (page + 1));
                loadAbility(page);
                setExpanded(id);
                setListPoke(response.data.pokemon);
            }
        } catch (ex){
            setMessage("Ability is not available");
        }
    }

    //use effect
    useEffect(() => {
        let params = new URLSearchParams(location.search);
        let search = params.get("page");
        if (search == null) {
            search = 1;
        }
        let pageIndex = parseInt(search - 1);
        if(pageIndex < 0 && params.get("page") !== null){
            setError(true);
        }
        loadAbility(pageIndex);
        mounted.current = true;
        return () => {
            mounted.current = false;
        }
    }, [])

    const paper = (
        <Paper elevation={isMobile ? 0 : 3} className={classes.listPoke}>
            <Grid container>
                {listPoke.length === 0 ? <Typography className={classes.center} variant="subtitle1">{message}</Typography> : listPoke.map((poke, index) => {
                    if (poke.pokemon) {
                        return <Grid key={index} item md={3} xs={6}>
                            <Image width="80%" height="auto" onClick={e => history.push("/pokemon/" + poke.pokemon.name)} className={classes.img} src={getFrontDefaultImage(getOrder(poke.pokemon.url))} alt={poke.pokemon.name} />
                            <p style={{ 'textAlign': 'center' }}>{convertHyPhenStringToNormalString(poke.pokemon.name)}</p>
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
    if(error){
        return <NotFound />
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
                <CustomPagination total={total} page={page.current} ability changePage={changePage} />
                <div className={classes.accordionContainer}>
                    {abilities && abilities.map((ability, index) => {
                        return <Accordion key={index} expanded={expanded === ability.id} onChange={handleChange(ability.id)}>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>{ability.name && convertHyPhenStringToNormalString(ability.name)}</Typography>
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