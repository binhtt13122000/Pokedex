import axios from 'axios';

const domain = 'https://pokeapi.co';
const baseURL = `${domain}/api/v2`

axios.create({
    baseURL
})