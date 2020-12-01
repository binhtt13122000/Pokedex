import React, { useEffect } from 'react';
import Axios from 'axios';

export const PokeLib = () => {
    useEffect(() => {
        Axios.get("https://pokeapi.co/api/v2/pokemon?limit=15&offset=20")
        .then(res => console.log(res))
    }, []);
    return <div>
        cc
    </div>
}