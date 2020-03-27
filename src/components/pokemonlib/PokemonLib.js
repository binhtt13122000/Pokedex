import React from 'react'
import {RepositoryFactory} from '../../repository/RepositoryFactory';
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
        const {data} = await postsRepository.get('pokemon', 0, 9);
        this.setState({pokemons: data.results})
    }
    render(){
        const pokemonList = this.state.pokemons.map((pokemon, index) => {
            return <PokemonCard key={index} pokemon={pokemon} />
        })
        return (
            <div>
                {pokemonList}
            </div>
        )
    }
}

export default pokemonLib;
