import React from 'react'
import {RepositoryFactory} from '../../repository/RepositoryFactory';
import classes from './PokemonLib.module.css'
import PokemonCard from '../pokemoncard/PokemonCard';
const postsRepository = RepositoryFactory.get('posts');
class pokemonLib extends React.Component {
    state = {
        pokemons: []
    }

    componentDidMount(){
        this.fetchPokemon();
    }

    fetchPokemon = async () => {
        const {data} = await postsRepository.get('pokemon', 0, 10);
        this.setState({pokemons: data.results})
    }
    render(){
        const pokemonList = this.state.pokemons.map((pokemon, index) => {
            return <PokemonCard key={index} pokemon={pokemon} />
        })
        return (
            <div className={classes.FlexContainer}>
                {pokemonList}
            </div>
        )
    }
}

export default pokemonLib;
