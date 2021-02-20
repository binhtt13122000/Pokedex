import React from 'react';
import MapPoke from '../../assets/map-pokemon.png';
import MovePoke from '../../assets/move_gym.png';
import PokeBall from '../../assets/pokeball.svg';
import Trainer from '../../assets/trainer.svg';

//drawer item list
export const drawerItems = [
    {
        id: 1,
        text: "Pokedex",
        icon: <img src={PokeBall} alt="pokedex" width="30px" height="30px" />,
        to: '/',
    },
    {
        id: 2,
        text: "Regions",
        icon: <img src={MapPoke} alt="pokedex" width="30px" height="30px" />,
    },
    {
        id: 3,
        text: "Abilities",
        icon: <img src={Trainer} alt="pokedex" width="30px" height="30px" />,
        to: '/abilities'
    },
    {
        id: 4,
        text: "Types",
        icon: <img src={MovePoke} alt="pokedex" width="30px" height="30px" />,
        to: '/types'
    },
]