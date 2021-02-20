import React, { createContext, useState } from "react";

export const StoreContext = createContext(null);

export default ({children}) => {
    const [pokeTotal, setPokeTotal] = useState(0);

    const store = {
        pokeStore: {
            pokeTotal,
            setPokeTotal
        },
    }

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}