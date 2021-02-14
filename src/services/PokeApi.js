import { LIMIT, OFFSET } from "../constants/poke";
import { get } from "../utils/api/apiCaller";

class PokeApi {
    getPokemon = async (limit = LIMIT, offset = OFFSET) => {
        return await get("/pokemon", {}, {limit: limit, offset: offset});
    }
}

export default new PokeApi();