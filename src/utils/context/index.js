import React, { createContext, useState } from "react";

export const StoreContext = createContext(null);

export default ({children}) => {
    const [pokeTotal, setPokeTotal] = useState(0);
    const [pokeNames, setPokeNames] = useState([]);

    const store = {
        pokeStore: {
            pokeTotal,
            pokeNames,
            setPokeTotal,
            setPokeNames
        },
    }

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}