import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Loading } from '../../components/Loading';
import { CustomPagination } from '../../components/Pagination';
import { PokeCard } from '../../components/PokeCard';
import { LIMIT } from '../../constants/poke';
import PokeApi from '../../services/PokeApi';

export const PokeLib = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [page, setPage] = useState({
        current: 1,
        previous: null,
        next: null
    })
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchPokemon = async (pageIndex) => {
        try {
            setLoading(true);
            const response = await PokeApi.getPokemon(LIMIT * pageIndex);
            if (response.status === 200) {
                setTotal(response.data.count);
                setPage({ ...page, next: response.data.next, previous: response.data.previous, current: pageIndex + 1 })
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
                        return { name: pokeData.name, image: pokeData.sprites.other['official-artwork']['front_default'] , height: pokeData.height, weight: pokeData.weight, order: pokeData.id, types: types }
                    }
                });
                setPokemonList(pokemons)
                setLoading(false);
            }
        } catch (ex) {
            setLoading(false);
        }
    }

    const changePage = (e, value) => {
        fetchPokemon(value - 1)
        console.log(page)
    }


    useEffect(() => {
        fetchPokemon(0)
    }, []);

    if (loading) {
        return <div>
            <Loading />
        </div>
    }

    return <div>
        <CustomPagination total={total} page={page.current} changePage={changePage} />
        <Grid container>
            {pokemonList.map(pokemon => {
                return <Grid item key={pokemon.order} xs={12} sm={4}>
                    <PokeCard pokemon={pokemon} />
                </Grid>
            })}
        </Grid>
    </div>
}