import { LIMIT, OFFSET, POKE_ROOT_API } from "../constants/poke";
import { get } from "../utils/api/apiCaller";

class PokeApi {
    getPokemon(limit = LIMIT, offset = OFFSET){
        get(POKE_ROOT_API + "/pokemon", {}, {limit: limit, offset: offset});
    }
}

export default new PokeApi();