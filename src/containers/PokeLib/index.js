import React, { useEffect, useState } from 'react';
import PokeApi from '../../services/PokeApi';
export const PokeLib = () => {
    const [pokemonList, setPokemonList] = useState([]);
    useEffect(() => {
        PokeApi.getPokemon().then(res => console.log(res))
    }, []);
    return <div>
        
    </div>
}