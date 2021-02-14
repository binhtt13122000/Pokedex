import { Container, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { PokeCard } from '../../components/PokeCard';
import PokeApi from '../../services/PokeApi';
import Loading from '../../assets/loading.gif';

const useStyles = makeStyles({
    loadingImage: {
        display: 'block',
        margin: '0 auto',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    loadingBackground: {
        minHeight: '70vh'
    }
})
export const PokeLib = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(false);

    const classes = useStyles();
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                const response = await PokeApi.getPokemon();
                if (response.status === 200) {
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
                            return { name: pokeData.name, image: pokeData.sprites.front_default, height: pokeData.height, weight: pokeData.weight, order: pokeData.id, types: types }
                        }
                    });
                    setPokemonList(pokemons)
                    setLoading(false);
                }
            } catch (ex) {
                console.log(ex)
                setLoading(false);
            }
        }

        fetchPokemon()
    }, []);

    if (loading) {
        return <Container>
            <Grid className={classes.loadingBackground} container direction="row" justify="center" alignItems="center">
                <Grid item>
                    <img className={classes.loadingImage} width="300px" height="auto" src={Loading} alt="loading" />
                </Grid>
            </Grid>
        </Container>
    }

    return <div>
        <Grid container>
            {pokemonList.map(pokemon => {
                return <Grid item key={pokemon.order} xs={12} sm={4}>
                    <PokeCard pokemon={pokemon} />
                </Grid>
            })}
        </Grid>
    </div>
}