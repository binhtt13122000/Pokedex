import axios from 'axios';

const domain = 'https://pokeapi.co';
const baseURL = `${domain}/api/v2`

export default axios.create({
    baseURL
})

