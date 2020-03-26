import React from 'react'
import {RepositoryFactory} from '../../repository/RepositoryFactory';
import classes from './PokemonCard.module.css';
const postsRepository = RepositoryFactory.get('posts');
class PokemonCard extends React.Component {
    state = {pokemonDetail: null }
    componentDidMount(){
        this.fetch();
    }
    
    fetch = async () => {
        const { data } = await postsRepository.getPost('pokemon', this.props.pokemon.name);
        this.setState({pokemonDetail : data})
        console.log(this.state.pokemonDetail.sprites.front_default)
    }
    
    render(){
        let card = null;
        if(!this.state.pokemonDetail){
            card = <p>Don't have pokemon</p>
        } else {
            card = (
                <div className={classes.Card}>
                    <img src={this.state.pokemonDetail.sprites.front_default} alt={this.state.pokemonDetail.name} />
                    <div className={classes.Description}>{this.state.pokemonDetail.name}</div>
                </div>
            )
        }
        return (
            card
        )
    }
}

export default PokemonCard;
