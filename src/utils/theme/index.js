import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ef5350'
        },
        types: {
            unknown: {
                backgroundColor: '#000000'
            },
            normal: {
                backgroundColor: '#aaaa99',
            },
            fighting: {
                backgroundColor: '#b54'
            },
            flying: {
                backgroundColor: '#8899FF'
            },
            poison: {
                backgroundColor: '#aa5599'
            },
            ground: {
                backgroundColor: '#ddbb55'
            },
            rock: {
                backgroundColor: '#bbaa66'
            },
            bug: {
                backgroundColor: '#aabb22'
            },
            ghost: {
                backgroundColor: '#6666bb'
            },
            steel: {
                backgroundColor: '#aaaabb'
            },
            fire: {
                backgroundColor: '#ff4422'
            },
            water: {
                backgroundColor: '#3399ff'
            },
            grass: {
                backgroundColor: '#77cc55'
            },
            electric: {
                backgroundColor: '#ffcc33'
            },
            psychic: {
                backgroundColor: '#ff5599'
            },
            ice: {
                backgroundColor: '#66ccff'
            },
            dragon: {
                backgroundColor: '#7766ee'
            },
            dark: {
                backgroundColor: '#775544'
            },
            fairy: {
                backgroundColor: '#ee99ee'
            },
            shadow: {
                backgroundColor: '#000000'
            },
        }
    }
})