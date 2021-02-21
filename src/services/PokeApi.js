import { LIMIT, OFFSET } from "../constants/poke";
import { get } from "../utils/api/apiCaller";

class PokeApi {
    getPokemon = async (offset = OFFSET) => {
        return await get("/pokemon", {}, {limit: LIMIT, offset: offset});
    }

    getPokemonByIndex = async (index) => {
        return await get(`/pokemon/${index}`, {}, {});
    }

    getPokemonByName = async (name) => {
        return await get(`/pokemon/${name}`, {}, {});
    }
}

export default new PokeApi();