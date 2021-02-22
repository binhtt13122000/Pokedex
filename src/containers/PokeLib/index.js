import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import Axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Loading } from '../../components/Loading';
import { CustomPagination } from '../../components/Pagination';
import { PokeCard } from '../../components/PokeCard';
import { CustomTextField } from '../../components/TextField';
import { LIMIT, POKE_ROOT_API } from '../../constants/poke';
import PokeApi from '../../services/PokeApi';
import { StoreContext } from '../../utils/context';
import { NotFound } from '../NotFound';

export const PokeLib = () => {
    //state
    const [pokemonList, setPokemonList] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState({
        current: 1,
        previous: null,
        next: null
    })
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    //variable
    const mounted = useRef(true);
    const location = useLocation();
    const history = useHistory();
    const { pokeStore } = useContext(StoreContext);
    const isDesktop = useMediaQuery(useTheme().breakpoints.up('md'));

    //function
    const fetchPokemon = async (pageIndex, dexTotal) => {
        try {
            setLoading(true);
            let limit = LIMIT;
            if (LIMIT * (pageIndex + 1) > dexTotal) {
                limit = dexTotal - (pageIndex) * LIMIT;
            }
            const response = await Axios.get(`${POKE_ROOT_API}/pokemon?offset=${LIMIT * pageIndex}&limit=${limit}`)
            if (response.status === 200) {
                if (mounted.current) {
                    setTotal(dexTotal || response.data.count);
                    setPage({ ...page, next: response.data.next, previous: response.data.previous, current: pageIndex + 1 })
                }
                const pokePromises = response.data.results.map(async function (pokeItem) {
                    return await PokeApi.getPokemonByName(pokeItem.name);
                })
                const listPokeResponse = await Promise.all(pokePromises);
                const pokemons = listPokeResponse.map(response => {
                    if (response.status === 200) {
                        let pokeData = response.data;
                        let types = pokeData.types.map(item => {
                            return item.type.name
                        })
                        return { name: pokeData.name, image: pokeData.sprites.other['official-artwork']['front_default'], height: pokeData.height, weight: pokeData.weight, order: pokeData.id, types: types }
                    } else {
                        return null;
                    }
                });
                if (mounted.current) {
                    setPokemonList(pokemons)
                }
            }
        } catch (ex) {
            if(mounted.current){
                setError(true);
            }
        } finally {
            if (mounted.current) {
                setLoading(false);
            }
        }
    }

    const changePage = (e, value) => {
        const nationDexTotal = pokeStore.pokeTotal;
        history.push("/?page=" + value);
        fetchPokemon(value - 1, nationDexTotal)
    }

    //useEffect
    useEffect(() => {
        let params = new URLSearchParams(location.search);
        let search = params.get("page");
        if (search == null) {
            search = 1;
        }
        let pageIndex = parseInt(parseInt(search) - 1);
        const nationDexTotal = pokeStore.pokeTotal;
        mounted.current = true;
        if((Math.ceil(nationDexTotal / LIMIT ) < (pageIndex + 1)) || (pageIndex < 0 && params.get("page") !== null)){
            setError(true);
        } else {
            fetchPokemon(pageIndex, nationDexTotal);
        }
        return () => {
            mounted.current = false;
        }
    }, []);

    //render
    if (loading) {
        return <div>
            <Loading />
        </div>
    }
    if(error){
        return <NotFound />
    }
    return <div>
        <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
            <Grid item xs={12} md={6}>
                <CustomPagination total={total} page={page.current} changePage={changePage} />
            </Grid>
            <Grid item xs={12} md={6}>
                <form style={{'width': isDesktop ? '60%' : '100%', margin: '0 auto'}} onSubmit={e => history.push("/pokemon/" + search)}>
                    <CustomTextField
                        fullWidth
                        type="autocomplete"
                        options={pokeStore.pokeNames || []}
                        placeholder="Search Poke..."
                        variant="outlined"
                        size="small"
                        color="primary"
                        value={search}
                        onChange={(event, newValue) => {
                            setSearch(newValue)
                        }}
                        style={{'marginBottom': isDesktop ? '0px' : '20px'}}
                    />
                </form>
            </Grid>
        </Grid>
        <Grid container>
            {pokemonList.map(pokemon => {
                return <Grid item key={pokemon.order} xs={12} sm={4}>
                    <PokeCard pokemon={pokemon} />
                </Grid>
            })}
        </Grid>
    </div>
}