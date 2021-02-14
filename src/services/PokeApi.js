import { LIMIT, OFFSET } from "../constants/poke";
import { get } from "../utils/api/apiCaller";

class PokeApi {
    getPokemon = async (limit = LIMIT, offset = OFFSET) => {
        return await get("/pokemon", {}, {limit: limit, offset: offset});
    }

    getPokemonByIndex = async (index) => {
        return await get(`/pokemon/${index}`, {}, {});
    }

    getPokemonByName = async (name) => {
        return await get(`/pokemon/${name}`, {}, {});
    }
}

export default new PokeApi();